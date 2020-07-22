import React, { FC } from 'react';
import { useGetCartForCheckoutContainerQuery } from '../graphqlTypes';
import { Checkout } from './Checkout';
import { determinePrice } from "../cart/utils";
import gql from 'graphql-tag';

gql`
    query GetCartForCheckoutContainer {
        cart {
            productId
            quantity
        }
    }
`;

export interface CheckoutProduct {
    productId: string;
    quantity: number;
}

export interface CheckoutContainerProps {
	unitPrice?: number;
	cart?: CheckoutProduct[];
}

export const CheckoutContainer: FC<CheckoutContainerProps> = ({ unitPrice, cart }) => {
    let cartProducts;

    if (!cart) {
        const { data } = useGetCartForCheckoutContainerQuery();
        cartProducts = data?.cart;
    } else {
        cartProducts = cart;
    }

    if (!cartProducts) return null;

    const totalQuantity = cartProducts.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const price = unitPrice ? unitPrice : determinePrice(totalQuantity);
    const subtotal = totalQuantity * price;

    return (
        <Checkout unitPrice={price} cart={cartProducts} subtotal={subtotal} />
    );
};
