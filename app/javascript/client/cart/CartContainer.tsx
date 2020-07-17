import React, { FC } from 'react';
import gql from 'graphql-tag';

gql`
    query GetCartForCartContainer {
        cart {
            product_id
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

