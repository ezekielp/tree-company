import React, { FC } from 'react';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery } from '../graphqlTypes';
import { Formik, FormikHelpers } from "formik";
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
    taxCost: number;
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

    const { data: productData } = useGetProductsForCheckoutQuery();

    const taxCost = subtotal * .06;

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, isSubmitting }) => (
                    <BillingFormContainer>
                        
                    </BillingFormContainer>
                )}
            </Formik>
            <TaxCostContainer>
                ${taxCost}.00
            </TaxCostContainer>
            <TotalPriceContainer>

            </TotalPriceContainer>
        </>
    )
}
