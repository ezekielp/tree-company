import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

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

const ProductThumbnail = (props) => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    return (
        <ProductThumbnailContainer onClick={()=>openModal()}>
            <p>Thumbnail Goes here</p>
        </ProductThumbnailContainer>
    )
}

export default ProductThumbnail;