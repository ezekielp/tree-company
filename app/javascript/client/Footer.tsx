import React, { FC } from 'react';
import { colors } from './styles';
import treeCoLogo from './assets/treecologo.png';
import { device } from './styles';
import styled from 'styled-components';

const FooterContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    background-color: ${colors.darkGreen};
`;

const FooterContentContainer = styled.div`
    color: white;
    padding: 36px 0 36px 50px;

    ${`@media ${device.mobileLarge}`} {
        text-align: center;
        padding: 36px 0;
    }
`;

const ContactHeading = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
    font-variation-settings: 'wght' 600;
`;

const FlexContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    align-items: center;

    ${`@media ${device.mobileLarge}`} {
        flex-direction: column;
    }
`;

const AddressContainer = styled.div`
    min-width: 175px;
`;

const AddressLine = styled.div`
    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const LogoContainer = styled.img`
    margin: 0 auto 0 25%;

    ${`@media ${device.mobileLarge}`} {
        margin: 20px 0 0 0;
    }
`;

const EmailContainer = styled.div`
    margin-bottom: 15px;
`;

const PhoneContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

const BoldSpan = styled.span`
    font-variation-settings: 'wght' 700;
`;

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
    return (
        <FooterContainer>
            <FooterContentContainer>
                <ContactHeading>Contact</ContactHeading>
                <FlexContainer>
                    <AddressContainer>
                        <AddressLine>The Tree Company</AddressLine>
                        <AddressLine>20 N. Beaumont Ave.</AddressLine>
                        <AddressLine>Catonsville, MD 21228</AddressLine>
                    </AddressContainer>
                    <LogoContainer src={treeCoLogo}></LogoContainer>
                </FlexContainer>
                <EmailContainer>Email: <BoldSpan>sales@thetreecompany.com</BoldSpan></EmailContainer>
                <PhoneContainer>Phone: <BoldSpan>410-788-7277</BoldSpan></PhoneContainer>
                <PhoneContainer>Fax: <BoldSpan>410-788-9466</BoldSpan></PhoneContainer>
            </FooterContentContainer>
        </FooterContainer>
    );
};
