import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.h1`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,0.75);
`;

const modal = () => {
    return (
        <Backdrop>
            This is the backdrop
        </Backdrop>
    )
}

export default modal;

