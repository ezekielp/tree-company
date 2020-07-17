import React, { FC } from 'react';
import { ProductInfoFragment, useUpdateCartMutation } from '../graphqlTypes';
import styled from 'styled-components';

const FlexContainer = styled.section`
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    max-height: 400px;
`;

const ImageContainer = styled.figure`
    min-width: 100px;
    max-width: 250px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const ImageStandIn = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 20px;
`;

const CartProductDetails = styled.div`
    max-width: 400px;
`;

interface CartProductThumbnailProps {
    product: ProductInfoFragment;
    quantity: number;
}

export const CartProductThumbnail: FC<CartProductThumbnailProps> = ({ product, quantity }) => {
    const { name, size, material, counties, imageUrl } = product;

    return (
        <FlexContainer>
            <ImageContainer>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                    />
                ) : (
                    <ImageStandIn>
                        The Tree Company sign
                    </ImageStandIn>
                )}
            </ImageContainer>
        </FlexContainer>
    )
}
