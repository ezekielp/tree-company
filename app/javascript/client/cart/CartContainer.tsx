import React, { FC, useContext } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { useGetCartForCartContainerQuery, GetCartForCartContainerDocument } from '../graphqlTypes';
import { determinePrice } from './utils';
import { client } from '../../packs/client';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';

const CartDisplayContainer = styled.div`

`;

const SubtotalContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

interface CartContainerProps {}

export const CartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {
    // const { data, refetch } = useGetCartForCartContainerQuery();
    // client().watchQuery({ query: GetCartForCartContainerDocument }).subscribe({
    //     next(data) { refetch() }
    // });

    const {cart} = useContext(CartContext);

    // const cart = data?.cart;

    if (!cart) return null;

    const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const unitPrice = determinePrice(totalQuantity);

    const cartItems = cart.map(({ quantity, productId }) => (
        <CartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} unitPrice={unitPrice} />
    ));

    const subtotal = (totalQuantity * unitPrice);

    return (
        <>
        <span>Shopping Cart</span><i className="fas fa-shopping-cart"></i>
            <CartDisplayContainer>
                {cartItems}
                <SubtotalContainer>
                    <span>Subtotal: </span><span>${subtotal / 100}.00</span>
                </SubtotalContainer>
            </CartDisplayContainer>
        </>
    );
}
