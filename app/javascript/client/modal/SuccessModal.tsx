import React, { FC, useContext, useState, useRef, useEffect, FocusEvent } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import styled from 'styled-components';
import { ModalContext } from '../home/HomePage';

const CloseModalButton = styled.button`
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: none;
    border: 1px solid black;
    border-radius: 1rem;
    font-weight: bold;
`

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;
`;

const SuccessModalContainer = styled.div`
    display: grid;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 10px;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

interface SuccessModalProps {

}


const SuccessModal: FC<SuccessModalProps> = () => {

    const { selectedProduct, closeModal, openModal } = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    return (
        <SuccessModalContainer>
            <CloseModalButton onClick={()=>closeModal()}>X</CloseModalButton>
            <h1>This was a triumph</h1>
        </SuccessModalContainer>
    )
}

export default SuccessModal;