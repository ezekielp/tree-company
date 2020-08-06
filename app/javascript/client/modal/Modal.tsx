import React, { FC, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../home/HomePage';
import ProductModalContainer from 'client/product/modals/ProductModalContainer';
import SuccessModal from './SuccessModal';

const DefaultBackdrop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.6);
    overflow-y: auto;
    z-index: 10;
`;

interface ModalProps {}

const Modal: FC<ModalProps> = () => {

    const {modalIsShowing, openModal, closeModal, displayedModal} = useContext(ModalContext);

    if (!modalIsShowing) return null;

    let clickEffect;
    let component;

    switch (displayedModal){
        case "productModal":
            clickEffect = () => closeModal();
            component = (<ProductModalContainer />);
            break;
        case "successModal":
            clickEffect = () => closeModal();
            component = (<SuccessModal />);
            break;
        default:
            component = null;
    }

    return (
        <DefaultBackdrop onClick={clickEffect}>
            {component}
        </DefaultBackdrop>
    )

}

export default Modal;

