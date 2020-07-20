import React from 'react';
import styled from 'styled-components';

const ProductModal = styled.div`
    display: flex;
    flex-direction: column;
    grid-column: 2/3;
    grid-row: 2/3;
    justify-content: center;
    align-items: center;
`;

const CloseModalButton = styled.button`
    width: 100px;
    height: 50px;
    cursor: pointer;
`

const Product = () => {
    return (
        <ProductModal>
            <p>Product Modal Goes here</p>
            <CloseModalButton>Close</CloseModalButton>
        </ProductModal>
    )
}

export default Product;