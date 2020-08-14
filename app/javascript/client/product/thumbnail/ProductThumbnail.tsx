import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ModalContext, CartContext } from '../../AppContainer';
import { ProductInfoFragment, useAddToCartMutation } from 'client/graphqlTypes';
import { FormikNumberInput } from '../../form/inputs';
import { colors } from '../../styles';

const ProductThumbnailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    height: auto;
    align-items: center;
    margin: 20px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;    
`;

const ProductImageContainer = styled.img`
    object-fit: cover;
    width: 290px;
    height: 390px;
    border: 5px solid ${colors.darkGreen};
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 15px;
`;

const ProductInformation = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-bottom: 7px;
`;

const ProductName = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ProductDetails = styled.div`
    margin-bottom: 20px;
`;

const ProductDetail = styled.div`
    margin-bottom: 3px;
    line-height: 130%;
`;

const FieldContainer = styled.div`
    width: 67px;
    align-self: flex-end;
`;

const AddToCartButton = styled.button`
    width: 150px;
    align-self: flex-end;
`;

interface ProductThumbnailProps {
    product: ProductInfoFragment;
}

interface AddToCartData {
    productId: string;
    quantity: string;
}

const ProductThumbnail: FC<ProductThumbnailProps> = (product) => {

    const {openModal, setFlashMessage, setSelectedProduct} = useContext(ModalContext);
    const { fetchCart } = useContext(CartContext);
    const [addItemToCart] = useAddToCartMutation();

    const { id, name, description, imageUrl, material, size, counties } = product.product;

    const handleFocus = (event: FocusEvent) => event && (event.target as HTMLInputElement).select();

    const handleClick = (product: ProductInfoFragment) => {
        setSelectedProduct(product);
        openModal("productModal");
    }

    const handleSubmit = async (values: AddToCartData, formikHelpers: FormikHelpers<AddToCartData>) => {
        const { quantity } = values;
        
        addItemToCart({
            variables: {
                input: {
                    productId: id,
                    quantity: parseInt(quantity)
                }
            }
        }).then(
            (event)=>{
                setSelectedProduct(product.product);
                setFlashMessage(quantity);
                fetchCart();
                openModal("successModal");
                formikHelpers.setFieldValue("quantity", "1");
            }
        );

    };

    if (!imageUrl) return null;

    const initialValues = {
        productId: id,
        quantity: "1"
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <ProductThumbnailContainer>
                        <ProductImageContainer onClick={()=>handleClick(product.product)} src={imageUrl} />
                        <ProductInformation>
                            <ProductName>{name}</ProductName>
                            <ProductDetails>
                                <ProductDetail>Material: {material}</ProductDetail>
                                <ProductDetail>Size: {size}</ProductDetail>
                                {description != "" && <ProductDetail>Description: {description}</ProductDetail>}
                            </ProductDetails>
                            <FieldContainer>
                                <Field name="quantity" label="Quantity" component={FormikNumberInput} alignRight onFocus={handleFocus} 
                                />
                            </FieldContainer>
                            <AddToCartButton type="submit" disabled={isSubmitting}>Add to Cart</AddToCartButton>
                        </ProductInformation>            
                    </ProductThumbnailContainer>
                </Form>    
            )}
        </Formik>

    )
}

export default ProductThumbnail;