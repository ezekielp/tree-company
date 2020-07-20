import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal'

const Header = styled.h1`
    font-size: 36px;
`;

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {
    return (
        <>
            <Modal />
            <Header>WELCOME TO THE TREE COMPANY!</Header>
        </>
    )
}
