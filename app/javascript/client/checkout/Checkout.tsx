import React, { FC, useState, useEffect, useRef } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery, CreateBillingCustomerInput, CreateShippingCustomerInput, CreateOrderInput } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikCheckbox, FormikTextInput, FormikSelectInput, FormikPhoneNumberInput, FormikZipCodeInput } from '../form/inputs';
import { CheckoutProducts } from './CheckoutProducts';
import { CheckoutProduct } from './CheckoutContainer';
import { STATE_OPTIONS, initialValues, validationSchema } from './utils';
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
    taxExempt?: string;
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
    const [sameAddress, toggleSameAddress] = useState(false);
    const [localPickup, toggleLocalPickup] = useState(false);
    let shippingCost: number = localPickup ? 0 : 10;

    useEffect(() => {
        shippingCost = localPickup ? 0 : 10;
    }, [localPickup]);

    const handleSubmit = async (
			data: CheckoutFormData,
			formikHelpers: FormikHelpers<CheckoutFormData>
		) => {




            console.log("Success!");
    };

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

    const taxCost: number = subtotal * .06;

    return (
			<>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ isSubmitting }) => (
						<Form>
							<AddressFormContainer>
                                <AddressFormHeader>
                                    Billing Address
                                </AddressFormHeader>
                                <Field
                                    name="billingName"
                                    label="Name"
                                    component={FormikTextInput}
                                    innerRef={formRefs['billing-name']}
                                />
                                <Field
                                    name="billingAddress"
                                    label="Address"
                                    component={FormikTextInput}
                                    innerRef={formRefs['billing-address']}
                                />
                                <Field
                                    name="billingCity"
                                    label="City"
                                    component={FormikTextInput}
                                    innerRef={formRefs['billing-city']}
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
                                    innerRef={formRefs['billing-zip-code']}
                                />
                                <Field
                                    name="billingPhoneNumber"
                                    label="Phone Number"
                                    component={FormikPhoneNumberInput}
                                    innerRef={formRefs['billing-phone-number']}
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
                                    <AddressFormHeader>
                                        Shipping Address
                                    </AddressFormHeader>
                                    <Field
                                        name="shippingName"
                                        label="Company Name"
                                        component={FormikTextInput}
                                        innerRef={formRefs['shipping-name']}
                                    />
                                    <Field
                                        name="shippingAddress"
                                        label="Address"
                                        component={FormikTextInput}
                                        innerRef={formRefs['shipping-address']}
                                    />
                                    <Field
                                        name="shippingCity"
                                        label="City"
                                        component={FormikTextInput}
                                        innerRef={formRefs['shipping-city']}
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
                                        innerRef={formRefs['shipping-zip-code']}
                                    />
                                    <Field
                                        name="shippingPhoneNumber"
                                        label="Phone Number"
                                        component={FormikPhoneNumberInput}
                                        innerRef={formRefs['shipping-phone-number']}
                                    />
                                    <Field 
                                        name="attn"
                                        label="Attn"
                                        component={FormikTextInput}
                                        innerRef={formRefs.attn}
                                    />
                                </AddressFormContainer>
                            )}
                            <CheckoutProducts checkoutItems={checkoutItems} unitPrice={unitPrice} />
							<PriceContainer>
                                <div>Tax</div>
                                <div>${taxCost}.00</div>
                            </PriceContainer>
							<PriceContainer>
                                <div>Shipping</div>
                                <div>${taxCost}.00</div>
                            </PriceContainer>
							<PriceContainer>
                                <div>Total</div>
                                <div>${subtotal + shippingCost + taxCost}.00</div>
                            </PriceContainer>
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