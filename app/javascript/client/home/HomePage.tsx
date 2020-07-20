import React, { FC, useState, createContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal';

export const ModalContext = createContext(null);

const Header = styled.h1`
    font-size: 36px;
`;

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {


    return (
        <ModalContext.Provider value={modalActions}>
            <Modal />
            <Header>WELCOME TO THE TREE COMPANY!</Header>
            {/* <button>Modal Test</button> */}
        </ModalContext.Provider>
    )
}
