import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import ProductModal from './ProductModal';

// gql`

// `

interface ProductModalContainerProps {};

const ProductModalContainer: FC<ProductModalContainerProps & RouteComponentProps> = () => {
    return (
        <ProductModal />
    )
};

export default ProductModalContainer;