import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import ProductModal from '../product/modals/ProductModal';
import { ModalContext } from '../home/HomePage';
import { ProductInfoFragment } from 'client/graphqlTypes';

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

interface ModalProps {
    // products: ProductInfoFragment[]
}

const Modal: FC<ModalProps> = () => {

    const {modalIsShowing, product, openModal, closeModal} = useContext(ModalContext);


    if (modalIsShowing){
        return (
            <DefaultBackdrop onClick={()=>closeModal()}>
                <ProductModal product={product}/>
            </DefaultBackdrop>
        )
    } else {
        return null;
    }

    
}

export default Modal;

