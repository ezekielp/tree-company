import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { SlideoutCartProductThumbnailContainer } from './SlideoutCartProductThumbnailContainer';
import { determinePrice } from './utils';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../AppContainer';

const slideAnimation = keyframes`
    0%{
        margin-left: 100%;
        /* margin-right: 0; */
        width: 200%;
    }
    100%{
        margin-left: 0%;
        width: 100%;
        /* margin-right: 0.5rem; */
    }
}`;

// width: 300px;
// height: fit-content;
const SlideoutCartWrapper = styled.div`
    position: sticky;
    width: 300px;
    top: 10px;
    height: 100%;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    animation: ${slideAnimation} 1.5s ease;
    margin-right: 25px;
`

// justify-content: center;
const CartDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 90vh;
    border: 1px solid darkgreen;
    border-radius: 1rem;
    margin-top: 1rem;
    padding-bottom: 5px;
    overflow-y: scroll;
`;

const CheckoutButton = styled.button`
    width: 75%;
    height: 2rem;
    margin: 0.5rem 0rem 0.5rem 0rem;
`;

const SubtotalContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 0.5rem;
`;

const ShoppingCartLabel = styled.div`
    position: sticky;
    top: 0px;
    background: white;
    width: 100%;
    text-align: center;
    /* height: 100px; */
    padding: 20px 0;
    /* height: 50px; */
    border-bottom: 1px solid black;
`;

interface CartContainerProps {}

const SlideoutCartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    
    if (!cart) return null;
    
    const totalQuantity = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
    const unitPrice = determinePrice(totalQuantity);

    const cartItems = cart.map(({ quantity, productId }) => (
        <SlideoutCartProductThumbnailContainer quantity={quantity} productId={productId} key={productId} unitPrice={unitPrice} />
    ));

    const subtotal = (totalQuantity * unitPrice);

    const handleClick = (path: string)=>{
        history.push(`/${path}`);
    }

    return (
        <SlideoutCartWrapper>
            <CartDisplayContainer>
                <ShoppingCartLabel>Shopping Cart<i className="fas fa-shopping-cart"></i></ShoppingCartLabel>
                {cartItems}
                <SubtotalContainer>
                    <span>Subtotal: </span><span>${subtotal / 100}.00</span>
                </SubtotalContainer>
                <CheckoutButton onClick={()=>handleClick("checkout")}>Proceed to Checkout</CheckoutButton>
            </CartDisplayContainer>
        </SlideoutCartWrapper>
    );
}

export default withRouter(SlideoutCartContainer);
