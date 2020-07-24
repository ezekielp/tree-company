import React, { FC, useState, createContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';

interface ModalContextState {
    openModal: () => void;
    closeModal: () => void;
    setProductId: (id: number) => void;
    modalIsShowing: boolean;
    productId: number;
}

export const ModalContext = createContext<ModalContextState>({
    openModal: () => null,
    closeModal: () => null,
    setProductId: ()=>null,
    modalIsShowing: false,
    productId: 0
});

const Header = styled.h1`
    font-size: 36px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const ThumbnailIndexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100vh;
    flex-wrap: wrap;
    padding: 20px;
`

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {

    const [modalIsShowing, setModalIsShowing] = useState(false);
    const [productId, setProductId] = useState(0);
    
    const ProductThumbnails = Object.entries(products).map((product)=>(
        <ProductThumbnail key={product[0]} product={product[1]} />
    ))

    return (
        <ModalContext.Provider value={{
            openModal: ()=>setModalIsShowing(true),
            closeModal: ()=>setModalIsShowing(false),
            setProductId: (newProductId)=>setProductId(newProductId),
            modalIsShowing: modalIsShowing,
            productId: productId
        }}>
            <Modal products={products}/>
            <Header>WELCOME TO THE TREE COMPANY!</Header>
            <ThumbnailIndexContainer>
                {ProductThumbnails}
            </ThumbnailIndexContainer>
        </ModalContext.Provider>
    )
}
