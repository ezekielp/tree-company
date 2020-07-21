import React, { FC, useRef } from 'react';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikTextInput, FormikPhoneNumberInput } from '../form/inputs';
import { CheckoutProduct } from './CheckoutContainer';
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

const BillingFormContainer = styled.section`
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
    const initialValues = {
        billingName: '',
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZipCode: '',
        email: '',
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingZipCode: ''
    };

    const handleSubmit = async (
			data: CheckoutFormData,
			formikHelpers: FormikHelpers<CheckoutFormData>
		) => {
        
    };

    const formRefs = {
        'billing-name': useRef(),
        'billing-address': useRef(),
        'billing-city': useRef(),
        email: useRef()
    };

    const { data: productData } = useGetProductsForCheckoutQuery();

    const taxCost = subtotal * .06;

    return (
			<>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{({ values, isSubmitting }) => (
						<Form>
							<BillingFormContainer>
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
                                    name="email"
                                    label="Email"
                                    component={FormikTextInput}
                                    type="email"
                                    innerRef={formRefs.email}
                                />
                            </BillingFormContainer>
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
    // billingPhoneNumber?: string;
    // taxExempt?: string;
    // shippingName: string;
    // shippingAddress: string;
    // shippingCity: string;
    // shippingState: string;
    // shippingZipCode: string;
    // shippingPhoneNumber?: string;
    // attn?: string;
    // shippingCost?: number;