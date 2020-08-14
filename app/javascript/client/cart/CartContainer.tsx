import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { determinePrice } from './utils';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';
import { device } from '../styles';

const CartDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const CheckoutButton = styled.button`
    width: 10rem;
    height: 2rem;
    margin: 0.5rem 0rem 0.5rem 0rem;
`;

const SubtotalContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.5rem;
`;

const ShoppingCartIconContainer = styled.div`
    display: flex;
    justify-content: center;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 1rem 0.5rem 0rem 0.5rem;
`

interface CartContainerProps {}

const CartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    
    if (!cart) return null;
    
    const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const unitPrice = determinePrice(totalQuantity);

    const cartItems = cart.map(({ quantity, productId }) => (
        <CartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} unitPrice={unitPrice} />
    ));

    const subtotal = (totalQuantity * unitPrice);

    const handleClick = (path: string)=>{
        history.push(`/${path}`);
    }

    return (
        <>
            <ShoppingCartIconContainer><span>Shopping Cart</span><i className="fas fa-shopping-cart"></i></ShoppingCartIconContainer>
            <CartDisplayContainer>
                {cartItems}
                <SubtotalContainer>
                    <span>Subtotal: </span><span>${subtotal / 100}.00</span>
                </SubtotalContainer>
                <CheckoutButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</CheckoutButton>
            </CartDisplayContainer>
        </>
    );
}

export default withRouter(CartContainer);