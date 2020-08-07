import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import treePhotoCompressed from './assets/tree_photo_compressed.jpg';
import { device, colors } from './styles';
import styled from 'styled-components';

interface HeaderProps {}

const HeaderContainer = styled.div`
    background-color: ${colors.darkGreen};
    width: 100%;
    margin-bottom: 20px;
`;

const HeaderContentContainer = styled.div``;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${`@media ${device.mobileLarge}`} {
        flex-direction: column-reverse;
    }
`;

const HeaderTextContainer = styled.div`
    color: white;
    padding-left: 50px;

    ${`@media ${device.mobileLarge}`} {
        margin: 50px 0;
        padding: 0;
        text-align: center;
    }
`;

const HeaderHeading = styled.h1`
    font-size: 45px;
    margin-bottom: 10px;
    font-variation-settings: 'wght' 600;
`;

const HeaderSubheading = styled.div`
    font-size: 18px;
`;

const TreePhoto = styled.img`
    width: 40%;
    border-left: 5px solid white;

    ${`@media ${device.mobileLarge}`} {
        width: 100%;
        border: none;
    }
`;

export const Header: FC<HeaderProps> = () => {

    return (
        <HeaderContainer>
            <HeaderContentContainer>
                <FlexContainer>
                    <HeaderTextContainer>
                        <StyledLink to="/home">
                            <HeaderHeading>
                                The Tree Company
                            </HeaderHeading>
                        </StyledLink>
                        <HeaderSubheading>
                            Conservation and Environmental Resource Signage
                        </HeaderSubheading>
                    </HeaderTextContainer>
                    <TreePhoto src={treePhotoCompressed}></TreePhoto>
                </FlexContainer>
            </HeaderContentContainer>
        </HeaderContainer>
    );
}

