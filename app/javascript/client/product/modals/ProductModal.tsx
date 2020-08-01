import React, { FC, useContext, useState, useRef, useEffect, FocusEvent } from 'react';
import { ProductInfoFragment, useAddToCartMutation } from '../../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikNumberInput, FormikTextInput} from '../../form/inputs';
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
    // const [productQuantity, setProductQuantity] = useState(1);
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const [addItemToCart] = useAddToCartMutation();

    // useEffect( ()=> {
    //     if (inputRef.current) inputRef.current.value=productQuantity.toString();
    // });

    // const handleChange = (event: FocusEvent<HTMLInputElement>) => {
    //     const change = parseInt(event.target.value);
    //     // if (change > 1) {
    //     //     setProductQuantity(change);
    //     // }

    //     // else if ((productQuantity == 1 && change == 1) || (productQuantity > 1)){
    //     //     setProductQuantity(productQuantity + change);
    //     // };
        
    //     setProductQuantity(change);
    // };

    // const handleSubmit = () => {

    //     if (!inputRef.current) return initialValues;
    //     const productQuantity = parseInt(inputRef.current.value);

    //     console.log("added " + productQuantity + " to cart");

    //     useAddToCartMutation({
    //         variables: {
    //             input: {
    //                 productId: selectedProduct.id,
    //                 quantity: productQuantity
    //             }
    //         }
    //     });

    //     closeModal();
    // };

    const handleSubmit = ((values: {
        productId: string;
        quantity: number;
    }, formikHelpers: FormikHelpers<{
        productId: string;
        quantity: number;
    }>) => {
        if (!inputRef.current) return initialValues;

        const productQuantity = parseInt(inputRef.current.value);
        
        addItemToCart({
            variables: {
                input: {
                    productId: selectedProduct.id,
                    quantity: productQuantity
                }
            }
        });

        console.log("added " + productQuantity + " to cart");
        closeModal();
    });

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
                        <ProductImageContainer src={selectedProduct.imageUrl} />
                        <ProductInformation>
                            <span>Material: {selectedProduct.material}</span>
                            <span>Size: {selectedProduct.size}</span>
                            {selectedProduct.description != "" && <span>Description: {selectedProduct.description}</span>}
                        </ProductInformation>
                        {/* <Field name="quantity" label="Quantity" innerRef={inputRef} component={<InputQuantity placeholder="1" type="number" min="1" max="999" onBlur={handleChange}/>}/> */}
                        <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikNumberInput}/>
                        {/* <DecreaseQuantityButton onClick={()=>handleChange(-1)}>-</DecreaseQuantityButton> */}
                        {/* <InputQuantity placeholder="1" type="number" min="1" max="999" ref={inputRef} onBlur={handleChange}/> */}
                        {/* <IncreaseQuantityButton onClick={()=>handleChange(1)}>+</IncreaseQuantityButton> */}
                        <AddToCartButton type="submit" disabled={isSubmitting}>Add to Cart</AddToCartButton>
                    </ProductModalContainer>
                </Form>    
            )}
        </Formik>
    )
}

export default ProductModal;