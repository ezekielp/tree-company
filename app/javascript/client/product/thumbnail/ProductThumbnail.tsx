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

interface ProductThumbnailProps {
    product: ProductInfoFragment;
}

const ProductThumbnail: FC<ProductThumbnailProps> = (product) => {

    const {modalIsShowing, selectedProduct, openModal, closeModal, setSelectedProduct} = useContext(ModalContext);

    const { id , name, description, imageUrl, material, size, styleNumber, counties } = product.product;

    const handleClick = (product: ProductInfoFragment) => {
        setSelectedProduct(product)
        openModal();
    }

    if (!imageUrl) return null;

    const imageStyles: CSS.Properties = {
        objectFit: 'cover',
        width: '290px',
        height: '390px'
    }

    const { imageUrl? } = product.product;
    
    debugger

    return (
        <ProductThumbnailContainer onClick={()=>handleClick(product.product)}>
            <img src={imageUrl} style={ imageStyles }/>
        </ProductThumbnailContainer>
    )
}

export default ProductThumbnail;