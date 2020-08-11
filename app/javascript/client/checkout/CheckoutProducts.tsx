import React, { FC } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import { ProductNameContainer } from '../cart/CartProductThumbnail';
import { displayPrice } from '../checkout/utils';
import { device } from '../styles';
import styled from 'styled-components';

const CheckoutProductsContainer = styled.div`
    margin-top: 50px;
`;

interface CheckoutProductsTableCellProps {
    gridColumn: string;
    gridRow: string;
    bold?: boolean;
}

const CheckoutProductsTableCell = styled.div`
    text-align: center;
    grid-column: ${({ gridColumn }: CheckoutProductsTableCellProps) => gridColumn};
    grid-row: ${({ gridRow }: CheckoutProductsTableCellProps) => gridRow};
    font-variation-settings: ${({ bold }: CheckoutProductsTableCellProps) => (bold ? '"wght" 600' : '"wght" 400')};
`;

const CheckoutProductsHeader = styled.div`
    font-size: 24px;
    margin-bottom: 30px;
`;

interface GridContainerProps {
    numRows: string;
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: ${({ numRows }: GridContainerProps) => (`repeat(${numRows}, 1fr)`)};

    ${`@media ${device.mobileSmaller}`} {
        font-size: 12px;
    }
`;

export interface CheckoutItem {
    product: ProductInfoFragment;
    quantity: number;
}

interface CheckoutProductsProps {
    unitPrice: number;
    checkoutItems: CheckoutItem[];
    shippingCost: number;
    taxCost: number;
    totalCost: number;
}

export const CheckoutProducts: FC<CheckoutProductsProps> = ({ unitPrice, checkoutItems, shippingCost, taxCost, totalCost }) => {

    const numRows = checkoutItems.length + 5;
    const priceTotalsStartingRow = checkoutItems.length + 3;

    const checkoutProductDescriptions = checkoutItems.map((item, idx) => {
        const { product } = item;
        const { id, name, size, material, counties } = product;
        const countyList = counties?.map(county => county.name).join(", ");

        return (
            <CheckoutProductsTableCell gridColumn='1' gridRow={(idx + 2).toString()} key={id}>
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
                ${displayPrice(totalPrice)}
            </CheckoutProductsTableCell >
        )
    });

    return (
        <CheckoutProductsContainer>
            <CheckoutProductsHeader>
                Order details
            </CheckoutProductsHeader>
            <GridContainer numRows={numRows.toString()}>
                <CheckoutProductsTableCell gridColumn='1' gridRow='1' bold>
                    Sign type
                </CheckoutProductsTableCell>
                {checkoutProductDescriptions}
                <CheckoutProductsTableCell gridColumn='2' gridRow='1' bold>
                    Quantity
                </CheckoutProductsTableCell>
                {checkoutProductQuantities}
                <CheckoutProductsTableCell gridColumn='3' gridRow='1' bold>
                    Subtotal
                </CheckoutProductsTableCell>
                {checkoutProductPrices}
                <CheckoutProductsTableCell gridColumn='2' gridRow={(priceTotalsStartingRow).toString()} bold>
                    Tax
                </CheckoutProductsTableCell>
                <CheckoutProductsTableCell gridColumn='3' gridRow={(priceTotalsStartingRow).toString()}>
                    ${displayPrice(taxCost)}
                </CheckoutProductsTableCell>
                <CheckoutProductsTableCell gridColumn='2' gridRow={(priceTotalsStartingRow + 1).toString()} bold>
                    Shipping
                </CheckoutProductsTableCell>
                <CheckoutProductsTableCell gridColumn='3' gridRow={(priceTotalsStartingRow + 1).toString()}>
                    ${displayPrice(shippingCost)}
                </CheckoutProductsTableCell>
                <CheckoutProductsTableCell gridColumn='2' gridRow={(priceTotalsStartingRow + 2).toString()} bold>
                    Total
                </CheckoutProductsTableCell>
                <CheckoutProductsTableCell gridColumn='3' gridRow={(priceTotalsStartingRow + 2).toString()}>
                    ${displayPrice(totalCost)}
                </CheckoutProductsTableCell>
            </GridContainer>
        </CheckoutProductsContainer>
    );
}
