import React, { FC, useState, useRef, useContext } from 'react';
import { ProductInfoFragment, useUpdateCartMutation } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikUpdateNumberInput } from '../form/inputs';
import { range } from 'lodash';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';

const ItemContainer = styled.section`
    display: grid;
    justify-content: space-between;
    max-width: 800px;
    max-height: 400px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin-top: 1rem;
    padding: 1rem;
    border-bottom: 1px solid black;
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
    border-radius: 1rem;
    width: 10rem;
    height: 1rem;
    background-color: white;
    border: 1px solid gray;
    margin-top: 1rem;
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
    justify-content: center;
    align-items: center;
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
                        <ImageContainer>
                            {imageUrl ? (<Image src={imageUrl} alt={name} />) : (<ImageStandIn>The Tree Company sign</ImageStandIn>)}
                        </ImageContainer>
                        <CartProductDetails>
                            <ProductNameContainer>{name}</ProductNameContainer>
                            <div>
                                Size: <br />{size}
                                <br />
                                <br />
                                Material: <br />{material}
                            </div>
                            {counties && <div>Counties: <br />{countyList}</div>}
                        </CartProductDetails>
                        <UpdateCartOptionsContainer>
                            <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikUpdateNumberInput} value={currentQuantity} />
                            <ButtonsAndPriceContainer>
                                <ButtonsContainer>
                                    <UpdateCartButton type="submit" disabled={isSubmitting}>Update Cart</UpdateCartButton>
                                    <RemoveFromCartButton type="reset" disabled={isSubmitting} id="remove_from_cart" >Remove From Cart</RemoveFromCartButton>
                                </ButtonsContainer>
                                <PriceContainer>${totalPrice / 100}.00</PriceContainer>
                            </ButtonsAndPriceContainer>
                        </UpdateCartOptionsContainer>
                    </ItemContainer>
                </Form>
            )}
        </Formik>
		);
};
