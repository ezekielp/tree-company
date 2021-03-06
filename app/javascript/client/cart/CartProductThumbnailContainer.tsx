import React, { FC } from 'react';
import { useGetProductForCartProductThumbnailContainerQuery, ProductInfoFragmentDoc } from '../graphqlTypes';
import { CartProductThumbnail } from './CartProductThumbnail';
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
    unitPrice: number;
}

export const CartProductThumbnailContainer: FC<CartProductThumbnailContainerProps> = ({ productId, quantity, unitPrice }) => {
    const { data } = useGetProductForCartProductThumbnailContainerQuery({ variables: { productId }})
    const product = data?.product;

    if (!product) return null;

    return (
        <CartProductThumbnail product={product} quantity={quantity} unitPrice={unitPrice} />
    );
};
