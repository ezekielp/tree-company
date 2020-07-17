import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { useGetCartForCartContainerQuery } from '../graphqlTypes';
import { determinePrice } from './utils';
import gql from 'graphql-tag';
import styled from 'styled-components';

gql`
    query GetCartForCartContainer {
        cart {
            productId
            quantity
        }
    }
`;



interface CartContainerProps {}

export const CartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {
    const { data } = useGetCartForCartContainerQuery();
    const cart = data?.cart;

    if (!cart) return null;

    const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const unitPrice = determinePrice(totalQuantity);

    const cartItems = cart.map(({ quantity, productId }) => (
        <CartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} unitPrice={unitPrice} />
    ));

    return (
        <>{cartItems}</>
    );
}
