import React, { FC } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';

const Header = styled.h1`
    font-size: 36px;
`;

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {
    return (
        <Header>WELCOME TO THE TREE COMPANY!</Header>
    )
}
