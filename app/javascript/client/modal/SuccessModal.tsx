import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../home/HomePage';

const CloseModalButton = styled.button`
    width: 50%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`

const CheckoutButton = styled.button`
    width: 50%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`

const ViewCartButton = styled.button`
    width: 50%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
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
    display: flex;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 2rem;
    flex-direction: column;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

interface SuccessModalProps {}


const SuccessModal: FC<SuccessModalProps> = () => {

    const { selectedProduct, closeModal, flashMessage } = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    return (
        <SuccessModalContainer>
            <h1>You have added: <br/><br/>{`${flashMessage}x ${selectedProduct.name}`} <br/><br/> to the cart! </h1>
            <CloseModalButton onClick={()=>closeModal()}>Continue Shopping</CloseModalButton>
            <ViewCartButton onClick={()=>closeModal()}>View Cart</ViewCartButton>
            <CheckoutButton onClick={()=>closeModal()}>Proceed to Checkout</CheckoutButton>
        </SuccessModalContainer>
    )
}

export default SuccessModal;