import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ModalContext } from '../home/HomePage';

const CloseModalButton = styled.button`
    width: 100%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`

const CheckoutButton = styled.button`
    width: 100%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`

const ViewCartButton = styled.button`
    width: 100%;
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

interface SuccessModalProps extends RouteComponentProps {}


const SuccessModal: FC<SuccessModalProps> = ({ history }) => {

    const { selectedProduct, closeModal, flashMessage } = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    // TODO if screenwidth > device large toggle cart slider instead
    const handleClick = (path: string)=>{
        closeModal();
        history.push(`/${path}`);
        console.log(path);
    }

    return (
        <SuccessModalContainer>
            <h1>You have added: <br/><br/>{`${flashMessage}x ${selectedProduct.name}`} <br/><br/> to the cart! </h1>
            <ViewCartButton onClick={()=>handleClick("cart")}>View Cart</ViewCartButton>
            <CheckoutButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</CheckoutButton>
            <CloseModalButton onClick={()=>closeModal()}>Continue Shopping</CloseModalButton>
        </SuccessModalContainer>
    )
}

export default withRouter(SuccessModal);