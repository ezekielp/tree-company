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
`;

interface ProductThumbnailProps {
    product: ProductInfoFragment;
}

const ProductThumbnail: FC<ProductThumbnailProps> = (product) => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    const { imageUrl? } = product.product;
    
    debugger

    return (
        <ProductThumbnailContainer onClick={()=>openModal()}>
            <img 
            src = {imageUrl}>

            </img>
        </ProductThumbnailContainer>
    )
}

export default ProductThumbnail;