import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProductThumbnail } from './ProductThumbnail';

interface ProductThumbnailProps {}

const ProductThumbnailContainer: FC<ProductThumbnailProps & RouteComponentProps> = () => {
    debugger
    return (
        <ProductThumbnail></ProductThumbnail>
    )
}

export default ProductThumbnailContainer;