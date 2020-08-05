import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../home/HomePage';
import ProductModalContainer from 'client/product/modals/ProductModalContainer';

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
    background: rgba(0,0,0,0.75);
    overflow-y: auto;
    z-index: 10;
`;

interface ModalProps {}

const Modal: FC<ModalProps> = () => {

    const {modalIsShowing, openModal, closeModal, displayedModal} = useContext(ModalContext);

    let renderedModal;

    switch (displayedModal){
        case "productModal":
            renderedModal = (<ProductModalContainer />);
            break;
        default:
            renderedModal = null;
    }

    if (modalIsShowing){
        return (
            <DefaultBackdrop onClick={()=>closeModal()}>
                {renderedModal}
            </DefaultBackdrop>
        )
    } else {
        return null;
    }

}

export default Modal;

