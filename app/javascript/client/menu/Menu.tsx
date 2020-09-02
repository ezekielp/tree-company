import React, { FC, useContext, ChangeEvent, useRef } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { colors } from '../styles';
import styled from 'styled-components';
import { CartContext, HomepageContext } from '../AppContainer';
import { CATEGORIES, COUNTIES } from './utils';
import { device } from '../styles';

const MenuContainer = styled.div`
    width: auto;
    background-color: ${colors.darkGreen};
    height: 100%;
    color: white;
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem;
    justify-content: space-evenly;
    align-items: center;

    ${`@media ${device.mobileSmaller}`} {
        flex-direction: column;
    }
`;

const SelectLabel = styled.span`
    margin-right: 15px;

    ${`@media ${device.mobileSmaller}`} {
        margin-right: 0;
    }
`;

const SelectContainer = styled.div`
    width: 15rem;
    margin: 0.5rem;
    display: flex;

    ${`@media ${device.mobileSmaller}`} {
        justify-content: space-between;
    }
`

const StyledSelect = styled.select`
    width: 100%;

    ${`@media ${device.mobileSmaller}`} {
        width: 60%;
    }
`;

interface MenuContainerProps extends RouteComponentProps {}

const Menu: FC<MenuContainerProps> = ({ history }) => {

    const {cart} = useContext(CartContext);
    const {countyFilter, categoryFilter, setCountyFilter, setCategoryFilter} = useContext(HomepageContext);
    const selectCountyRef: React.RefObject<HTMLSelectElement> = useRef(null);
    const selectCategoryRef: React.RefObject<HTMLSelectElement> = useRef(null);
    
    if (!cart) return null;

    const countyOptions = COUNTIES.map((countyName)=>{
        return (
        <option key={countyName} value={countyName}>{countyName}</option>
        )
    })

    const categoryOptions = CATEGORIES.map((categoryName)=>{
        const label = categoryName.split("_").map(name => name[0].toUpperCase() + name.slice(1)).join(" ");
        return (
        <option key={categoryName} value={categoryName}>{label}</option>
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
            <SelectContainer>
                <SelectLabel>County</SelectLabel>
                <StyledSelect name="county" id="county" onChange={handleCountyChange} ref={selectCountyRef} value={countyFilter}>
                    <option value="default">All counties</option>
                    {countyOptions}
                </StyledSelect>
            </SelectContainer>
            <SelectContainer>
                <SelectLabel>Category</SelectLabel>
                <StyledSelect name="category" id="category" onChange={handleCategoryChange} ref={selectCategoryRef} value={categoryFilter}>
                    <option value="default">All categories</option>
                    {categoryOptions}
                    {/* <option value="wetland_stream_buffer">Wetland Stream Buffer</option>
                    <option value="forest_conservation">Forest Conservation/Tree Protection</option> */}
                </StyledSelect>
            </SelectContainer>
        </MenuContainer>
    );
}

export default withRouter(Menu);