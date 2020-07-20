import React from 'react';
import styled from 'styled-components';

const ProductModal = styled.div`
    display: flex;
    flex-direction: vertical;
`;

const Product = () => {
    return (
        <ProductModal>
            <p>Product Modal Goes here</p>
            <button>Close</button>
        </ProductModal>
    )
}

export default Product;