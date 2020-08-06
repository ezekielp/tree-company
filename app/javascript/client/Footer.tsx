import React, { FC } from 'react';
import { colors } from './styles';
import styled from 'styled-components';

const FooterContainer = styled.div`
    margin-top: 50px;
    color: white;
    width: 100%;
    padding: 36px 0 36px 50px;
    background-color: ${colors.darkGreen};
`;

const ContactHeading = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
    font-variation-settings: 'wght' 600;
`;

const FlexContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
`;

const AddressContainer = styled.div`
`;

const AddressLine = styled.div`
    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const LogoContainer = styled.div``;

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
            <ContactHeading>Contact</ContactHeading>
            <FlexContainer>
                <AddressContainer>
                    <AddressLine>The Tree Company</AddressLine>
                    <AddressLine>20 N. Beaumont Ave.</AddressLine>
                    <AddressLine>Catonsville, MD 21228</AddressLine>
                </AddressContainer>
                <LogoContainer>{/* ADD LOGO HERE */}</LogoContainer>
            </FlexContainer>
            <EmailContainer>Email: <BoldSpan>sales@thetreecompany.com</BoldSpan></EmailContainer>
            <PhoneContainer>Phone: <BoldSpan>410-788-7277</BoldSpan></PhoneContainer>
            <PhoneContainer>Fax: <BoldSpan>410-788-9466</BoldSpan></PhoneContainer>
        </FooterContainer>
    );
};
