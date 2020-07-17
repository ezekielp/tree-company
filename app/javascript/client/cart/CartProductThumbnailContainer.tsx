import React, { FC } from 'react';
import { ProductInfoFragmentDoc } from '../graphqlTypes';
import gql from 'graphql-tag';

gql`
    query GetProductForCartProductThumbnailContainer($productId: String!) {
        product(productId: $productId) {
            ...ProductInfo
        }
    }

    ${ProductInfoFragmentDoc}
`;

gql`
    mutation UpdateCart($input: UpdateCartInput!) {
        updateCart(input: $input) {
            cart {
                productId
                quantity
            }
        }
    }
`;

interface CartProductThumbnailContainerProps {}

export const CartProductThumbnailContainer: FC<CartProductThumbnailContainerProps> = () => {
    return (
        <></>
    );
};
