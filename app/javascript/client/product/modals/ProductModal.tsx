import React, { FC, useContext, useRef } from 'react';
import { useAddToCartMutation } from '../../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikNumberInput } from '../../form/inputs';
import styled from 'styled-components';
import { ModalContext, CartContext } from '../../AppContainer';

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

interface AddToCartData {
    productId: string;
    quantity: number;
}

const ProductModal: FC<ProductModalProps> = () => {

    const { selectedProduct, setFlashMessage, closeModal, openModal } = useContext(ModalContext);
    const { fetchCart } = useContext(CartContext);
    
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const [addItemToCart] = useAddToCartMutation();   

    const handleSubmit = async (values: AddToCartData, formikHelpers: FormikHelpers<AddToCartData>) => {
        if (!inputRef.current) return initialValues;

        const productQuantity = parseInt(inputRef.current.value);
        
        addItemToCart({
            variables: {
                input: {
                    productId: selectedProduct.id,
                    quantity: productQuantity
                }
            }
        }).then(
            (event)=>{
                console.log(event);
                setFlashMessage(productQuantity.toString());
                fetchCart();
                openModal("successModal");    
            }
        );

    };

    if (!selectedProduct.imageUrl) return null;

    const initialValues = {
        productId: selectedProduct.id,
        quantity: 1
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <ProductModalContainer onClick={(e) => e.stopPropagation()}>
                        <CloseModalButton onClick={()=>closeModal()}>X</CloseModalButton>
                        <ProductName>{selectedProduct.name}</ProductName>
                        {selectedProduct.imageUrl && <ProductImageContainer src={selectedProduct.imageUrl} />}
                        <ProductInformation>
                            <span>Material: {selectedProduct.material}</span>
                            <span>Size: {selectedProduct.size}</span>
                            {selectedProduct.description != "" && <span>Description: {selectedProduct.description}</span>}
                        </ProductInformation>
                        <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikNumberInput}/>
                        <AddToCartButton type="submit" disabled={isSubmitting}>Add to Cart</AddToCartButton>
                    </ProductModalContainer>
                </Form>    
            )}
        </Formik>
    )
}

export default ProductModal;