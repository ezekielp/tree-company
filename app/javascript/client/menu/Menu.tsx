import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { colors } from '../styles';
import styled from 'styled-components';
import { CartContext } from '../AppContainer';

const MenuContainer = styled.div`
    width: 100%;
    background-color: #004e00;
    height: 2rem;
    color: white;
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;
    span, i{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    i{
        cursor: pointer;
        border: 1px solid green;
        border-radius: 0.5rem;
        width: 2rem;
        height: 2rem;
        ::before{
            display: flex;
            justify-content: center;
        }
    }
`;

interface MenuContainerProps extends RouteComponentProps {}

const Menu: FC<MenuContainerProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    
    if (!cart) return null;

    const handleClick = (path: string)=>{
        history.push(`/${path}`);
    }

    return (
        <MenuContainer>
            <span>County</span><input type="select"></input>
            <span>Material</span><input type="select"></input>
            <span>Shopping Cart</span>
            <i onClick={()=>handleClick("cart")} className="fas fa-shopping-cart"></i>
        </MenuContainer>
    );
}

export default withRouter(Menu);