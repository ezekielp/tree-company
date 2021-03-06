import React, { FC, useState, useRef, useContext } from 'react';
import { ProductInfoFragment, useUpdateCartMutation } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikUpdateNumberInput } from '../form/inputs';
import { range } from 'lodash';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';
import { device } from '../styles';

const ItemContainer = styled.section`
    display: grid;
    justify-content: space-between;
    max-width: 800px;
    max-height: auto;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-top: 1rem;
    padding: 1rem;
    border-bottom: 1px solid black;

    ${`@media ${device.larger}`} {
        display: flex;
        width: 95vw;
        max-width: 100vw;
    }
`;

const ImageContainer = styled.figure`
    min-width: 100px;
    max-width: 250px;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const ImageStandIn = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 20px;
`;

const UpdateCartButton = styled.button`
    border-radius: 1rem;
    width: 10rem;
    height: 2rem;
`

const RemoveFromCartButton = styled.button`
    color: gray;
    width: 10rem;
    height: 1rem;
    background-color: transparent;
    margin-top: 1rem;
    border: none;
`

const UpdateCartOptionsContainer = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 1rem;
`

const ButtonsAndPriceContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const PriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    ${`@media ${device.larger}`} {
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
    span{
        display: flex;
        justify-content: flex-end;
        ${`@media ${device.larger}`} {
            margin-top: 1rem;
        }
        span{
            font-size: 12px;
        }
    }
`

const ImageAndDetailContainer = styled.div`
    display: flex;
`

const ProductCartInfo = styled.div`
    display: flex;
    span:nth-child(2){
        margin-left: 5rem;
    }
`

export const CartProductDetails = styled.div`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    padding: 1rem;
`;

export const ProductNameContainer = styled.div`
    font-weight: 600;
`;

interface CartProductThumbnailProps {
    product: ProductInfoFragment;
    quantity: number;
    unitPrice: number;
}

interface UpdateCartData {
    productId: string;
    quantity: number;
}

export const CartProductThumbnail: FC<CartProductThumbnailProps> = ({ product, quantity, unitPrice }) => {
    const { id, name, size, material, counties, imageUrl } = product;
    const [currentQuantity, setQuantity] = useState(quantity);

    const countyList = counties?.map(county => county.name).join(", ");
    const totalPrice = unitPrice * quantity;
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const quantityOptions = range(1001).map(num => {
        const selected = num === currentQuantity ? 'selected' : '';
        return <option key={num} value={num} {...selected}>{num}</option>
    });

    const [updateItemQuantity] = useUpdateCartMutation();  
    const {fetchCart} = useContext(CartContext);

    const handleSubmit = async ( values: UpdateCartData, formikeHelpers: FormikHelpers<UpdateCartData>) => {

        if (!inputRef.current) return initialValues;

        const newQuantity =  (!inputRef.current.value) ? (0) : parseInt(inputRef.current.value);

        updateItemQuantity({
            variables: {
                input: {
                    productId: id,
                    quantity: newQuantity
                }
            }
        }).then((event)=>{fetchCart()});
    };

    const handleReset = async ()=> {
        updateItemQuantity({
            variables: {
                input: {
                    productId: id,
                    quantity: 0
                }
            }
        }).then((event)=>{fetchCart()});
    }

    const initialValues = {
        productId: id,
        quantity: currentQuantity
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} onReset={handleReset}>
            {({ isSubmitting }) => (
                <Form>
                    <ItemContainer>
                        <ImageAndDetailContainer>
                            <ImageContainer>
                                {imageUrl ? (<Image src={imageUrl} alt={name} />) : (<ImageStandIn>The Tree Company sign</ImageStandIn>)}
                            </ImageContainer>
                            <CartProductDetails>
                                <ProductNameContainer>{name}</ProductNameContainer>
                                <ProductCartInfo>
                                    <span>Size: <br />{size}</span>
                                    <span>Material: <br />{material}</span>
                                </ProductCartInfo>
                            </CartProductDetails>
                        </ImageAndDetailContainer>
                        <UpdateCartOptionsContainer>
                            <PriceContainer><span>Unit Price: ${unitPrice / 100}.00</span><span>Price: ${totalPrice / 100}.00</span></PriceContainer>
                            <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikUpdateNumberInput} value={currentQuantity} />
                            <ButtonsAndPriceContainer>
                                <ButtonsContainer>
                                    <UpdateCartButton type="submit" disabled={isSubmitting}>Update Cart</UpdateCartButton>
                                    <RemoveFromCartButton type="reset" disabled={isSubmitting}>Remove From Cart</RemoveFromCartButton>
                                </ButtonsContainer>
                            </ButtonsAndPriceContainer>
                        </UpdateCartOptionsContainer>
                    </ItemContainer>
                </Form>
            )}
        </Formik>
		);
};
