import React, { FC } from 'react';
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { useGetCartForCartContainerQuery } from '../graphqlTypes';
import gql from 'graphql-tag';

gql`
    query GetCartForCartContainer {
        cart {
            productId
            quantity
        }
    }
`;

interface CartContainerProps {}

export const CartContainer: FC<CartContainerProps> = () => {
    const { data } = useGetCartForCartContainerQuery();
    const cart = data?.cart;

    if (!cart) return null;

    const cartItems = cart.map(({ quantity, productId }) => (
        <CartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} />
    ));

    return (
        <>{cartItems}</>
    );
}
