import React, { FC, useState, ChangeEvent, useRef, useContext } from 'react';
import { useGetCartForCartContainerQuery, ProductInfoFragment, useUpdateCartMutation } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikUpdateNumberInput, FormikTextInput} from '../form/inputs';
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
    width: 100%;
    height: 50%;
`

const RemoveFromCartButton = styled.button`
    border-radius: 0.5rem;
    width: 2rem;
    height: 1rem;
`

export const CartProductDetails = styled.div`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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

    const handleSubmit = async (values: UpdateCartData, formikeHelpers: FormikHelpers<UpdateCartData>) => {

        if (!inputRef.current) return initialValues;

        const newQuantity = parseInt(inputRef.current.value);

        updateItemQuantity({
            variables: {
                input: {
                    productId: id,
                    quantity: newQuantity
                }
            }
        }).then(
            (event)=>{
                console.log(event);
                fetchCart();
            }
        );
    };

    const initialValues = {
        productId: id,
        quantity: currentQuantity
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <ItemContainer>
                        <ImageContainer>
                            {imageUrl ? (
                                <Image src={imageUrl} alt={name} />
                            ) : (
                                <ImageStandIn>The Tree Company sign</ImageStandIn>
                            )}
                        </ImageContainer>
                        <CartProductDetails>
                            <ProductNameContainer>{name}</ProductNameContainer>
                            <div>
                                {size}, {material}
                            </div>
                            {counties && <div>Counties: {countyList}</div>}
                        </CartProductDetails>
                        <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikUpdateNumberInput} value={currentQuantity} />
                        <UpdateCartButton type="submit" disabled={isSubmitting}>Update Cart</UpdateCartButton>
                        <div>${totalPrice / 100}.00</div>
                    </ItemContainer>
                </Form>
            )}
        </Formik>
		);
};
