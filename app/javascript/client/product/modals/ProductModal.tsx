import React, { FC, useContext } from 'react';
import { useAddToCartMutation } from '../../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikNumberInput } from '../../form/inputs';
import { ModalContext, CartContext } from '../../AppContainer';
import { XMark } from '../../assets/XMark';
import { device } from '../../styles';
import styled from 'styled-components';

const FormContainer = styled.div`
    width: 95%;

    ${`@media ${device.largest}`} {
        width: 75%;
    }
`;

const ProductModalContainer = styled.div`
    display: grid;
    align-items: center;
    background: white;
    border-radius: 10px;
    padding: 25px;

    ${`@media ${device.larger}`} {
        grid-template-columns: 450px 1fr;
        grid-template-rows: 50px 1fr;
        width: 97%;
        padding: 10px;
    }
`;

const CloseModalButtonContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${`@media ${device.larger}`} {
        grid-row: 1;
        grid-column: 2;
    }

`;

const CloseModalButton = styled.div`
    cursor: pointer;
    background: none;
    border: none;
    align-self: flex-end;

    ${`@media ${device.larger}`} {
        grid-row: 1;
        grid-column: 2;
    }
`;

const ProductName = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;

    ${`@media ${device.larger}`} {
        grid-column: 2;
        grid-row: 2;
        margin-left: 35px;
        margin-right: 20px;
    }
`;

const ProductDetails = styled.div`
    margin-bottom: 20px;
`;

const ProductDetail = styled.div`
    margin-bottom: 3px;
    line-height: 130%;
`;

const ProductImageContainer = styled.img`
    object-fit: cover;

    ${`@media ${device.mobileLarge}`} {
        width: 250px;
        height: auto;
        margin: 10px auto 20px auto;
    }

    ${`@media ${device.larger}`} {
        width: 450px;
        height: auto;
        grid-column: 1;
        grid-row-start: span 2;
        margin: 10px auto;
    }
`;

const FieldContainer = styled.div`
    width: 67px;
    align-self: flex-end;
`;

const AddToCartButton = styled.button`
    width: 150px;
    align-self: flex-end;
`;

interface ProductModalProps {}

export interface AddToCartData {
    productId: string;
    quantity: string;
}

const ProductModal: FC<ProductModalProps> = () => {

    const { selectedProduct, setFlashMessage, closeModal, openModal } = useContext(ModalContext);
    const { fetchCart } = useContext(CartContext);
    
    // const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const [addItemToCart] = useAddToCartMutation();   

    const handleFocus = (event: FocusEvent) => event && (event.target as HTMLInputElement).select();

    const handleSubmit = async (values: AddToCartData, formikHelpers: FormikHelpers<AddToCartData>) => {
        const { quantity } = values;
        
        addItemToCart({
            variables: {
                input: {
                    productId: selectedProduct.id,
                    quantity: parseInt(quantity)
                }
            }
        }).then(
            (event)=>{
                setFlashMessage(quantity);
                fetchCart();
                openModal("successModal");
                formikHelpers.setFieldValue("quantity", "1");
            }
        );

    };

    if (!selectedProduct.imageUrl) return null;

    const initialValues = {
        productId: selectedProduct.id,
        quantity: "1"
    };

    return (
        <FormContainer>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <ProductModalContainer onClick={(e) => e.stopPropagation()}>
                            <CloseModalButtonContainer>
                                <CloseModalButton onClick={()=>closeModal()}>
                                    <XMark width="15px" />
                                </CloseModalButton>
                            </CloseModalButtonContainer>
                            {selectedProduct.imageUrl && (
                                <ProductImageContainer src={selectedProduct.imageUrl} />
                            )}
                            <ProductInformation>
                                <ProductName>{selectedProduct.name}</ProductName>
                                <ProductDetails>
                                    <ProductDetail>Material: {selectedProduct.material}</ProductDetail>
                                    <ProductDetail>Size: {selectedProduct.size}</ProductDetail>
                                    {selectedProduct.description != "" && <ProductDetail>Description: {selectedProduct.description}</ProductDetail>}
                                </ProductDetails>
                                <FieldContainer>
                                    <Field name="quantity" label="Quantity" component={FormikNumberInput} alignRight onFocus={handleFocus} />
                                </FieldContainer>
                                <AddToCartButton type="submit" disabled={isSubmitting}>Add to Cart</AddToCartButton>
                            </ProductInformation>
                        </ProductModalContainer>
                    </Form>    
                )}
            </Formik>
        </FormContainer>
    )
}

export default ProductModal;