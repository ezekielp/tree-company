import React, { FC, useContext, useRef } from 'react';
import { useAddToCartMutation } from '../../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikNumberInput } from '../../form/inputs';
import { ModalContext, CartContext } from '../../AppContainer';
import { XMark } from '../../assets/XMark';
import { device } from '../../styles';
import styled from 'styled-components';

const CloseModalButtonContainer = styled.div`


    ${`@media ${device.larger}`} {
        display: flex;
        grid-row: 1;
        grid-column: 2;
        flex-direction: column;
    }

`;

const CloseModalButton = styled.button`
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: none;
    border: 1px solid black;
    border-radius: 1rem;
    font-weight: bold;

    ${`@media ${device.larger}`} {
        grid-row: 1;
        grid-column: 2;
        align-self: flex-end;
    }
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;

    ${`@media ${device.larger}`} {
        grid-column: 2;
        grid-row: 2;
        margin-left: 35px;
    }
`;

const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;

    ${`@media ${device.larger}`} {
        width: 450px;
        height: auto;
        grid-column: 1;
        grid-row-start: span 2;
    }
`;

const ProductModalContainer = styled.div`
    display: grid;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 10px;

    ${`@media ${device.larger}`} {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50px 1fr;
    }
`;

const AddToCartButton = styled.button`

`;

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
                        <CloseModalButtonContainer>
                            <CloseModalButton onClick={()=>closeModal()}>X</CloseModalButton>
                        </CloseModalButtonContainer>
                        {selectedProduct.imageUrl && (
                            <ProductImageContainer src={selectedProduct.imageUrl} />
                        )}
                        <ProductInformation>
                            <ProductName>{selectedProduct.name}</ProductName>
                            <div>Material: {selectedProduct.material}</div>
                            <div>Size: {selectedProduct.size}</div>
                            {selectedProduct.description != "" && <div>Description: {selectedProduct.description}</div>}
                            <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikNumberInput}/>
                            <AddToCartButton type="submit" disabled={isSubmitting}>Add to Cart</AddToCartButton>
                        </ProductInformation>
                    </ProductModalContainer>
                </Form>    
            )}
        </Formik>
    )
}

export default ProductModal;