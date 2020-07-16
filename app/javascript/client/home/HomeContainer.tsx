import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useGetProductsForHomeContainerQuery, ProductInfoFragmentDoc } from '../graphqlTypes';
import gql from 'graphql-tag';
import { HomePage } from './HomePage';

gql`
    query GetProductsForHomeContainer {
        products {
            ...ProductInfo
        }
    }

    ${ProductInfoFragmentDoc}
`;

gql`
    fragment ProductInfo on Product {
        id
        name
        size
        material
        description
        styleNumber
        counties {
            id
            name
        }
        imageUrl
    }
`;

interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps & RouteComponentProps> = () => {
    const { data } = useGetProductsForHomeContainerQuery();
    const products = data?.products;
    
    if (!products) return null;

    return (
        <HomePage products={products}></HomePage>
    )
}
