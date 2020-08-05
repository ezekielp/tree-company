import React, { FC, useState, createContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';

interface ModalContextState {
    openModal: (modalName: string, productId?: string, quantity?: number) => void;
    closeModal: () => void;
    setSelectedProduct: (product: ProductInfoFragment) => void;
    setFlashMessage: (flashMessage: string) => void;
    flashMessage: string;
    modalIsShowing: boolean;
    selectedProduct: ProductInfoFragment;
    displayedModal: string;
}

export const ModalContext = createContext<ModalContextState>({
    openModal: (modalName) => null,
    closeModal: () => null,
    setSelectedProduct: (product)=>null,
    setFlashMessage: (flashMessage) => null,
    flashMessage: "",
    modalIsShowing: false,
    selectedProduct: { name: "", id: "", size: "", material: "", description: "", styleNumber: "", imageUrl: ""},
    displayedModal: ""
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
    height: 100%;
    flex-wrap: wrap;
`

interface HomePageProps {
    products: ProductInfoFragment[];
}

export const HomePage: FC<HomePageProps> = ({ products }) => {

    const [modalIsShowing, setModalIsShowing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", id: "", size: "", material: ""} );
    const [displayedModal, setDisplayedModal] = useState("");
    const [flashMessage, setFlashMessage] = useState("");
    
    const ProductThumbnails = Object.entries(products).map((product)=>(
        <ProductThumbnail key={product[0]} product={product[1]} />
    ))

    return (
        <ModalContext.Provider value={{
            openModal: (modalName)=>{setDisplayedModal(modalName);setModalIsShowing(true);},
            closeModal: ()=>setModalIsShowing(false),
            setSelectedProduct: (selectedProduct: ProductInfoFragment)=>setSelectedProduct(selectedProduct),
            setFlashMessage: (message)=>setFlashMessage(message),
            flashMessage: flashMessage,
            modalIsShowing: modalIsShowing,
            selectedProduct: selectedProduct,
            displayedModal: displayedModal
        }}>
            <Modal />
            <Header>WELCOME TO THE TREE COMPANY!</Header>
            <ThumbnailIndexContainer>
                {ProductThumbnails}
            </ThumbnailIndexContainer>
        </ModalContext.Provider>
    )
}
