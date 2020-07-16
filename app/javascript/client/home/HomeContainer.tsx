import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';

gql`
    query GetProductsForHomeContainer {
        products {
            id
            name
            size
            material
            description
            style_number
            counties
            image_url
        }
    }
`

interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps & RouteComponentProps> = () => {
    return (
        <div>WELCOME TO THE TREE COMPANY!</div>
    )
}