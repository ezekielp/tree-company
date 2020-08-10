import React, { FC, useState, createContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Modal from '../modal/Modal';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';
import { device } from '../styles';

interface ModalContextState {
    openModal: (modalName: string) => void;
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

const IntroductionContainer = styled.div`
    display: flex;
    margin: 0 50px;

    ${`@media ${device.mobileLarge}`} {
        flex-direction: column;
    }
`;

const IntroductionTextContainer = styled.div`
    margin-right: 50px;
    width: 70%;
    line-height: 130%;

    ${`@media ${device.mobileLarge}`} {
        margin: 0 auto 20px auto;
        width: 100%;
    }
`;

const WelcomeTextContainer = styled.span`
    font-variation-settings: 'wght' 700;
`;

const IntroductionTextParagraph = styled.p`
    margin-bottom: 10px;
`;

const PricingChartContainer = styled.div`
    display: flex;

    ${`@media ${device.mobileLarge}`} {
        margin: 0 auto 20px auto;
    }
`;

const PricingChartColumn = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: center;
    margin-right: 15px;
`;

const PricingChartCell = styled.li`
    margin-bottom: 5px;
`;

const PricingChartHeaderCell = styled(PricingChartCell)`
    font-variation-settings: 'wght' 600;
    min-width: 102px;
    text-align: center;
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
            <IntroductionContainer>
                <IntroductionTextContainer>
                    <IntroductionTextParagraph>
                        <WelcomeTextContainer>Welcome to The Tree Company!</WelcomeTextContainer>
                    </IntroductionTextParagraph>
                    <IntroductionTextParagraph>
                        All our signs have the same unit price, which is determined by the total number in your order (see chart for details).
                    </IntroductionTextParagraph>
                    <IntroductionTextParagraph>
                        For instance, if your order included 25 Forest Retention Area signs and 50 Specimen Tree signs, for a total of 75 signs, the unit price would be $4.00 per sign.
                    </IntroductionTextParagraph>
                    <IntroductionTextParagraph>
                        Shipping is a flat $10 per order (except in the case of local pickup).
                    </IntroductionTextParagraph>
                </IntroductionTextContainer>
                <PricingChartContainer>
                    <PricingChartColumn>
                        <PricingChartHeaderCell>Quantity</PricingChartHeaderCell>
                        <PricingChartCell>1-9</PricingChartCell>
                        <PricingChartCell>10-49</PricingChartCell>
                        <PricingChartCell>50-99</PricingChartCell>
                        <PricingChartCell>100+</PricingChartCell>
                    </PricingChartColumn>
                    <PricingChartColumn>
                        <PricingChartHeaderCell>Price per sign</PricingChartHeaderCell>
                        <PricingChartCell>$7.00</PricingChartCell>
                        <PricingChartCell>$5.00</PricingChartCell>
                        <PricingChartCell>$4.00</PricingChartCell>
                        <PricingChartCell>$3.00</PricingChartCell>
                    </PricingChartColumn>
                </PricingChartContainer>
            </IntroductionContainer>
            <ThumbnailIndexContainer>
                {ProductThumbnails}
            </ThumbnailIndexContainer>
        </ModalContext.Provider>
    )
}
