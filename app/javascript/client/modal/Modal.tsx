import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Product from '../product/modals/ProductModal';
import { Modal } from './test';
import { ModalContext} from '../home/HomePage';

const DefaultBackdrop = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.75);
    overflow-y: auto;
    z-index: 10;
`;

const Modal = () => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    if (modalIsShowing){
        return (
                <DefaultBackdrop>
                    <Product />
                </DefaultBackdrop>
        )
    } else {
        return null;
    }

    
}

export default Modal;

