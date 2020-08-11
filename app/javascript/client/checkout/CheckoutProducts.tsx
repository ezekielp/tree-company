import React, { FC } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import { ProductNameContainer } from '../cart/CartProductThumbnail';
import { device } from '../styles';
import styled from 'styled-components';

const CheckoutProductsContainer = styled.div`
    min-width: 350px;
    max-width: 500px;
`;

const CheckoutProductsColumnHeader = styled.li`
    font-variation-settings: 'wght' 600;
    margin-bottom: 15px;
`;

interface CheckoutProductsTableCellProps {
    gridColumn: string;
    gridRow: string;
    center?: boolean;
    bold?: boolean;
}

const CheckoutProductsTableCell = styled.div`
    text-align: ${({ center }: CheckoutProductsTableCellProps) => (center ? 'center' : 'left')};
    grid-column: ${({ gridColumn }: CheckoutProductsTableCellProps) => gridColumn};
    grid-row: ${({ gridRow }: CheckoutProductsTableCellProps) => gridRow};
    font-variation-settings: ${({ bold }: CheckoutProductsTableCellProps) => (bold ? '"wght" 600' : '"wght" 400')};
`;

const ProductDescriptionCell = styled.li`
    text-align: center;
    grid-column: 1;
`;

const ProductQuantityCell = styled.li`
    grid-column: 2;
`;

const ProductSubtotalCell = styled.li`
    grid-column: 3;
`;

const CheckoutProductsHeader = styled.div`
    font-size: 24px;
    margin-bottom: 16px;
`;

// display: flex;
// justify-content: space-evenly;
const FlexContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;

    ${`@media ${device.mobileSmaller}`} {
        font-size: 12px;
    }
`;

const CheckoutProductsColumn = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
`;

export interface CheckoutItem {
    product: ProductInfoFragment;
    quantity: number;
}

interface CheckoutProductsProps {
    unitPrice: number;
    checkoutItems: CheckoutItem[];
}

export const CheckoutProducts: FC<CheckoutProductsProps> = ({ unitPrice, checkoutItems }) => {

    const checkoutProductDescriptions = checkoutItems.map((item, idx) => {
        const { product } = item;
        const { id, name, size, material, counties } = product;
        const countyList = counties?.map(county => county.name).join(", ");

        return (
            <CheckoutProductsTableCell gridColumn='1' gridRow={(idx + 2).toString()} center key={id}>
                <ProductNameContainer>{name}</ProductNameContainer>
                <div>
                    {size}, {material}
                </div>
                {counties && counties.length > 0 && <div>Counties: {countyList}</div>}
            </CheckoutProductsTableCell>
        )
    });
    const checkoutProductQuantities = checkoutItems.map((item, idx) => {
        const { product, quantity } = item;
        const { id } = product;

        return (
            <CheckoutProductsTableCell gridColumn='2' gridRow={(idx + 2).toString()} key={id}>
                {quantity}
            </CheckoutProductsTableCell>
        )
    });
    const checkoutProductPrices = checkoutItems.map((item, idx) => {
        const { product, quantity } = item;
        const { id } = product;
        const totalPrice = unitPrice * quantity;

        return (
            <CheckoutProductsTableCell gridColumn='3' gridRow={(idx + 2).toString()} key={id}>
                {totalPrice}
            </CheckoutProductsTableCell >
        )
    });

    return (
        <CheckoutProductsContainer>
            <CheckoutProductsHeader>
                Order details
            </CheckoutProductsHeader>
            <FlexContainer>
                {/* <CheckoutProductsColumn> */}
                    <CheckoutProductsTableCell gridColumn='1' gridRow='1' bold>
                        Sign type
                    </CheckoutProductsTableCell>
                    {checkoutProductDescriptions}
                {/* </CheckoutProductsColumn> */}
                {/* <CheckoutProductsColumn> */}
                    <CheckoutProductsTableCell gridColumn='2' gridRow='1' bold>
                        Quantity
                    </CheckoutProductsTableCell>
                    {checkoutProductQuantities}
                {/* </CheckoutProductsColumn> */}
                {/* <CheckoutProductsColumn> */}
                    <CheckoutProductsTableCell gridColumn='3' gridRow='1' bold>
                        Subtotal
                    </CheckoutProductsTableCell>
                    {checkoutProductPrices}
                {/* </CheckoutProductsColumn> */}
            </FlexContainer>
        </CheckoutProductsContainer>
    );
}
