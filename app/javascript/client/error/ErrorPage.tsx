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
                Please contact Jim directly by email at sales@thetreecompany.com or by phone at 410-788-7277 to place your order. Or, click here to download a printable order form that you can fax or mail in to place your order (you can find the relevant contact details on the form).
            </ErrorMessage>
            <ErrorMessage>
                Thanks very much for your business!
            </ErrorMessage>
        </>
    );
};
