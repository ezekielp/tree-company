import React, { FC, useContext } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { colors } from '../styles';
import styled from 'styled-components';
import { CartContext, HomepageContext } from '../AppContainer';
import {countyList} from './utils';

const MenuContainer = styled.div`
    width: 100%;
    background-color: #004e00;
    height: 100%;
    color: white;
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;
    span{
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
    }
    select{

    }
    
`;

interface MenuContainerProps extends RouteComponentProps {}

const Menu: FC<MenuContainerProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    const {setCountyFilter, setCategoryFilter} = useContext(HomepageContext);
    
    if (!cart) return null;

    const handleClick = (path: string)=>{
        history.push(`/${path}`);
    }

    const countyOptions = countyList.map((countyName)=>{
        return (
        <option key={countyName} value={countyName}>{countyName}</option>
        )
    })

    return (
        <MenuContainer>
            <span>County</span>
            <select name="county" id="county">
                <option value="default">Filter by County</option>
                {countyOptions}
            </select>
            <span>Material</span>
            <select name="category" id="category">
                <option value="default">Filter by Category</option>
                <option value="wetlands_stream_buffer">Wetlands Stream Buffer</option>
                <option value="forest_conservation">Forest Conservation/Tree Protection</option>
            </select>
            <span><span>Shopping Cart</span><i onClick={()=>handleClick("cart")} className="fas fa-shopping-cart"></i></span>
        </MenuContainer>
    );
}

export default withRouter(Menu);