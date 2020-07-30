import React, { FC } from 'react';
import { BillingCustomerInfoFragment, ShippingCustomerInfoFragment } from '../graphqlTypes';
import { CheckoutProducts, CheckoutItem } from '../checkout/CheckoutProducts';
import styled from 'styled-components';

const OrderConfirmationContainer = styled.div``;

const AddressContainer = styled.div``;

const AddressHeader = styled.div``;

const InfoFieldContainer = styled.div`
    display: flex;
`;

const InfoFieldLabel = styled.div``;

const InfoField = styled.div``;

interface OrderConfirmationPageProps {
    billingCustomer: BillingCustomerInfoFragment;
    shippingCustomer: ShippingCustomerInfoFragment;
    checkoutItems: CheckoutItem[];
    unitPrice: number;
    subtotal: number;
    shippingCost: number;
    taxCost: number;
    totalCost: number;
}

export const OrderConfirmationPage: FC<OrderConfirmationPageProps> = ({ billingCustomer, shippingCustomer, checkoutItems, unitPrice, subtotal, shippingCost, taxCost, totalCost }) => {
    if (!billingCustomer) {
        return null;
    };

    const { name: billingName, address: billingAddress, city: billingCity, state: billingState, email, zipCode: billingZipCode, phoneNumber: billingPhoneNumber } = billingCustomer;
    const { companyName: shippingName, address: shippingAddress, city: shippingCity, state: shippingState, zipCode: shippingZipCode, phoneNumber: shippingPhoneNumber, attn } = shippingCustomer;

    return (
        <OrderConfirmationContainer>
            <AddressContainer>
                <AddressHeader>
                    Billing address
                </AddressHeader>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Name
                    </InfoFieldLabel>
                    <InfoField>
                        {billingName}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Address
                    </InfoFieldLabel>
                    <InfoField>
                        {billingAddress}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        City
                    </InfoFieldLabel>
                    <InfoField>
                        {billingCity}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        State
                    </InfoFieldLabel>
                    <InfoField>
                        {billingState}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Zip code
                    </InfoFieldLabel>
                    <InfoField>
                        {billingZipCode}
                    </InfoField>
                </InfoFieldContainer>
                {billingPhoneNumber && (
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Phone number
                        </InfoFieldLabel>
                        <InfoField>
                            {billingPhoneNumber}
                        </InfoField>
                    </InfoFieldContainer>
                )}
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Email
                    </InfoFieldLabel>
                    <InfoField>
                        {email}
                    </InfoField>
                </InfoFieldContainer>
            </AddressContainer>
            <AddressContainer>
                <AddressHeader>
                    Shipping address
                </AddressHeader>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Company name
                    </InfoFieldLabel>
                    <InfoField>
                        {shippingName}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Address
                    </InfoFieldLabel>
                    <InfoField>
                        {shippingAddress}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        City
                    </InfoFieldLabel>
                    <InfoField>
                        {shippingCity}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        State
                    </InfoFieldLabel>
                    <InfoField>
                        {shippingState}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Zip code
                    </InfoFieldLabel>
                    <InfoField>
                        {shippingZipCode}
                    </InfoField>
                </InfoFieldContainer>
                {shippingPhoneNumber && (
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Phone number
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingPhoneNumber}
                        </InfoField>
                    </InfoFieldContainer>
                )}
                {attn && (
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Attn
                        </InfoFieldLabel>
                        <InfoField>
                            {attn}
                        </InfoField>
                    </InfoFieldContainer>
                )}
            </AddressContainer>
            <CheckoutProducts checkoutItems={checkoutItems} unitPrice={unitPrice} />
            {/* Price totals to go here */}
        </OrderConfirmationContainer>
    )
};
