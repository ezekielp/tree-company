import React, { FC, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';
import CSS from 'csstype';

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
<<<<<<< HEAD
interface ProductModalProps {}
=======
interface ProductModalProps {
    // product: ProductInfoFragment
}
>>>>>>> load images

const ProductModal: FC<ProductModalProps> = () => {

    const { selectedProduct, closeModal} = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    const imageStyles = {
        objectFit: 'cover',
        width: '600px',
        height: '800px'
    }

    return (
        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
            <div>{selectedProduct.name}</div>
            <div>{selectedProduct.material}</div>
            <div>{selectedProduct.description}</div>
            <div>{selectedProduct.size}</div>
            <img src={selectedProduct.imageUrl} alt="" style={imageStyles}/>
            <CloseModalButton onClick={()=>closeModal()}>Close</CloseModalButton>
        </ProductModalContainer>
    )
}

export default ProductModal;