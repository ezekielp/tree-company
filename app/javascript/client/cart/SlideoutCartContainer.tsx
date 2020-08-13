import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CartProductThumbnailContainer } from './CartProductThumbnailContainer';
import { determinePrice } from './utils';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';

const CartDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    height: 100%;
    border: 1px solid darkgreen;
    border-radius: 1rem;
    margin-top: 1rem;
    margin-right: 1rem;
`;

const CheckoutButton = styled.button`
    width: 100%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`

const SubtotalContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const ShoppingCartLabel = styled.div`
    margin-top: 1rem;
`

const SlideoutCartWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`

interface CartContainerProps {}

const SlideoutCartContainer: FC<CartContainerProps & RouteComponentProps> = ({ history }) => {

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
