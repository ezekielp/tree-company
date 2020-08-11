import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { ProductInfoFragment } from '../graphqlTypes';
import Menu from '../menu/Menu';
import ProductThumbnail from '../product/thumbnail/ProductThumbnail';
import { HomepageContext } from '../AppContainer';
import { device } from '../styles';

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

interface County {
    id: string,
    name: string
}

export const HomePage: FC<HomePageProps> = ({ products }) => {

    const {countyFilter, categoryFilter} = useContext(HomepageContext);

    const belongsToCounty = (county: County) => {
        return county.name == countyFilter;
    };
    
    const ProductThumbnails = Object.entries(products).map((product)=>{
        if (product[1].counties?.some(belongsToCounty) || countyFilter=="default")
        return (
            <ProductThumbnail key={product[0]} product={product[1]} />
        )
    })
        
    

    return (
        <>
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
            <ThumbnailIndexContainer>
                {ProductThumbnails}
            </ThumbnailIndexContainer>
        </>
    )
}
