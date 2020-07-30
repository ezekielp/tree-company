import React, { FC, useContext, useState, useRef, useEffect } from 'react';
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

const DecreaseQuantityButton = styled.button`

`

const IncreaseQuantityButton = styled.button`

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
    const [productQuantity, setProductQuantity] = useState(1);
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    useEffect( ()=> {
        if (inputRef.current) inputRef.current.value=productQuantity.toString();
    });

    const handleChange = (change: number) => {
        if (change > 1) {
            setProductQuantity(change);
        };

        if ((productQuantity == 1 && change == 1) || (productQuantity > 1)){
            setProductQuantity(productQuantity + change);
        };
    };

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
            <DecreaseQuantityButton onClick={()=>handleChange(-1)}>-</DecreaseQuantityButton>
            <InputQuantity placeholder="1" type="number" min="1" max="999" ref={inputRef} onChange={(e)=>handleChange(e.current.value)}/>
            <IncreaseQuantityButton onClick={()=>handleChange(1)}>+</IncreaseQuantityButton>
            <AddToCartButton>Add to Cart</AddToCartButton>
        </ProductModalContainer>
    )
}

export default ProductModal;