import React, { FC, useContext, ChangeEvent } from 'react';
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

const StyledSelect = styled.select`
    width: 5rem;
    height: 100%;
    margin: 0.5rem;
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

    const handleCountyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCountyFilter(event.target.value);
        console.log(event.target.value);
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(event.target.value);
        console.log(event.target.value);
    }

    return (
        <MenuContainer>
            <span>County</span>
            <StyledSelect name="county" id="county" onChange={handleCountyChange}>
                <option value="default">Filter by County</option>
                {countyOptions}
            </StyledSelect>
            <span>Material</span>
            <StyledSelect name="category" id="category" onChange={handleCategoryChange}>
                <option value="default">Filter by Category</option>
                <option value="wetlands_stream_buffer">Wetlands Stream Buffer</option>
                <option value="forest_conservation">Forest Conservation/Tree Protection</option>
            </StyledSelect>
            <span><span>Shopping Cart</span><i onClick={()=>handleClick("cart")} className="fas fa-shopping-cart"></i></span>
        </MenuContainer>
    );
}

export default withRouter(Menu);