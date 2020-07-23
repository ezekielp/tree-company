import React, { FC, useState, createContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';

interface ModalContextState {
    openModal: () => void;
    closeModal: () => void;
    modalIsShowing: boolean;
}

export const ModalContext = createContext<ModalContextState>({
    openModal: () => null,
    closeModal: () => null,
    modalIsShowing: false
});

const Header = styled.h1`
    font-size: 36px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ThumbnailIndexWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {

    const [modalIsShowing, setModalIsShowing] = useState(false);

    return (
        <ModalContext.Provider value={{
            openModal: ()=>setModalIsShowing(true),
            closeModal: ()=>setModalIsShowing(false),
            modalIsShowing: modalIsShowing
        }}>
            <Modal />
            <Header>WELCOME TO THE TREE COMPANY!</Header>
            <ThumbnailIndexWrapper>
                <ProductThumbnail />
                <ProductThumbnail />
                <ProductThumbnail />
            </ThumbnailIndexWrapper>
        </ModalContext.Provider>
    )
}
