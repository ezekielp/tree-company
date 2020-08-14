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

const fadeInAnimation = keyframes`
    0%{
        opactiy: 0;
    }
    100%{
        opactiy: 1;
    }
}`;

const CartDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 100%;
    border: 1px solid darkgreen;
    border-radius: 1rem;
    margin-top: 1rem;
    /* margin-right: 0.5rem; */
`;

const CheckoutButton = styled.button`
    width: 100%;
    height: 2rem;
    cursor: pointer;
    border: 1px solid black;
    font-weight: bold;
    margin-top: 1rem;
    border-radius: 1rem;
`;

const SubtotalContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const ShoppingCartLabel = styled.div`
    margin-top: 1rem;
`;

const SlideoutCartWrapper = styled.div`
    width: 300px;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    /* grid-column-start: 3; */
    animation: ${slideAnimation} 1.5s ease;
    /* animation: ${slideAnimation} 5s ease; */
`

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
