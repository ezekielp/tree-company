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

    const {modalIsShowing, productId, openModal, closeModal, setProductId} = useContext(ModalContext);

    const { id? , name?, description?, imageUrl?, material?, size?, styleNumber?, counties? } = product.product;
    debugger

    const handleClick = (id) => {
        setProductId(id)
        openModal();
    }

    return (
        <ProductThumbnailContainer onClick={(id)=>handleClick(id)}>
            <img 
            src = {imageUrl}>

            </img>
        </ProductThumbnailContainer>
    )
}

export default ProductThumbnail;