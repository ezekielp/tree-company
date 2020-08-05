import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';
import { ProductInfoFragment } from 'client/graphqlTypes';

const ProductThumbnailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: 400px;
    align-items: center;
    background: green;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin-top: 10px;
`;

const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;
`;

interface ProductThumbnailProps {
    product: ProductInfoFragment;
}

const ProductThumbnail: FC<ProductThumbnailProps> = (product) => {

    const {modalIsShowing, selectedProduct, openModal, closeModal, setSelectedProduct} = useContext(ModalContext);

    const { id , name, description, imageUrl, material, size, styleNumber, counties } = product.product;

    const handleClick = (product: ProductInfoFragment) => {
        setSelectedProduct(product);
        openModal("productModal");
    }

    if (!imageUrl) return null;

    return (
        <ProductThumbnailContainer onClick={()=>handleClick(product.product)}>
            <ProductImageContainer src={imageUrl} />
        </ProductThumbnailContainer>
    )
}

export default ProductThumbnail;