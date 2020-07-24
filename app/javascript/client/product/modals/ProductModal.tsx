import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

const ProductModalContainer = styled.div`
    display: flex;
    flex-direction: column;
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
interface ProductModalProps {
    product: ProductInfoFragment
}

const ProductModal: FC<ProductModalProps> = () => {

    const {modalIsShowing, product, openModal, closeModal} = useContext(ModalContext);

    return (
        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
            <p>Product Modal Goes here</p>
            <CloseModalButton onClick={()=>closeModal()}>Close</CloseModalButton>
        </ProductModalContainer>
    )
}

export default ProductModal;