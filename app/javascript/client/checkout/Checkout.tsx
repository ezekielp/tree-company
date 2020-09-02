import React, { FC, useState, useRef, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery, useCreateBillingCustomerMutation, useCreateOrderMutation, useCreateShippingCustomerMutation, useCreateStripePaymentIntentMutation, useClearCartMutation, useSendErrorMailerMutation, BillingCustomerInfoFragmentDoc, ShippingCustomerInfoFragmentDoc, OrderInfoFragmentDoc, CreateBillingCustomerInput, CreateShippingCustomerInput } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikTextInput, FormikSelectInput, FormikPhoneNumberInput, FormikZipCodeInput } from '../form/inputs';
import { CartContext } from '../AppContainer';
import { InputWrapper, Label } from '../form/withFormik';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckoutProducts } from './CheckoutProducts';
import { CheckoutProduct } from './CheckoutContainer';
import { STATE_OPTIONS, initialValues, validationSchema, setShippingAddress } from './utils';
import amex from '../assets/amex.png';
import discover from '../assets/discover.png';
import mastercard from '../assets/mastercard.svg';
import { StripeBadge } from '../assets/StripeBadge';
import visa from '../assets/visa.png';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import { device, colors } from '../styles';
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
                ...BillingCustomerInfo
            }
        }
    }

    ${BillingCustomerInfoFragmentDoc}
`;

gql`
    fragment BillingCustomerInfo on BillingCustomer {
        id
        name
        address
        city
        state
        email
        zipCode
        phoneNumber
        taxExempt
        taxId
    }
`;

gql`
    mutation CreateShippingCustomer($input: CreateShippingCustomerInput!) {
        createShippingCustomer(input: $input) {
            shippingCustomer {
                ...ShippingCustomerInfo
            }
        }
    }

    ${ShippingCustomerInfoFragmentDoc}
`;

gql`
    fragment ShippingCustomerInfo on ShippingCustomer {
        id
        companyName
        address
        city
        state
        zipCode
        phoneNumber
        attn
    }
`;

gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            order {
                ...OrderInfo
            }
        }
    }

    ${OrderInfoFragmentDoc}
`;

gql`
    fragment OrderInfo on Order {
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
        }        
    }
`;

gql`
    mutation ClearCart {
        clearCart {
            cart {
                productId
                quantity
            }
        }
    }
`;

gql`
    mutation SendErrorMailer($input: SendErrorMailerInput!) {
        sendErrorMailer(input: $input) {
            errors
        }
    }
`;

const CheckoutFormContainer = styled.div`
    width: 80%;
    margin: 40px auto 50px auto;
`;

const AddressFormContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
`;

const BillingAddressFormContainer = styled(AddressFormContainer)`
    margin-bottom: 30px;
`;

const ShippingAddressFormContainer = styled(AddressFormContainer)`
    margin-top: 50px;
`;

const PaymentContainer = styled.div`
    margin-top: 50px;
`;

const AddressFormHeader = styled.div`
    font-size: 24px;
    margin-bottom: 30px;
`;

const PaymentHeader = AddressFormHeader;

const StyledErrorMessage = styled.div`
    color: red;
    margin-top: 15px;
`;

const CheckoutHeader = styled.h1`
    font-size: 36px;
    margin-bottom: 36px;
    margin-top: 16px;
`;

const FormFieldsContainer = styled.div`
    display: flex;
    width: 100%;
    ${`@media ${device.mobileLarge}`} {
        flex-direction: column;
    }
`;

const MailInOrderTextContainer = styled.div`
    line-height: 130%;
`;

const MailInOrderText = styled.div`
    font-variation-settings: 'wght' 700;
    margin-bottom: 15px;
`;

const AddressTextContainer = styled.div`
    text-align: center;
    margin-bottom: 15px;
`;

const AddressLine = styled.div``;

const LabelText = styled.span`
    margin-left: 8px;
`;

const PaymentMethodContainer = styled.div`
    margin-bottom: 20px;
`;

const PaymentMethodHeader = styled.div`
    margin-bottom: 5px;
    font-variation-settings: 'wght' 550;
`;

const stripeCardInputStyle = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#fa755a', iconColor: '#fa755a' },
};

const CardLogosContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 350px;
    margin-bottom: 10px;
`;

const LogoImage = styled.img`
    height: 30px;
`;

