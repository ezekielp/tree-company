
import React, { FC, useContext } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import { Navbar } from '../navbar/Navbar';
import Menu from '../menu/Menu';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';
import { HomepageContext, CartContext } from '../AppContainer';
import { device } from '../styles';
import styled from 'styled-components';
import SlideoutCartContainer from '../cart/SlideoutCartContainer';
import { useWindowSize } from './utils';

const IntroductionContainer = styled.div`
    display: flex;
    margin: 0 50px 35px 50px;

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
    justify-content: center;
    min-width: 66%;
    max-width: 1100px;
    height: 100%;
    flex-wrap: wrap;
    /* grid-column-start: 2; */
`

/* justify-content: space-between; */
const ThumbnailIndexWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const Spacer = styled.div`
    min-width: 16%;
`

const CartSpacer = styled.div`
    min-width: 10rem;
`

interface HomePageProps {
    products: ProductInfoFragment[];
}

interface County {
    id: string,
    name: string
}

interface Category {
    id: string,
    name: string
}

export const HomePage: FC<HomePageProps> = ({ products }) => {

    const {countyFilter, categoryFilter} = useContext(HomepageContext);
    const {cart} = useContext(CartContext);
    const windowSize = useWindowSize();

    const belongsToCounty = (county: County) => {
        return county.name == countyFilter;
    };

    const belongsToCategory = (category: Category) => {
        return category.name == categoryFilter;
    };

    const PriorityProductThumbnails = Object.entries(products).map((product)=>{
        if ((product[1].counties?.some(belongsToCounty) && categoryFilter=="default") || (countyFilter=="default" && categoryFilter=="default" && product[1].counties?.length!=0) || (categoryFilter!="default" && product[1].categories?.some(belongsToCategory))){
            return (
                <ProductThumbnail key={product[0]} product={product[1]} />
            )
        }
    })

    const AllProductThumbnails = Object.entries(products).map((product)=>{
        if (product[1].counties?.length == 0 && categoryFilter=="default")
        return (
            <ProductThumbnail key={product[0]} product={product[1]} />
        )
    });

    return (
        <>
            <Navbar />
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
            <Menu />
            <ThumbnailIndexWrapper>
                {/* <Spacer /> */}
                <ThumbnailIndexContainer>
                    {PriorityProductThumbnails}
                    {AllProductThumbnails}
                </ThumbnailIndexContainer>
                {(cart.length!=0 && (windowSize.width>=800)) && (<SlideoutCartContainer />)}
                {/* {(cart.length!=0 && (windowSize.width>=800)) ? (<SlideoutCartContainer />) : <CartSpacer />} */}
                {/* {(cart.length!=0 && (windowSize.width>=800)) && <SlideoutCartContainer />} */}
            </ThumbnailIndexWrapper>
        </>
    )
}
