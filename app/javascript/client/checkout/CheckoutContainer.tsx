import React, { FC } from 'react';
import { useGetCartForCheckoutContainerQuery } from '../graphqlTypes';
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
    if (!cart) {
        const { data } = useGetCartForCheckoutContainerQuery();
        const cart = data?.cart;
    }

    if (!cart) return null;

    if (!unitPrice) {
        const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
        const unitPrice = determinePrice(totalQuantity);
    }

    return (
        <div>Checkout Container</div>
    )
}
