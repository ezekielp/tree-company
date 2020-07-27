import React, { FC, useState, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery, useCreateBillingCustomerMutation, useCreateOrderMutation, useCreateShippingCustomerMutation, useCreateStripePaymentIntentMutation } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikCheckbox, FormikTextInput, FormikSelectInput, FormikPhoneNumberInput, FormikZipCodeInput } from '../form/inputs';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckoutProducts } from './CheckoutProducts';
import { CheckoutProduct } from './CheckoutContainer';
import { STATE_OPTIONS, displayPrice, initialValues, validationSchema } from './utils';
import gql from 'graphql-tag';
import styled from 'styled-components';

gql`
	query GetProductsForCheckout($productIds: [String!]!) {
		productsById(productIds: $productIds) {
            ...ProductInfo
		}
	}

	${ProductInfoFragmentDoc}
`;

gql`
    mutation CreateStripePaymentIntent($input: CreatePaymentIntentInput!) {
        createPaymentIntent(input: $input) {
            stripePaymentIntent {
                id
                amount
                clientSecret
                description
                receiptEmail
                status
            }
        }
    }
`;

gql`
    mutation CreateBillingCustomer($input: CreateBillingCustomerInput!) {
        createBillingCustomer(input: $input) {
            billingCustomer {
                id
                name
                address
                city
                state
                email
                zipCode
                phoneNumber
                taxExempt
            }
        }
    }
`;

gql`
    mutation CreateShippingCustomer($input: CreateShippingCustomerInput!) {
        createShippingCustomer(input: $input) {
            shippingCustomer {
                id
                companyName
                address
                city
                state
                zipCode
                phoneNumber
                attn
            }
        }
    }
`;

gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            order {
                id
                shippingCost
                taxCost
                unitPrice
                orderQuantities {
                    id
                    productId
                    orderId
                    quantity
                }
                products {
                    id
                    name
                    size
                    material
                    description
                    styleNumber
                    counties {
                        id
                        name
                    }
                    imageUrl
                }
            }
        }
    }
`;

const AddressFormContainer = styled.section`
`;

const PriceContainer = styled.div`
	display: flex;
`;

const AddressFormHeader = styled.div`
    font-size: 24px;
