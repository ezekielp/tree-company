import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

const ProductThumbnailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    height: 350px;
    align-items: center;
    background: green;
    border-radius: 10px;
    color: white;
    cursor: pointer;
`;

const ProductThumbnail = (props) => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    return (
        <ProductThumbnailWrapper onClick={()=>openModal()}>
            <p>Thumbnail Goes here</p>
        </ProductThumbnailWrapper>
    )
}

export default ProductThumbnail;