const DiscoverLogo = styled(LogoImage)``;

const MastercardLogo = styled(LogoImage)``;

const VisaLogo = styled(LogoImage)`
    height: 20px;
`;

const AmexLogo = styled(LogoImage)`
    height: 50px;
`;

const CardPaymentText = styled.div`
    margin-bottom: 15px;
    line-height: 130%;
`;

const StripeCardContainer = styled.div`
    max-width: 350px;
    min-width: 300px;
    border: 1px solid lightgray;
    border-radius: 5%;
    padding: 10px;
    margin-bottom: 30px;
`;

const CheckoutButton = styled.button`
    max-width: 350px;
    min-width: 300px;
    height: 45px;
    font-size: 20px;
    margin: 0 auto;
    display: block;
    margin-bottom: 25px;
`;

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoaderText = styled.div`
    color: ${colors.darkGreen};
    font-size: 24px;
    font-variation-settings: 'wght' 700;
    margin-bottom: 20px;
`;

const LoaderOverride = css`

`;

interface CheckoutProps extends RouteComponentProps {
    unitPrice: number;
    subtotal: number;
    cart: CheckoutProduct[];
}

export interface CheckoutFormData {
    billingName: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingZipCode: string;
    billingPhoneNumber?: string;
    email: string;
    taxExempt?: boolean;
    localPickup: boolean;
    sameAddress: boolean;
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingPhoneNumber?: string;
    attn?: string;
    shippingCost?: number;
    taxId?: string;
    paymentMethod: string;
}

