import React, { FC } from 'react';
import { ProductInfoFragmentDoc, useGetProductsForCheckoutQuery } from '../graphqlTypes';
import { Formik } from "formik";
import { CheckoutProduct } from './CheckoutContainer';
import gql from 'graphql-tag';

gql`
	query GetProductsForCheckout($productIds: [String!]!) {
		productsById(productIds: $productIds) {
            ...ProductInfo
		}
	}

	${ProductInfoFragmentDoc}
`;





interface CheckoutProps {
    unitPrice: number;
    cart: CheckoutProduct[];
}

interface CheckoutSubmitProps {
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
    unitPrice: number;
}

export const Checkout: FC<CheckoutProps> = ({ unitPrice, cart }) => {
    const handleSubmit: CheckoutSubmitProps = async () => {

    }

    const { data: productData } = useGetProductsForCheckoutQuery();

    return (
        <div>Checkout page</div>
    )
}
