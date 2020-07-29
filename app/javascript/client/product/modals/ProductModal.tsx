import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../home/HomePage';

const AddToCartButton = styled.button`

`

const CloseModalButton = styled.button`
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: none;
    border: 1px solid black;
    border-radius: 1rem;
    font-weight: bold;
`

const InputQuantity = styled.input`

`

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;
`;

const ProductModalContainer = styled.div`
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    display: grid;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 10px;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
`

interface ProductModalProps {}

const ProductModal: FC<ProductModalProps> = () => {

    const { selectedProduct, closeModal} = useContext(ModalContext);

    if (!selectedProduct.imageUrl) return null;

    return (
        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseModalButton onClick={()=>closeModal()}>X</CloseModalButton>
            <ProductName>{selectedProduct.name}</ProductName>
            <ProductInformation>
                <span>Material: {selectedProduct.material}</span>
                <span>Size: {selectedProduct.size}</span>
                {selectedProduct.description != "" && <span>Description: {selectedProduct.description}</span>}
            </ProductInformation>
            <ProductImageContainer src={selectedProduct.imageUrl} />
            
        </ProductModalContainer>
    )
}

export default ProductModal;