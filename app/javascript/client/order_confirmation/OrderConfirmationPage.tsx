import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
    shippingCustomer: ShippingCustomerInfoFragment | null;
    checkoutItems: CheckoutItem[];
    unitPrice: number;
    subtotal: number;
    shippingCost: number;
    taxCost: number;
    totalCost: number;
}

export const OrderConfirmationPage: FC<RouteComponentProps<{}, any, OrderConfirmationPageProps>> = ({ history, location }) => {
    if (!location.state) {
        history.push('/home');
        return null;
    };

    const { billingCustomer, shippingCustomer, checkoutItems, unitPrice, subtotal, shippingCost, taxCost, totalCost } = location.state;
    if (!billingCustomer) return null;

    const { name: billingName, address: billingAddress, city: billingCity, state: billingState, email, zipCode: billingZipCode, phoneNumber: billingPhoneNumber } = billingCustomer;

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
            {shippingCustomer && (
                <AddressContainer>
                    <AddressHeader>
                        Shipping address
                    </AddressHeader>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Company name
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.companyName}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Address
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.address}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            City
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.city}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            State
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.state}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Zip code
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.zipCode}
                        </InfoField>
                    </InfoFieldContainer>
                    {shippingCustomer.phoneNumber && (
                        <InfoFieldContainer>
                            <InfoFieldLabel>
                                Phone number
                            </InfoFieldLabel>
                            <InfoField>
                                {shippingCustomer.phoneNumber}
                            </InfoField>
                        </InfoFieldContainer>
                    )}
                    {shippingCustomer.attn && (
                        <InfoFieldContainer>
                            <InfoFieldLabel>
                                Attn
                            </InfoFieldLabel>
                            <InfoField>
                                {shippingCustomer.attn}
                            </InfoField>
                        </InfoFieldContainer>
                    )}
                </AddressContainer>
            )}
            <CheckoutProducts checkoutItems={checkoutItems} unitPrice={unitPrice} shippingCost={shippingCost} taxCost={taxCost} totalCost={totalCost} />
            {/* Price totals to go here */}
        </OrderConfirmationContainer>
    )
};
