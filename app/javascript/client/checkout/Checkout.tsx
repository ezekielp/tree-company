import React, { FC, useState, useRef } from 'react';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikCheckbox, FormikTextInput, FormikPhoneNumberInput } from '../form/inputs';
import { CheckoutProduct } from './CheckoutContainer';
import { initialValues } from './utils';
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

const BillingAddressFormContainer = styled.section`
`;

const ShippingAddressFormContainer = styled.section`
`;

const TaxCostContainer = styled.div`
	display: flex;
`;

const TotalPriceContainer = styled.div`
	display: flex;
`;

const BillingAddressHeader = styled.div`
    font-size: 24px;
`;

interface CheckoutProps {
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
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingPhoneNumber?: string;
    attn?: string;
    shippingCost?: number;
}

export const Checkout: FC<CheckoutProps> = ({ unitPrice, cart, subtotal }) => {
    const [sameAddress, toggleSameAddress] = useState(false);
    const [localPickup, toggleLocalPickup] = useState(false);

    const handleSubmit = async (
			data: CheckoutFormData,
			formikHelpers: FormikHelpers<CheckoutFormData>
		) => {
        
    };

    const formRefs = {
        'billing-name': useRef(),
        'billing-address': useRef(),
        'billing-city': useRef(),
        'billing-phone-number': useRef(),
        email: useRef()
    };

    const { data: productData } = useGetProductsForCheckoutQuery();

    const taxCost = subtotal * .06;

    return (
			<>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{({ values, isSubmitting }) => (
						<Form>
							<BillingAddressFormContainer>
                                <BillingAddressHeader>
                                    Billing Address
                                </BillingAddressHeader>
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
                            </BillingAddressFormContainer>
                            <Field
                                label="Check here if you would like to pick up the signs instead of having them shipped to you."
                                component={FormikCheckbox}
                                checked={localPickup}
                                onChange={() => toggleLocalPickup(!localPickup)}
                            />
                            <Field 
                                label="Is the shipping address the same as your billing address?"
                                component={FormikCheckbox}
                                checked={sameAddress}
                                onChange={() => toggleSameAddress(!sameAddress)}
                            />
                            {!localPickup && !sameAddress && (
                                <ShippingAddressFormContainer>
                                    
                                </ShippingAddressFormContainer>
                            )}
							<TaxCostContainer>${taxCost}.00</TaxCostContainer>
							<TotalPriceContainer></TotalPriceContainer>
						</Form>
					)}
				</Formik>
			</>
		);
}

    // billingState: string;
    // billingZipCode: string;
    // taxExempt?: string;
    // shippingName: string;
    // shippingAddress: string;
    // shippingCity: string;
    // shippingState: string;
    // shippingZipCode: string;
    // shippingPhoneNumber?: string;
    // attn?: string;
    // shippingCost?: number;