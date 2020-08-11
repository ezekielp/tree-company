import React, { FC, useContext, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { colors } from '../styles';
import styled from 'styled-components';
import { CartContext, HomepageContext } from '../AppContainer';
import {countyList} from './utils';
import { device } from '../styles';

const MenuContainer = styled.div`
    width: 100%;
    background-color: ${colors.darkGreen};
    height: 100%;
    color: white;
    display: flex;
    padding: 1rem;
    justify-content: space-evenly;
    ${`@media ${device.mobileLarge}`} {
        
    }
`;

const CountySelectContainer = styled.div`

`
const CategorySelectContainer = styled.div`

`
const ShoppingCartContainer = styled.div`

`

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
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(event.target.value);
    }

    return (
        <MenuContainer>
            <CountySelectContainer>
                <span>County</span>
                <StyledSelect name="county" id="county" onChange={handleCountyChange}>
                    <option value="default">Filter by County</option>
                    {countyOptions}
                </StyledSelect>
            </CountySelectContainer>
            <CategorySelectContainer>
                <span>Category</span>
                <StyledSelect name="category" id="category" onChange={handleCategoryChange}>
                    <option value="default">Filter by Category</option>
                    <option value="wetlands_stream_buffer">Wetlands Stream Buffer</option>
                    <option value="forest_conservation">Forest Conservation/Tree Protection</option>
                </StyledSelect>
            </CategorySelectContainer>
            <ShoppingCartContainer>
                <span>Shopping Cart</span><i onClick={()=>handleClick("cart")} className="fas fa-shopping-cart"></i>
            </ShoppingCartContainer>
        </MenuContainer>
    );
}

export default withRouter(Menu);