const InternalCheckout: FC<CheckoutProps> = ({ history, unitPrice, cart, subtotal }) => {

    if (cart.length === 0) history.push('/home');

    const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();

    const stripe = useStripe();
    const stripeElements = useElements();
    
    const [sameAddress, setSameAddress] = useState(false);

    const [stripeErrorMessage, setStripeErrorMessage] = useState<string | null>(null);

    const [createBillingCustomer] = useCreateBillingCustomerMutation();
    const [createShippingCustomer] = useCreateShippingCustomerMutation();
    const [createOrder] = useCreateOrderMutation();
    const [clearCart] = useClearCartMutation();
    const [sendErrorMailer] = useSendErrorMailerMutation();
    const { fetchCart } = useContext(CartContext);

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
                    localPickup,
                    taxExempt,
                    taxId,
					shippingName,
					shippingAddress,
					shippingCity,
					shippingState,
					shippingZipCode,
					shippingPhoneNumber,
					attn
                }
        = data;

        const shippingCost = localPickup ? 0 : 1000;
        const taxCost = shippingState === "MD" ? parseFloat((subtotal * .06).toFixed(4)) : 0;
        const totalCost =  subtotal + taxCost + shippingCost;

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

        const billingCustomerInput: CreateBillingCustomerInput = {
            name: billingName,
            address: billingAddress,
            city: billingCity,
            state: billingState,
            zipCode: billingZipCode,
            phoneNumber: billingPhoneNumber,
            email,
            taxExempt
        }
        if (taxId && taxId.length > 0) {
            billingCustomerInput['taxId'] = taxId;
        };

        const shippingCustomerInput: CreateShippingCustomerInput = {
            companyName: shippingName,
            address: shippingAddress,
            city: shippingCity,
            state: shippingState,
            zipCode: shippingZipCode,
            phoneNumber: shippingPhoneNumber,
            attn
        };
        
        let createBillingCustomerResponse, createShippingCustomerResponse;

        if (localPickup) {
            createBillingCustomerResponse = await createBillingCustomer({
                variables: {
                    input: billingCustomerInput
                }
            });
        } else {
            [createBillingCustomerResponse, createShippingCustomerResponse] = await Promise.all([createBillingCustomer({
                variables: {
                    input: billingCustomerInput
                }
            }), createShippingCustomer({
                variables: {
                    input: shippingCustomerInput
                }
            })]);
        }

        // TO DO: Handle potential errors from above API calls
        // ALSO RE ERROR-HANDLING: Need to figure out how to pass down errors from things like the zipcode validaton gem

        const billingCustomerId = createBillingCustomerResponse?.data?.createBillingCustomer?.billingCustomer.id;
        const shippingCustomerId = localPickup ? null : createShippingCustomerResponse?.data?.createShippingCustomer?.shippingCustomer.id;

        if (!billingCustomerId) return;

        const createOrderInput = shippingCustomerId ? {
            billingCustomerId: parseInt(billingCustomerId),
            shippingCustomerId: parseInt(shippingCustomerId),
            shippingCost,
            taxCost,
            unitPrice,
            cart: cart.map(cartItem => ({
                productId: cartItem.productId,
                quantity: cartItem.quantity
            }))
        } : {
            billingCustomerId: parseInt(billingCustomerId),
            shippingCost,
            taxCost,
            unitPrice,
            cart: cart.map(cartItem => ({
                productId: cartItem.productId,
                quantity: cartItem.quantity
            }))
        };

        const createOrderResponse = await createOrder({
            variables: {
                input: createOrderInput
            }
        });

        if (!createOrderResponse.errors) {
            await clearCart();
            fetchCart();

            const orderId = createOrderResponse?.data?.createOrder.order.id;

            history.push({
                pathname: '/order-confirmation',
                state: { 
                    billingCustomer: billingCustomerInput,
                    shippingCustomer: shippingCustomerId ? shippingCustomerInput : null,
                    checkoutItems,
                    unitPrice,
                    subtotal,
                    shippingCost,
                    taxCost,
                    totalCost,
                    orderId
                }
            });
        } else {
            await sendErrorMailer({
                variables: {
                    input: {
                        errors: createOrderResponse.errors.map(e => e.message)
                    }
                }
            });
            history.push('/error');
        }
    };

    return (
        <CheckoutFormContainer>
            <CheckoutHeader>Checkout</CheckoutHeader>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ values, isSubmitting, setFieldValue }) => {
                    const shippingCost: number = values.localPickup ? 0 : 1000;
                    const taxCost: number = values.shippingState === "MD" && !values.taxExempt ? parseFloat((subtotal * .06).toFixed(4)) : 0;
                    const totalCost: number = subtotal + taxCost + shippingCost;

                    return (
                        <Form>
                            <AddressFormHeader>Billing address</AddressFormHeader>
                            <BillingAddressFormContainer>
                                <FormFieldsContainer>
                                    <Field
                                        name="billingName"
                                        label="Name (individual or company)"
                                        component={FormikTextInput}
                                        innerRef={formRefs["billing-name"]}
                                    />
                                    <Field
                                        name="email"
                                        label="Email"
                                        component={FormikTextInput}
                                        type="email"
                                        innerRef={formRefs.email}
                                    />
                                </FormFieldsContainer>
                                <Field
                                    name="billingAddress"
                                    label="Address"
                                    component={FormikTextInput}
                                    innerRef={formRefs["billing-address"]}
                                />
                                <FormFieldsContainer>
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
                                </FormFieldsContainer>
                                <FormFieldsContainer>
                                    <Field
                                        name="billingZipCode"
                                        label="Zip code"
                                        component={FormikZipCodeInput}
                                        innerRef={formRefs["billing-zip-code"]}
                                    />
                                    <Field
                                        name="billingPhoneNumber"
                                        label="Phone number (digits only)"
                                        component={FormikPhoneNumberInput}
                                        innerRef={formRefs["billing-phone-number"]}
                                    />
                                </FormFieldsContainer>
                            </BillingAddressFormContainer>
                            <InputWrapper>
                                <Label>
                                    <Field name="taxExempt" type="checkbox" />
                                    <LabelText>Tax-exempt order?</LabelText>
                                </Label>
                            </InputWrapper>
                            {values.taxExempt && (
                                <Field
                                    name="taxId"
                                    label="Maryland Sales and Use Tax Number or Exemption Certificate Number"
                                    component={FormikTextInput}
                                />
                            )}
                            <InputWrapper>
                                <Label>
                                    <Field name="localPickup" type="checkbox" />
                                    <LabelText>Local pickup?</LabelText>
                                </Label>
                            </InputWrapper>
                            {values.localPickup === false && (
                                <>
                                <InputWrapper>
                                    <Label>
                                        <Field
                                            name="sameAddress"
                                            type="checkbox"
                                            checked={sameAddress}
                                            onChange={() => {
                                                !sameAddress && setShippingAddress(values, setFieldValue);
                                                setSameAddress(!sameAddress);
                                            }}
                                        />
                                        <LabelText>Use billing address as shipping address?</LabelText>
                                    </Label>
                                </InputWrapper>
                                <ShippingAddressFormContainer>
                                    <AddressFormHeader>Shipping address</AddressFormHeader>
                                    <Field
                                        name="shippingName"
                                        label="Name (individual or company)"
                                        component={FormikTextInput}
                                        innerRef={formRefs["shipping-name"]}
                                    />
                                    <Field
                                        name="shippingAddress"
                                        label="Address"
                                        component={FormikTextInput}
                                        innerRef={formRefs["shipping-address"]}
                                    />
                                    <FormFieldsContainer>
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
                                    </FormFieldsContainer>
                                    <FormFieldsContainer>
                                        <Field
                                            name="shippingZipCode"
                                            label="Zip code"
                                            component={FormikZipCodeInput}
                                            innerRef={formRefs["shipping-zip-code"]}
                                        />
                                        <Field
                                            name="shippingPhoneNumber"
                                            label="Phone number (digits only)"
                                            component={FormikPhoneNumberInput}
                                            innerRef={formRefs["shipping-phone-number"]}
                                        />
                                    </FormFieldsContainer>
                                    <Field
                                        name="attn"
                                        label="Attn"
                                        component={FormikTextInput}
                                        innerRef={formRefs.attn}
                                    />
                                </ShippingAddressFormContainer>
                                </>
                            )}
                            <CheckoutProducts
                                checkoutItems={checkoutItems}
                                unitPrice={unitPrice}
                                shippingCost={shippingCost}
                                taxCost={taxCost}
                                totalCost={totalCost}
                            />
                            <PaymentContainer>
                                <PaymentHeader>Payment</PaymentHeader>
                                <PaymentMethodContainer>
                                    <PaymentMethodHeader>
                                        Payment method
                                    </PaymentMethodHeader>
                                    <label>
                                        <Field type="radio" name="paymentMethod" value="card" />
                                        Card
                                    </label>
                                    <label>
                                        <Field type="radio" name="paymentMethod" value="check" />
                                        Check
                                    </label>
                                </PaymentMethodContainer>
                                {values.paymentMethod === "check" && (
                                    <MailInOrderTextContainer>
                                        <MailInOrderText>
                                            Please print this checkout page (over multiple pages is fine) and send it with your check, payable to The Tree Company, to the following address:
                                        </MailInOrderText>
                                        <AddressTextContainer>
                                            <AddressLine>The Tree Company</AddressLine>
                                            <AddressLine>20 N. Beaumont Ave.</AddressLine>
                                            <AddressLine>Catonsville, MD 21228</AddressLine>
                                        </AddressTextContainer>
                                    </MailInOrderTextContainer>
                                )}
                                {values.paymentMethod === "card" && (
                                    <>
                                        <CardPaymentText>
                                            We offer secure payments by major credit and debit cards, powered by one of the world's largest online payment providers, Stripe.
                                        </CardPaymentText>
                                        <CardLogosContainer>
                                            <VisaLogo src={visa} />
                                            <MastercardLogo src={mastercard} />
                                            <AmexLogo src={amex} />
                                            <DiscoverLogo src={discover} />
                                            <a target="_blank" rel="noopener noreferrer" href="https://stripe.com/">
                                                <StripeBadge height="20px" display="block" />
                                            </a>
                                        </CardLogosContainer>
                                        <StripeCardContainer>
                                            <CardElement
                                                options={{
                                                    style: stripeCardInputStyle
                                                }}
                                                onFocus={() => setStripeErrorMessage(null)}
                                                onChange={(e) =>
                                                    e.error && setStripeErrorMessage(e.error.message)
                                                }
                                            />
                                            {stripeErrorMessage && (
                                                <StyledErrorMessage>{stripeErrorMessage}</StyledErrorMessage>
                                            )}
                                        </StripeCardContainer>
                                        <CheckoutButton type="submit" disabled={isSubmitting}>
                                            Place order
                                        </CheckoutButton>
                                        {isSubmitting && (
                                            <LoaderContainer>
                                                <LoaderText>
                                                    Processing order
                                                </LoaderText>
                                                <BeatLoader
                                                    css={LoaderOverride}
                                                    size={30}
                                                    color={colors.darkGreen}
                                                    loading={true}
                                                />
                                            </LoaderContainer>
                                        )}
                                    </>
                                )}
                            </PaymentContainer>
                        </Form>
                    )
                }}
            </Formik>
        </CheckoutFormContainer>
    );
}

export const Checkout = withRouter(InternalCheckout);