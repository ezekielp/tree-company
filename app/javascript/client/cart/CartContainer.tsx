import React, { FC } from 'react';
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
    return (
        <>
        </>
    );
}

