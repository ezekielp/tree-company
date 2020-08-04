import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import ProductModal from './ProductModal';

gql`
    mutation AddToCart($input: UpdateCartInput!) {
        addToCart(input: $input) {
            cart {
                productId
                quantity
            }
        }
    }
`;

interface ProductModalContainerProps {};

const ProductModalContainer: FC<ProductModalContainerProps> = () => {
    return (
        <ProductModal />
    )
};

export default ProductModalContainer;