import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface HomeContainerProps {}

export const HomeContainer: FC<HomeContainerProps & RouteComponentProps> = () => {
    return (
        <div>WELCOME TO THE TREE COMPANY!</div>
    )
}