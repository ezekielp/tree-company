import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ModalContext } from '../AppContainer';

const StyledButton = styled.button`
    width: 100%;
    margin-top: 1rem;
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
    }

    return (
        <SuccessModalContainer onClick={e => e.stopPropagation()}>
            <h1>You have added: <br/><br/>{`${flashMessage}x ${selectedProduct.name}`} <br/><br/> to the cart! </h1>
            <StyledButton onClick={()=>handleClick("cart")}>View Cart</StyledButton>
            <StyledButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</StyledButton>
            <StyledButton onClick={()=>closeModal()}>Continue Shopping</StyledButton>
        </SuccessModalContainer>
    )
}

export default withRouter(SuccessModal);