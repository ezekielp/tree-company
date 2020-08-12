import React, { FC, useContext, ChangeEvent, useRef, useEffect } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { colors } from '../styles';
import styled from 'styled-components';
import { CartContext, HomepageContext } from '../AppContainer';
import {countyList} from './utils';
import { device } from '../styles';

const MenuContainer = styled.div`
    width: auto;
    background-color: ${colors.darkGreen};
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    justify-content: space-evenly;
    ${`@media ${device.mobileLarge}`} {
        
    }
`;

const CountySelectContainer = styled.div`
    width: 100%;
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
`
const CategorySelectContainer = styled.div`
    width: 100%;
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
`
const ShoppingCartContainer = styled.div`
    width: 100%;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
`

const ShoppingCartButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    color: white;
    border: 1px solid white;
    border-radius: 1rem;
    font-family: 'Mulish';
    span{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    i{
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledSelect = styled.select`
    width: 50%;
    height: 100%;
    margin-right: 4rem;
    font-family: 'Mulish';
`;

interface MenuContainerProps extends RouteComponentProps {}

const Menu: FC<MenuContainerProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    const {countyFilter, categoryFilter, setCountyFilter, setCategoryFilter} = useContext(HomepageContext);
    const selectCountyRef: React.RefObject<HTMLSelectElement> = useRef(null);
    const selectCategoryRef: React.RefObject<HTMLSelectElement> = useRef(null);
    
    if (!cart) return null;

    const handleClick = (path: string)=>(
        history.push(`/${path}`)
    );

    const countyOptions = countyList.map((countyName)=>{
        return (
        <option key={countyName} value={countyName}>{countyName}</option>
        )
    })

    const handleCountyChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCountyFilter(event.target.value);
        setCategoryFilter("default");
        if (!selectCategoryRef.current) return null;
        selectCategoryRef.current.value="default";
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCountyFilter("default");
        setCategoryFilter(event.target.value);
        if (!selectCountyRef.current) return null;
        selectCountyRef.current.value="default";
    }

    return (
        <MenuContainer>
            <CountySelectContainer>
                <span>County</span>
                <StyledSelect name="county" id="county" onChange={handleCountyChange} ref={selectCountyRef} value={countyFilter}>
                    <option value="default">Filter by County</option>
                    {countyOptions}
                </StyledSelect>
            </CountySelectContainer>
            <CategorySelectContainer>
                <span>Category</span>
                <StyledSelect name="category" id="category" onChange={handleCategoryChange} ref={selectCategoryRef} value={categoryFilter}>
                    <option value="default">Filter by Category</option>
                    <option value="wetland_stream_buffer">Wetland Stream Buffer</option>
                    <option value="forest_conservation">Forest Conservation/Tree Protection</option>
                </StyledSelect>
            </CategorySelectContainer>
            <ShoppingCartContainer onClick={()=>handleClick("cart")}>
                <ShoppingCartButton>
                    <span>Shopping Cart</span><i className="fas fa-shopping-cart"></i>
                </ShoppingCartButton>
            </ShoppingCartContainer>
        </MenuContainer>
    );
}

export default withRouter(Menu);