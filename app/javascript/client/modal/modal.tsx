import React, { useState } from 'react';
import styled from 'styled-components';
import Product from '../product/modals/ProductModal'
import { Modal } from './test';

const DefaultBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.75);
    overflow-y: auto;
`;

const Modal = () => {

    const [modalIsShowing, setModalIsShowing] = useState(true);

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

