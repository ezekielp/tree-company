import React, { FC } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    width: 250px;
    height: auto;
    margin: 0 auto 24px auto;
`;

interface ErrorPageProps {}

export const ErrorPage: FC<ErrorPageProps> = () => {

    return (
        <>
            <ErrorMessage>
                Oops! Something went wrong on our end. Our apologies.
            </ErrorMessage>
            <ErrorMessage>
                Please contact Jim directly by phone at 410-788-7277 or by email at sales@thetreecompany.com to place your order.
            </ErrorMessage>
            <ErrorMessage>
                Thanks very much for your business!
            </ErrorMessage>
        </>
    );
};
