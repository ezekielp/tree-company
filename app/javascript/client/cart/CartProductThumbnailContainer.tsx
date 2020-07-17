import React, { FC } from 'react';
import gql from 'graphql-tag';

gql`
    mutation UpdateCart($input: UpdateCartInput!) {
        updateCart(input: $input) {
            cart {
                product_id
                quantity
            }
        }
    }
`;




