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
const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;
`;

interface ProductModalProps {}

const ProductModal: FC<ProductModalProps> = () => {

    const { selectedProduct, closeModal} = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    // TODO add to cart/quantity

    return (
        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
            <div>{selectedProduct.name}</div>
            <div>{selectedProduct.material}</div>
            <div>{selectedProduct.description}</div>
            <div>{selectedProduct.size}</div>
            <ProductImageContainer src={selectedProduct.imageUrl} />
            <CloseModalButton onClick={()=>closeModal()}>Close</CloseModalButton>
        </ProductModalContainer>
    )
}

export default ProductModal;