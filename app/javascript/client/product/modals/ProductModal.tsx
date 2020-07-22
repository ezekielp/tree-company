import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

const ProductModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2/3;
    grid-row: 2/3;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 10px;
`;

const CloseModalButton = styled.button`
    width: 100px;
    height: 50px;
    cursor: pointer;
`

const ProductModal = () => {

    const {modalIsShowing, openModal, closeModal} = useContext(ModalContext);

    return (
        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
            <p>Product Modal Goes here</p>
            <CloseModalButton onClick={()=>closeModal()}>Close</CloseModalButton>
        </ProductModalContainer>
    )
}

export default ProductModal;