`;

interface CheckoutProps extends RouteComponentProps {
    unitPrice: number;
    subtotal: number;
    cart: CheckoutProduct[];
}

interface CheckoutFormData {
    billingName: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingZipCode: string;
    billingPhoneNumber?: string;
    email: string;
    taxExempt?: boolean;
    sameAddress: boolean;
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingPhoneNumber?: string;
    attn?: string;
    shippingCost?: number;
}

const InternalCheckout: FC<CheckoutProps> = ({ history, unitPrice, cart, subtotal }) => {

    // Comment in the line below once you can add stuff to the cart
    // if (cart.length === 0) history.push('/home');

    const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();

    const stripe = useStripe();
    const stripeElements = useElements();
    
    const [sameAddress, toggleSameAddress] = useState(false);
    const [localPickup, toggleLocalPickup] = useState(false);
    const [stripeErrorMessage, setStripeErrorMessage] = useState<string | null>(null);

    const [createBillingCustomer] = useCreateBillingCustomerMutation();
    const [createShippingCustomer] = useCreateShippingCustomerMutation();
    const [createOrder] = useCreateOrderMutation();

    let shippingCost: number = localPickup ? 0 : 1000;
    useEffect(() => {
        shippingCost = localPickup ? 0 : 1000;
    }, [localPickup]);

    const taxCost: number = parseFloat((subtotal * .06).toFixed(4));
    const totalCost: number = subtotal + shippingCost + taxCost;

    const productIds: string[] = [];
    const productIdToQuantityMap = {} as { [key: string]: number };
    cart.forEach(item => {
        const { productId, quantity } = item;
        productIds.push(productId);
        productIdToQuantityMap[productId] = quantity;
    });

    const { data: productDataQueryResult } = useGetProductsForCheckoutQuery({
        variables: {
            productIds
        }
    });
    const productData = productDataQueryResult?.productsById;

    const formRefs = {
			"billing-name": useRef(),
			"billing-address": useRef(),
			"billing-city": useRef(),
			"billing-zip-code": useRef(),
			"billing-phone-number": useRef(),
			email: useRef(),
			"shipping-name": useRef(),
			"shipping-address": useRef(),
			"shipping-city": useRef(),
			"shipping-zip-code": useRef(),
			"shipping-phone-number": useRef(),
			attn: useRef(),
		} as { [key: string]: React.RefObject<HTMLInputElement> };

    if (!productData) return null;
    const checkoutItems = productData.map(product => ({
        product,
        quantity: productIdToQuantityMap[product.id]
    }));

    const handleSubmit = async (
			data: CheckoutFormData,
			formikHelpers: FormikHelpers<CheckoutFormData>
		) => {

        const {
					billingName,
					billingAddress,
					billingCity,
					billingState,
					billingZipCode,
					billingPhoneNumber,
					email,
					taxExempt,
					shippingName,
					shippingAddress,
					shippingCity,
					shippingState,
					shippingZipCode,
					shippingPhoneNumber,
					attn
                }
        = data;

        const createPaymentIntentResponse = await createStripePaymentIntent({
            variables: {
                input: {
                    amount: totalCost,
                }
            }
        });

        const stripePaymentIntent = createPaymentIntentResponse.data?.createPaymentIntent?.stripePaymentIntent;
        const [clientSecret, description, status] = [stripePaymentIntent?.clientSecret, stripePaymentIntent?.description, stripePaymentIntent?.status];
        if (!clientSecret) return null;

        if (!stripe || !stripeElements) return null;
        const cardElement = stripeElements.getElement(CardElement);
        if (!cardElement) return null;

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: billingName,
                    email
                }
            }
        });

        if (stripeError) {
            const errorMessage = stripeError.message
                ? stripeError.message
                : 'Oops! Something went wrong. Please try to submit the form again.';
            setStripeErrorMessage(errorMessage);
            return;
        } else if (paymentIntent?.status !== 'succeeded') {
            // TO DO: See about logging this in a more sustainable and thorough way, whether it succeeded or not
            console.log('paymentIntent:', paymentIntent);
            return;
        }

        const shippingCustomerInput = sameAddress ? {
            companyName: billingName,
            address: billingAddress,
            city: billingCity,
            state: billingState,
            zipCode: billingZipCode,
            phoneNumber: billingPhoneNumber,
            attn
        } : {
            companyName: shippingName,
            address: shippingAddress,
            city: shippingCity,
            state: shippingState,
            zipCode: shippingZipCode,
            phoneNumber: shippingPhoneNumber,
            attn
        };

        const [createBillingCustomerResponse, createShippingCustomerResponse] = await Promise.all([createBillingCustomer({
            variables: {
                input: {
                    name: billingName,
                    address: billingAddress,
                    city: billingCity,
                    state: billingState,
                    zipCode: billingZipCode,
                    phoneNumber: billingPhoneNumber,
                    email,
                    taxExempt
                }
            }
        }), createShippingCustomer({
            variables: {
                input: shippingCustomerInput
            }
        })]);
        
        // TO DO: Handle potential errors from above API calls
        // ALSO RE ERROR-HANDLING: Need to figure out how to pass down errors from things like the zipcode validaton gem

        const billingCustomerId = createBillingCustomerResponse.data?.createBillingCustomer?.billingCustomer.id;
        const shippingCustomerId = createShippingCustomerResponse.data?.createShippingCustomer?.shippingCustomer.id;

        if (!billingCustomerId || ! shippingCustomerId) return;

        const createOrderResponse = createOrder({
            variables: {
                input: {
                    billingCustomerId: parseInt(billingCustomerId),
                    shippingCustomerId: parseInt(shippingCustomerId),
                    shippingCost,
                    taxCost,
                    unitPrice,
                    cart
                }
            }
        });

        console.log(createOrderResponse);

        console.log("Success!");
    };

    return (
			<>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<AddressFormContainer>
								<AddressFormHeader>Billing Address</AddressFormHeader>
								<Field
									name="billingName"
									label="Name"
									component={FormikTextInput}
									innerRef={formRefs["billing-name"]}
								/>
								<Field
									name="billingAddress"
									label="Address"
									component={FormikTextInput}
									innerRef={formRefs["billing-address"]}
								/>
								<Field
									name="billingCity"
									label="City"
									component={FormikTextInput}
									innerRef={formRefs["billing-city"]}
								/>
								<Field
									name="billingState"
									label="State"
									component={FormikSelectInput}
									options={STATE_OPTIONS}
								/>
								<Field
									name="billingZipCode"
									label="Zip Code"
									component={FormikZipCodeInput}
									innerRef={formRefs["billing-zip-code"]}
								/>
								<Field
									name="billingPhoneNumber"
									label="Phone Number"
									component={FormikPhoneNumberInput}
									innerRef={formRefs["billing-phone-number"]}
								/>
								<Field
									name="email"
									label="Email"
									component={FormikTextInput}
									type="email"
									innerRef={formRefs.email}
								/>
							</AddressFormContainer>
							<Field
								name="localPickup"
								label="Check here if you would like to pick up the signs instead of having them shipped to you."
								component={FormikCheckbox}
								checked={localPickup}
								onChange={() => toggleLocalPickup(!localPickup)}
							/>
							{localPickup === false && (
								<Field
									name="sameAddress"
									label="Check here to use your billing address as your shipping address."
									component={FormikCheckbox}
									checked={sameAddress}
									onChange={() => toggleSameAddress(!sameAddress)}
								/>
							)}
							{localPickup === false && sameAddress === false && (
								<AddressFormContainer>
									<AddressFormHeader>Shipping Address</AddressFormHeader>
									<Field
										name="shippingName"
										label="Company Name"
										component={FormikTextInput}
										innerRef={formRefs["shipping-name"]}
									/>
									<Field
										name="shippingAddress"
										label="Address"
										component={FormikTextInput}
										innerRef={formRefs["shipping-address"]}
									/>
									<Field
										name="shippingCity"
										label="City"
										component={FormikTextInput}
										innerRef={formRefs["shipping-city"]}
									/>
									<Field
										name="shippingState"
										label="State"
										component={FormikSelectInput}
										options={STATE_OPTIONS}
									/>
									<Field
										name="shippingZipCode"
										label="Zip Code"
										component={FormikZipCodeInput}
										innerRef={formRefs["shipping-zip-code"]}
									/>
									<Field
										name="shippingPhoneNumber"
										label="Phone Number"
										component={FormikPhoneNumberInput}
										innerRef={formRefs["shipping-phone-number"]}
									/>
									<Field
										name="attn"
										label="Attn"
										component={FormikTextInput}
										innerRef={formRefs.attn}
									/>
								</AddressFormContainer>
							)}
							<CheckoutProducts
								checkoutItems={checkoutItems}
								unitPrice={unitPrice}
							/>
							<PriceContainer>
								<div>Tax</div>
								<div>${displayPrice(taxCost)}</div>
							</PriceContainer>
							<PriceContainer>
								<div>Shipping</div>
								<div>${displayPrice(shippingCost)}</div>
							</PriceContainer>
							<PriceContainer>
								<div>Total</div>
								<div>${displayPrice(totalCost)}</div>
							</PriceContainer>
							<CardElement
								onFocus={() => setStripeErrorMessage(null)}
								onChange={(e) =>
									e.error && setStripeErrorMessage(e.error.message)
								}
							/>
							<button type="submit" disabled={isSubmitting}>
								Place order
							</button>
						</Form>
					)}
				</Formik>
			</>
		);
}

    // taxExempt?: string;
export const Checkout = withRouter(InternalCheckout);