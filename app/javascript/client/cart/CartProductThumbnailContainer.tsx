import React, { FC } from 'react';
import { useGetProductForCartProductThumbnailContainerQuery, ProductInfoFragmentDoc } from '../graphqlTypes';
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

interface CartProductThumbnailContainerProps {
    productId: string;
    quantity: number;
}

export const CartProductThumbnailContainer: FC<CartProductThumbnailContainerProps> = ({ productId, quantity }) => {
    const { data } = useGetProductForCartProductThumbnailContainerQuery({ variables: { productId }})

    return (
        
    );
};
