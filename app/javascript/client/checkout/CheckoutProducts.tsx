import React, { FC } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import { CartProductDetails, ProductNameContainer } from '../cart/CartProductThumbnail';
import styled from 'styled-components';

const CheckoutProductContainer = styled.div`
    display: flex;
`;

interface CheckoutItem {
    product: ProductInfoFragment;
    quantity: number;
}

interface CheckoutProductsProps {
    unitPrice: number;
    checkoutItems: CheckoutItem[];
}

export const CheckoutProducts: FC<CheckoutProductsProps> = ({ unitPrice, checkoutItems }) => {

    const checkoutProducts = checkoutItems.map(item => {
        const { product, quantity } = item;
        const { id, name, size, material, counties } = product;

        const countyList = counties?.map(county => county.name).join(", ");
        const totalPrice = unitPrice * quantity;

        return (
            <CheckoutProductContainer key={id}>
                <CartProductDetails>
                    <ProductNameContainer>{name}</ProductNameContainer>
                    <div>
                        {size}, {material}
                    </div>
                    {counties && <div>Counties: {countyList}</div>}
                </CartProductDetails>
                <div>${totalPrice}.00</div>
            </CheckoutProductContainer>
        )
    })

    return (
        <>{checkoutProducts}</>
    );
}
