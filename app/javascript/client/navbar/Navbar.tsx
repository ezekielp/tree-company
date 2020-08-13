import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../styles';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    height: 50px;
    background-color: ${colors.darkGreen};
    display: flex;
    align-items: center;
    margin-bottom: 35px;
`;

const NavbarItem = styled.div`
    color: white;
    margin-right: 30px;

    &:first-child {
        margin-left: 50px;
    }

    &:last-child {
        margin-left: auto;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    display: flex;
`;

const ShoppingCartButton = styled(NavbarItem)`
    display: flex;
    cursor: pointer;
    span{
        margin-right: 5px;
    }
    i{
        width: 1.5rem;
        height: 1rem;
    }
`

export const Navbar: FC<{}> = () => {
    return (
        <NavbarContainer>
            <NavbarItem>
                <StyledLink to="/home">
                    Signs
                </StyledLink>
            </NavbarItem>
            <NavbarItem>
                <StyledLink to="/contact">
                    Contact
                </StyledLink>
            </NavbarItem>
            <ShoppingCartButton>
                <StyledLink to="/cart">
                    <span>Shopping Cart</span>
                    <i className="fas fa-shopping-cart"></i>
                </StyledLink>
            </ShoppingCartButton>
        </NavbarContainer>
    );
}
