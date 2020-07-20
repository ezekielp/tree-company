import React, { FC } from 'react';
import gql from 'graphql-tag';

gql`
    query GetCartForCheckoutContainer {
        cart {
            productId
            quantity
        }
    }
`;

interface CheckoutContainerProps {}

export const CheckoutContainer: FC<CheckoutContainerProps> = () => {
    // const { data } = 

    return (
        <div>Checkout Container</div>
    )
}
