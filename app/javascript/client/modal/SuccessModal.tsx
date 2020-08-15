import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ModalContext } from '../AppContainer';
import { XMark } from '../assets/XMark';

const CloseButtonContainer = styled.div`
    align-self: flex-end;
    cursor: pointer;
`;

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
    width: 300px;
`;

const SuccessHeader = styled.div`
    font-size: 24px;
    font-variation-settings: 'wght' 600;
    margin-bottom: 15px;
`;

const Message = styled.div`
    text-align: center;
`;

const ProductName = styled.span`
    font-variation-settings: 'wght' 700;
`;

interface SuccessModalProps extends RouteComponentProps {}


const SuccessModal: FC<SuccessModalProps> = ({ history }) => {

    const { selectedProduct, closeModal, flashMessage } = useContext(ModalContext);

    const signWord = parseInt(flashMessage) > 1 ? "signs" : "sign";

    if (!selectedProduct.imageUrl) return null;

    // TODO if screenwidth > device large toggle cart slider instead
    const handleClick = (path: string)=>{
        closeModal();
        history.push(`/${path}`);
    }

    return (
        <SuccessModalContainer onClick={e => e.stopPropagation()}>
            <CloseButtonContainer onClick={() => closeModal()}>
                <XMark width="15px" />
            </CloseButtonContainer>
            <SuccessHeader>Success!</SuccessHeader>
            <Message>
                You have added {flashMessage} <ProductName>{selectedProduct.name}</ProductName> {signWord} to the cart!
            </Message>
            <StyledButton onClick={()=>handleClick("cart")}>View Cart</StyledButton>
            <StyledButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</StyledButton>
            <StyledButton onClick={()=>closeModal()}>Continue Shopping</StyledButton>
        </SuccessModalContainer>
    )
}

export default withRouter(SuccessModal);