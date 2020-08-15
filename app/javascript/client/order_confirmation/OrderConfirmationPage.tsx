import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BillingCustomerInfoFragment, ShippingCustomerInfoFragment } from '../graphqlTypes';
import { CheckoutProducts, CheckoutItem } from '../checkout/CheckoutProducts';
import { Navbar } from '../navbar/Navbar';
import styled from 'styled-components';

const OrderConfirmationContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const OrderConfirmationHeader = styled.h1`
    font-size: 36px;
    margin-bottom: 24px;
`;

const Text = styled.div`
    line-height: 130%;
    margin-bottom: 10px;
`;

const ThankYouText = styled(Text)``;

const ShippingText = styled(Text)``;

const ConfirmationNumberContainer = styled.div`
    display: flex;
    margin-top: 25px;
    margin-bottom: 30px;
`;

const AddressContainer = styled.div`
    margin-bottom: 30px;
`;

const AddressHeader = styled.div`
    font-size: 24px;
    margin-bottom: 15px;
`;

const InfoFieldContainer = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

const InfoFieldLabel = styled.div`
    margin-right: 10px;
    font-variation-settings: 'wght' 600;
`;

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
    orderId: number | null;
}

export const OrderConfirmationPage: FC<RouteComponentProps<{}, any, OrderConfirmationPageProps>> = ({ history, location }) => {
    if (!location.state) {
        history.push('/home');
        return null;
    };

    const { billingCustomer, shippingCustomer, checkoutItems, unitPrice, shippingCost, taxCost, totalCost, orderId } = location.state;
    if (!billingCustomer) return null;

    const { name: billingName, address: billingAddress, city: billingCity, state: billingState, email, zipCode: billingZipCode, phoneNumber: billingPhoneNumber } = billingCustomer;

    return (
        <>
        <Navbar />
        <OrderConfirmationContainer>
            <OrderConfirmationHeader>
                Order confirmation
            </OrderConfirmationHeader>
            <ThankYouText>
                Thank you for your order! You'll also receive an email with your order information.
            </ThankYouText>
            <ShippingText>
                If your order is being shipped to you, shipping information will be sent separately to the email address indicated in your order.
            </ShippingText>
            <ConfirmationNumberContainer>
                <InfoFieldLabel>
                    Confirmation number:
                </InfoFieldLabel>
                <InfoField>
                    {orderId ? orderId : "We'll contact you shortly with a confirmation number"}
                </InfoField>
            </ConfirmationNumberContainer>
            <CheckoutProducts checkoutItems={checkoutItems} unitPrice={unitPrice} shippingCost={shippingCost} taxCost={taxCost} totalCost={totalCost} />
            <AddressContainer>
                <AddressHeader>
                    Billing address
                </AddressHeader>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Name:
                    </InfoFieldLabel>
                    <InfoField>
                        {billingName}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Address:
                    </InfoFieldLabel>
                    <InfoField>
                        {billingAddress}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        City:
                    </InfoFieldLabel>
                    <InfoField>
                        {billingCity}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        State:
                    </InfoFieldLabel>
                    <InfoField>
                        {billingState}
                    </InfoField>
                </InfoFieldContainer>
                <InfoFieldContainer>
                    <InfoFieldLabel>
                        Zip code:
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
                        Email:
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
                            Company name:
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.companyName}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Address:
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.address}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            City:
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.city}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            State:
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.state}
                        </InfoField>
                    </InfoFieldContainer>
                    <InfoFieldContainer>
                        <InfoFieldLabel>
                            Zip code:
                        </InfoFieldLabel>
                        <InfoField>
                            {shippingCustomer.zipCode}
                        </InfoField>
                    </InfoFieldContainer>
                    {shippingCustomer.phoneNumber && (
                        <InfoFieldContainer>
                            <InfoFieldLabel>
                                Phone number:
                            </InfoFieldLabel>
                            <InfoField>
                                {shippingCustomer.phoneNumber}
                            </InfoField>
                        </InfoFieldContainer>
                    )}
                    {shippingCustomer.attn && (
                        <InfoFieldContainer>
                            <InfoFieldLabel>
                                Attn:
                            </InfoFieldLabel>
                            <InfoField>
                                {shippingCustomer.attn}
                            </InfoField>
                        </InfoFieldContainer>
                    )}
                </AddressContainer>
            )}
        </OrderConfirmationContainer>
        </>
    )
};
