import React, { FC, useState, ChangeEvent, useRef } from 'react';
import { useGetCartForCartContainerQuery, ProductInfoFragment, useUpdateCartMutation } from '../graphqlTypes';
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormikUpdateNumberInput, FormikTextInput} from '../form/inputs';
import { range } from 'lodash';
import styled from 'styled-components';

const FlexContainer = styled.section`
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    max-height: 400px;
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

`

export const CartProductDetails = styled.div`
    max-width: 400px;
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

    // const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     setQuantity(parseInt(event.target.value));

    //     useUpdateCartMutation({
    //         variables: {
    //             input: {
    //                 productId: id,
    //                 quantity: currentQuantity
    //             }
    //         }
    //     });

    //     useGetCartForCartContainerQuery();
    // }

    const [updateCart] = useUpdateCartMutation();  

    const handleSubmit = async (values: UpdateCartData, formikeHelpers: FormikHelpers<UpdateCartData>) => {

        if (!inputRef.current) return initialValues;

        const newQuantity = parseInt(inputRef.current.value);

        updateCart({
            variables: {
                input: {
                    productId: id,
                    quantity: newQuantity
                }
            }
        }).then(
            (event)=>{
                console.log(event);
                // useGetCartForCartContainerQuery();
            }
        );
    };

    const initialValues = {
        productId: id,
        quantity: quantity
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <FlexContainer>
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
                        <Field name="quantity" label="Quantity" innerRef={inputRef} component={FormikUpdateNumberInput} value={quantity}/>
                        {/* <select onChange={handleChange}>{quantityOptions}</select> */}
                        {/* <button onClick={()=>setQuantity(0)}>Remove Item</button> */}
                        <UpdateCartButton type="submit" disabled={isSubmitting}>Update Cart</UpdateCartButton>
                        <div>${totalPrice}.00</div>
                    </FlexContainer>
                </Form>
            )}
        </Formik>
		);
};
