import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { determinePrice } from './utils';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';
import { Navbar } from '../navbar/Navbar';
import { device } from '../styles';

const CartDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
`;

const SubtotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.5rem;
    width: 200px;
    padding: 1rem;
    span{
        margin-top: 1rem;
    }
    strong{
        margin-top: 1rem;
        font-size: 24px;
    }
`;

const ShoppingCartIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    margin: 1rem 0.5rem 0rem 0.5rem;
    font-size: 24px;
    border-bottom: 1px solid black;
`

const CheckoutButton = styled.button`
    max-width: 350px;
    min-width: 300px;
    height: 45px;
    font-size: 20px;
    margin: 0.5rem 0rem 1.25rem 0rem;
`;

const ReturnToSignsButton = styled.div`
    font-variation-settings: 'wght' 700;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

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
            <Navbar />
            <ShoppingCartIconContainer>
                <span>Shopping Cart<i className="fas fa-shopping-cart"></i></span>
            </ShoppingCartIconContainer>
            <CartDisplayContainer>
                {cartItems}
                <SubtotalContainer>
                    <span>Total Quantity: {totalQuantity}</span><strong>Subtotal: ${subtotal / 100}.00</strong>
                </SubtotalContainer>
                <CheckoutButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</CheckoutButton>
                <ReturnToSignsButton onClick={()=>handleClick("home")}>Return to signs</ReturnToSignsButton>
            </CartDisplayContainer>
        </>
    );
}

export default withRouter(CartContainer);