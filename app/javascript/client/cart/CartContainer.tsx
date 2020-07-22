import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { useGetCartForCartContainerQuery, GetCartForCartContainerDocument } from '../graphqlTypes';
import { determinePrice } from './utils';
import { client } from '../../packs/client';
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

const CartDisplayContainer = styled.div`

`;

const SubtotalContainer = styled.div`
    display: flex;
`;

interface CartContainerProps {}

export const CartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {
    const { data, refetch } = useGetCartForCartContainerQuery();
    client().watchQuery({ query: GetCartForCartContainerDocument }).subscribe({
        next(data) { refetch() }
    });
    const cart = data?.cart;

    if (!cart) return null;

    const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const unitPrice = determinePrice(totalQuantity);

    const cartItems = cart.map(({ quantity, productId }) => (
        <CartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} unitPrice={unitPrice} />
    ));

    const subtotal = totalQuantity * unitPrice;

    return (
        <CartDisplayContainer>
            {cartItems}
            <SubtotalContainer>
                ${subtotal}.00
            </SubtotalContainer>
        </CartDisplayContainer>
    );
}
