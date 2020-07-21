import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

const ProductModal = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2/3;
    grid-row: 2/3;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 10px;
`;

const CloseModalButton = styled.button`
    width: 100px;
    height: 50px;
    cursor: pointer;
`

const Product = () => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    return (
        <ProductModal onClick={(e) => e.stopPropagation()}>
            <p>Product Modal Goes here</p>
            <CloseModalButton onClick={()=>closeModal()}>Close</CloseModalButton>
        </ProductModal>
    )
}

export default Product;