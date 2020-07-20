import React, { FC } from 'react';
import { Formik } from "formik";
import { CheckoutProduct } from './CheckoutContainer';
import gql from 'graphql-tag';

// gql`
//     query GetProductsForCheckout($input: ) {

//     }
// `;

interface CheckoutProps {
    unitPrice: number;
    cart: CheckoutProduct[];
}

export const Checkout: FC<CheckoutProps> = ({ unitPrice, cart }) => {
    return (
        <div>Checkout page</div>
    )
}
