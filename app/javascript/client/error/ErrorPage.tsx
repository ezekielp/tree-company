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
                Oops! Something went wrong on our end. Sorry about that.
            </ErrorMessage>
            <ErrorMessage>
                Please use our printable order form instead. You can send it to Jim by mail or fax — his contact details are on the form.
            </ErrorMessage>
            <ErrorMessage>
                Thanks very much for your business!
            </ErrorMessage>
        </>
    );
};
