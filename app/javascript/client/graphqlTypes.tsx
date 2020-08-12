import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Autogenerated return type of AddToCart */
export type AddToCartPayload = {
  __typename?: 'AddToCartPayload';
  cart: Array<CartItem>;
};

export type BillingCustomer = {
  __typename?: 'BillingCustomer';
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  phoneNumber?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  taxExempt: Scalars['Boolean'];
  taxId?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type CartItemInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

/** Autogenerated return type of ClearCart */
export type ClearCartPayload = {
  __typename?: 'ClearCartPayload';
  cart?: Maybe<Array<CartItem>>;
};

export type County = {
  __typename?: 'County';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type CreateBillingCustomerInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  taxExempt?: Maybe<Scalars['Boolean']>;
  taxId?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

/** Autogenerated return type of CreateBillingCustomer */
export type CreateBillingCustomerPayload = {
  __typename?: 'CreateBillingCustomerPayload';
  billingCustomer: BillingCustomer;
};

export type CreateOrderInput = {
  billingCustomerId: Scalars['Int'];
  cart: Array<CartItemInput>;
  shippingCost?: Maybe<Scalars['Int']>;
  shippingCustomerId?: Maybe<Scalars['Int']>;
  taxCost: Scalars['Int'];
  unitPrice: Scalars['Int'];
};

/** Autogenerated return type of CreateOrder */
export type CreateOrderPayload = {
  __typename?: 'CreateOrderPayload';
  order: Order;
};

export type CreatePaymentIntentInput = {
  amount: Scalars['Int'];
};

/** Autogenerated return type of CreatePaymentIntent */
export type CreatePaymentIntentPayload = {
  __typename?: 'CreatePaymentIntentPayload';
  stripePaymentIntent: StripePaymentIntent;
};

export type CreateShippingCustomerInput = {
  address: Scalars['String'];
  attn?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  companyName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

/** Autogenerated return type of CreateShippingCustomer */
export type CreateShippingCustomerPayload = {
  __typename?: 'CreateShippingCustomerPayload';
  shippingCustomer: ShippingCustomer;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: AddToCartPayload;
  clearCart: ClearCartPayload;
  createBillingCustomer: CreateBillingCustomerPayload;
  createOrder: CreateOrderPayload;
  createPaymentIntent: CreatePaymentIntentPayload;
  createShippingCustomer: CreateShippingCustomerPayload;
  sendErrorMailer: SendErrorMailerPayload;
  updateCart: UpdateCartPayload;
};


export type MutationAddToCartArgs = {
  input: UpdateCartInput;
};


export type MutationCreateBillingCustomerArgs = {
  input: CreateBillingCustomerInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentIntentArgs = {
  input: CreatePaymentIntentInput;
};


export type MutationCreateShippingCustomerArgs = {
  input: CreateShippingCustomerInput;
};


export type MutationSendErrorMailerArgs = {
  input: SendErrorMailerInput;
};


export type MutationUpdateCartArgs = {
  input: UpdateCartInput;
};

export type Order = {
  __typename?: 'Order';
  billingCustomerId: Scalars['Int'];
  id: Scalars['ID'];
  orderQuantities: Array<OrderQuantity>;
  products: Array<Product>;
  shippingCost: Scalars['Int'];
  shippingCustomerId?: Maybe<Scalars['Int']>;
  taxCost: Scalars['Int'];
  unitPrice: Scalars['Int'];
};

export type OrderQuantity = {
  __typename?: 'OrderQuantity';
  id: Scalars['ID'];
  orderId: Scalars['Int'];
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  categories?: Maybe<Array<Category>>;
  counties?: Maybe<Array<County>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  material: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['String'];
  styleNumber?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Array<CartItem>>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  productsById?: Maybe<Array<Product>>;
};


export type QueryProductArgs = {
  productId: Scalars['String'];
};


export type QueryProductsByIdArgs = {
  productIds: Array<Scalars['String']>;
};

export type SendErrorMailerInput = {
  errors: Array<Scalars['String']>;
};

/** Autogenerated return type of SendErrorMailer */
export type SendErrorMailerPayload = {
  __typename?: 'SendErrorMailerPayload';
  errors?: Maybe<Array<Scalars['String']>>;
};

export type ShippingCustomer = {
  __typename?: 'ShippingCustomer';
  address: Scalars['String'];
  attn?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  companyName: Scalars['String'];
  id: Scalars['ID'];
  orders?: Maybe<Array<Order>>;
  phoneNumber?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

export type StripePaymentIntent = {
  __typename?: 'StripePaymentIntent';
  amount?: Maybe<Scalars['Int']>;
  clientSecret?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  receiptEmail?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type UpdateCartInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

/** Autogenerated return type of UpdateCart */
export type UpdateCartPayload = {
  __typename?: 'UpdateCartPayload';
  cart: Array<CartItem>;
};

export type GetCartForCartContainerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartForCartContainerQuery = (
  { __typename?: 'Query' }
  & { cart?: Maybe<Array<(
    { __typename?: 'CartItem' }
    & Pick<CartItem, 'productId' | 'quantity'>
  )>> }
);

export type GetProductForCartProductThumbnailContainerQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductForCartProductThumbnailContainerQuery = (
  { __typename?: 'Query' }
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & ProductInfoFragment
  )> }
);

export type UpdateCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type UpdateCartMutation = (
  { __typename?: 'Mutation' }
  & { updateCart: (
    { __typename?: 'UpdateCartPayload' }
    & { cart: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'productId' | 'quantity'>
    )> }
  ) }
);

export type GetProductsForCheckoutQueryVariables = Exact<{
  productIds: Array<Scalars['String']>;
}>;


export type GetProductsForCheckoutQuery = (
  { __typename?: 'Query' }
  & { productsById?: Maybe<Array<(
    { __typename?: 'Product' }
    & ProductInfoFragment
  )>> }
);

export type CreateStripePaymentIntentMutationVariables = Exact<{
  input: CreatePaymentIntentInput;
}>;


export type CreateStripePaymentIntentMutation = (
  { __typename?: 'Mutation' }
  & { createPaymentIntent: (
    { __typename?: 'CreatePaymentIntentPayload' }
    & { stripePaymentIntent: (
      { __typename?: 'StripePaymentIntent' }
      & Pick<StripePaymentIntent, 'id' | 'amount' | 'clientSecret' | 'description' | 'receiptEmail' | 'status'>
    ) }
  ) }
);

export type CreateBillingCustomerMutationVariables = Exact<{
  input: CreateBillingCustomerInput;
}>;


export type CreateBillingCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createBillingCustomer: (
    { __typename?: 'CreateBillingCustomerPayload' }
    & { billingCustomer: (
      { __typename?: 'BillingCustomer' }
      & BillingCustomerInfoFragment
    ) }
  ) }
);

export type BillingCustomerInfoFragment = (
  { __typename?: 'BillingCustomer' }
  & Pick<BillingCustomer, 'id' | 'name' | 'address' | 'city' | 'state' | 'email' | 'zipCode' | 'phoneNumber' | 'taxExempt' | 'taxId'>
);

export type CreateShippingCustomerMutationVariables = Exact<{
  input: CreateShippingCustomerInput;
}>;


export type CreateShippingCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createShippingCustomer: (
    { __typename?: 'CreateShippingCustomerPayload' }
    & { shippingCustomer: (
      { __typename?: 'ShippingCustomer' }
      & ShippingCustomerInfoFragment
    ) }
  ) }
);

export type ShippingCustomerInfoFragment = (
  { __typename?: 'ShippingCustomer' }
  & Pick<ShippingCustomer, 'id' | 'companyName' | 'address' | 'city' | 'state' | 'zipCode' | 'phoneNumber' | 'attn'>
);

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'CreateOrderPayload' }
    & { order: (
      { __typename?: 'Order' }
      & OrderInfoFragment
    ) }
  ) }
);

export type OrderInfoFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'shippingCost' | 'taxCost' | 'unitPrice'>
  & { orderQuantities: Array<(
    { __typename?: 'OrderQuantity' }
    & Pick<OrderQuantity, 'id' | 'productId' | 'orderId' | 'quantity'>
  )>, products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'size' | 'material' | 'description' | 'styleNumber'>
    & { counties?: Maybe<Array<(
      { __typename?: 'County' }
      & Pick<County, 'id' | 'name'>
    )>> }
  )> }
);

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = (
  { __typename?: 'Mutation' }
  & { clearCart: (
    { __typename?: 'ClearCartPayload' }
    & { cart?: Maybe<Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'productId' | 'quantity'>
    )>> }
  ) }
);

export type SendErrorMailerMutationVariables = Exact<{
  input: SendErrorMailerInput;
}>;


export type SendErrorMailerMutation = (
  { __typename?: 'Mutation' }
  & { sendErrorMailer: (
    { __typename?: 'SendErrorMailerPayload' }
    & Pick<SendErrorMailerPayload, 'errors'>
  ) }
);

export type GetCartForCheckoutContainerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartForCheckoutContainerQuery = (
  { __typename?: 'Query' }
  & { cart?: Maybe<Array<(
    { __typename?: 'CartItem' }
    & Pick<CartItem, 'productId' | 'quantity'>
  )>> }
);

export type GetProductsForHomeContainerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsForHomeContainerQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<Array<(
    { __typename?: 'Product' }
    & ProductInfoFragment
  )>> }
);

export type ProductInfoFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'name' | 'size' | 'material' | 'description' | 'styleNumber' | 'imageUrl'>
  & { counties?: Maybe<Array<(
    { __typename?: 'County' }
    & Pick<County, 'id' | 'name'>
  )>>, categories?: Maybe<Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )>> }
);

export type AddToCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & { addToCart: (
    { __typename?: 'AddToCartPayload' }
    & { cart: Array<(
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'productId' | 'quantity'>
    )> }
  ) }
);

export const BillingCustomerInfoFragmentDoc = gql`
    fragment BillingCustomerInfo on BillingCustomer {
  id
  name
  address
  city
  state
  email
  zipCode
  phoneNumber
  taxExempt
  taxId
}
    `;
export const ShippingCustomerInfoFragmentDoc = gql`
    fragment ShippingCustomerInfo on ShippingCustomer {
  id
  companyName
  address
  city
  state
  zipCode
  phoneNumber
  attn
}
    `;
export const OrderInfoFragmentDoc = gql`
    fragment OrderInfo on Order {
  id
  shippingCost
  taxCost
  unitPrice
  orderQuantities {
    id
    productId
    orderId
    quantity
  }
  products {
    id
    name
    size
    material
    description
    styleNumber
    counties {
      id
      name
    }
  }
}
    `;
export const ProductInfoFragmentDoc = gql`
    fragment ProductInfo on Product {
  id
  name
  size
  material
  description
  styleNumber
  counties {
    id
    name
  }
  categories {
    id
    name
  }
  imageUrl
}
    `;
export const GetCartForCartContainerDocument = gql`
    query GetCartForCartContainer {
  cart {
    productId
    quantity
  }
}
    `;

/**
 * __useGetCartForCartContainerQuery__
 *
 * To run a query within a React component, call `useGetCartForCartContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartForCartContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartForCartContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartForCartContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCartForCartContainerQuery, GetCartForCartContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCartForCartContainerQuery, GetCartForCartContainerQueryVariables>(GetCartForCartContainerDocument, baseOptions);
      }
export function useGetCartForCartContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCartForCartContainerQuery, GetCartForCartContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCartForCartContainerQuery, GetCartForCartContainerQueryVariables>(GetCartForCartContainerDocument, baseOptions);
        }
export type GetCartForCartContainerQueryHookResult = ReturnType<typeof useGetCartForCartContainerQuery>;
export type GetCartForCartContainerLazyQueryHookResult = ReturnType<typeof useGetCartForCartContainerLazyQuery>;
export type GetCartForCartContainerQueryResult = ApolloReactCommon.QueryResult<GetCartForCartContainerQuery, GetCartForCartContainerQueryVariables>;
export const GetProductForCartProductThumbnailContainerDocument = gql`
    query GetProductForCartProductThumbnailContainer($productId: String!) {
  product(productId: $productId) {
    ...ProductInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useGetProductForCartProductThumbnailContainerQuery__
 *
 * To run a query within a React component, call `useGetProductForCartProductThumbnailContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductForCartProductThumbnailContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductForCartProductThumbnailContainerQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductForCartProductThumbnailContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductForCartProductThumbnailContainerQuery, GetProductForCartProductThumbnailContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductForCartProductThumbnailContainerQuery, GetProductForCartProductThumbnailContainerQueryVariables>(GetProductForCartProductThumbnailContainerDocument, baseOptions);
      }
export function useGetProductForCartProductThumbnailContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductForCartProductThumbnailContainerQuery, GetProductForCartProductThumbnailContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductForCartProductThumbnailContainerQuery, GetProductForCartProductThumbnailContainerQueryVariables>(GetProductForCartProductThumbnailContainerDocument, baseOptions);
        }
export type GetProductForCartProductThumbnailContainerQueryHookResult = ReturnType<typeof useGetProductForCartProductThumbnailContainerQuery>;
export type GetProductForCartProductThumbnailContainerLazyQueryHookResult = ReturnType<typeof useGetProductForCartProductThumbnailContainerLazyQuery>;
export type GetProductForCartProductThumbnailContainerQueryResult = ApolloReactCommon.QueryResult<GetProductForCartProductThumbnailContainerQuery, GetProductForCartProductThumbnailContainerQueryVariables>;
export const UpdateCartDocument = gql`
    mutation UpdateCart($input: UpdateCartInput!) {
  updateCart(input: $input) {
    cart {
      productId
      quantity
    }
  }
}
    `;
export type UpdateCartMutationFn = ApolloReactCommon.MutationFunction<UpdateCartMutation, UpdateCartMutationVariables>;

/**
 * __useUpdateCartMutation__
 *
 * To run a mutation, you first call `useUpdateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMutation, { data, loading, error }] = useUpdateCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCartMutation, UpdateCartMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument, baseOptions);
      }
export type UpdateCartMutationHookResult = ReturnType<typeof useUpdateCartMutation>;
export type UpdateCartMutationResult = ApolloReactCommon.MutationResult<UpdateCartMutation>;
export type UpdateCartMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCartMutation, UpdateCartMutationVariables>;
export const GetProductsForCheckoutDocument = gql`
    query GetProductsForCheckout($productIds: [String!]!) {
  productsById(productIds: $productIds) {
    ...ProductInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useGetProductsForCheckoutQuery__
 *
 * To run a query within a React component, call `useGetProductsForCheckoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsForCheckoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsForCheckoutQuery({
 *   variables: {
 *      productIds: // value for 'productIds'
 *   },
 * });
 */
export function useGetProductsForCheckoutQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductsForCheckoutQuery, GetProductsForCheckoutQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductsForCheckoutQuery, GetProductsForCheckoutQueryVariables>(GetProductsForCheckoutDocument, baseOptions);
      }
export function useGetProductsForCheckoutLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductsForCheckoutQuery, GetProductsForCheckoutQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductsForCheckoutQuery, GetProductsForCheckoutQueryVariables>(GetProductsForCheckoutDocument, baseOptions);
        }
export type GetProductsForCheckoutQueryHookResult = ReturnType<typeof useGetProductsForCheckoutQuery>;
export type GetProductsForCheckoutLazyQueryHookResult = ReturnType<typeof useGetProductsForCheckoutLazyQuery>;
export type GetProductsForCheckoutQueryResult = ApolloReactCommon.QueryResult<GetProductsForCheckoutQuery, GetProductsForCheckoutQueryVariables>;
export const CreateStripePaymentIntentDocument = gql`
    mutation CreateStripePaymentIntent($input: CreatePaymentIntentInput!) {
  createPaymentIntent(input: $input) {
    stripePaymentIntent {
      id
      amount
      clientSecret
      description
      receiptEmail
      status
    }
  }
}
    `;
export type CreateStripePaymentIntentMutationFn = ApolloReactCommon.MutationFunction<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>;

/**
 * __useCreateStripePaymentIntentMutation__
 *
 * To run a mutation, you first call `useCreateStripePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripePaymentIntentMutation, { data, loading, error }] = useCreateStripePaymentIntentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStripePaymentIntentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>(CreateStripePaymentIntentDocument, baseOptions);
      }
export type CreateStripePaymentIntentMutationHookResult = ReturnType<typeof useCreateStripePaymentIntentMutation>;
export type CreateStripePaymentIntentMutationResult = ApolloReactCommon.MutationResult<CreateStripePaymentIntentMutation>;
export type CreateStripePaymentIntentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>;
export const CreateBillingCustomerDocument = gql`
    mutation CreateBillingCustomer($input: CreateBillingCustomerInput!) {
  createBillingCustomer(input: $input) {
    billingCustomer {
      ...BillingCustomerInfo
    }
  }
}
    ${BillingCustomerInfoFragmentDoc}`;
export type CreateBillingCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateBillingCustomerMutation, CreateBillingCustomerMutationVariables>;

/**
 * __useCreateBillingCustomerMutation__
 *
 * To run a mutation, you first call `useCreateBillingCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBillingCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBillingCustomerMutation, { data, loading, error }] = useCreateBillingCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBillingCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBillingCustomerMutation, CreateBillingCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateBillingCustomerMutation, CreateBillingCustomerMutationVariables>(CreateBillingCustomerDocument, baseOptions);
      }
export type CreateBillingCustomerMutationHookResult = ReturnType<typeof useCreateBillingCustomerMutation>;
export type CreateBillingCustomerMutationResult = ApolloReactCommon.MutationResult<CreateBillingCustomerMutation>;
export type CreateBillingCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateBillingCustomerMutation, CreateBillingCustomerMutationVariables>;
export const CreateShippingCustomerDocument = gql`
    mutation CreateShippingCustomer($input: CreateShippingCustomerInput!) {
  createShippingCustomer(input: $input) {
    shippingCustomer {
      ...ShippingCustomerInfo
    }
  }
}
    ${ShippingCustomerInfoFragmentDoc}`;
export type CreateShippingCustomerMutationFn = ApolloReactCommon.MutationFunction<CreateShippingCustomerMutation, CreateShippingCustomerMutationVariables>;

/**
 * __useCreateShippingCustomerMutation__
 *
 * To run a mutation, you first call `useCreateShippingCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShippingCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShippingCustomerMutation, { data, loading, error }] = useCreateShippingCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateShippingCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateShippingCustomerMutation, CreateShippingCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateShippingCustomerMutation, CreateShippingCustomerMutationVariables>(CreateShippingCustomerDocument, baseOptions);
      }
export type CreateShippingCustomerMutationHookResult = ReturnType<typeof useCreateShippingCustomerMutation>;
export type CreateShippingCustomerMutationResult = ApolloReactCommon.MutationResult<CreateShippingCustomerMutation>;
export type CreateShippingCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateShippingCustomerMutation, CreateShippingCustomerMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    order {
      ...OrderInfo
    }
  }
}
    ${OrderInfoFragmentDoc}`;
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const ClearCartDocument = gql`
    mutation ClearCart {
  clearCart {
    cart {
      productId
      quantity
    }
  }
}
    `;
export type ClearCartMutationFn = ApolloReactCommon.MutationFunction<ClearCartMutation, ClearCartMutationVariables>;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>) {
        return ApolloReactHooks.useMutation<ClearCartMutation, ClearCartMutationVariables>(ClearCartDocument, baseOptions);
      }
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export type ClearCartMutationResult = ApolloReactCommon.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = ApolloReactCommon.BaseMutationOptions<ClearCartMutation, ClearCartMutationVariables>;
export const SendErrorMailerDocument = gql`
    mutation SendErrorMailer($input: SendErrorMailerInput!) {
  sendErrorMailer(input: $input) {
    errors
  }
}
    `;
export type SendErrorMailerMutationFn = ApolloReactCommon.MutationFunction<SendErrorMailerMutation, SendErrorMailerMutationVariables>;

/**
 * __useSendErrorMailerMutation__
 *
 * To run a mutation, you first call `useSendErrorMailerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendErrorMailerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendErrorMailerMutation, { data, loading, error }] = useSendErrorMailerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendErrorMailerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendErrorMailerMutation, SendErrorMailerMutationVariables>) {
        return ApolloReactHooks.useMutation<SendErrorMailerMutation, SendErrorMailerMutationVariables>(SendErrorMailerDocument, baseOptions);
      }
export type SendErrorMailerMutationHookResult = ReturnType<typeof useSendErrorMailerMutation>;
export type SendErrorMailerMutationResult = ApolloReactCommon.MutationResult<SendErrorMailerMutation>;
export type SendErrorMailerMutationOptions = ApolloReactCommon.BaseMutationOptions<SendErrorMailerMutation, SendErrorMailerMutationVariables>;
export const GetCartForCheckoutContainerDocument = gql`
    query GetCartForCheckoutContainer {
  cart {
    productId
    quantity
  }
}
    `;

/**
 * __useGetCartForCheckoutContainerQuery__
 *
 * To run a query within a React component, call `useGetCartForCheckoutContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCartForCheckoutContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCartForCheckoutContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCartForCheckoutContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCartForCheckoutContainerQuery, GetCartForCheckoutContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCartForCheckoutContainerQuery, GetCartForCheckoutContainerQueryVariables>(GetCartForCheckoutContainerDocument, baseOptions);
      }
export function useGetCartForCheckoutContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCartForCheckoutContainerQuery, GetCartForCheckoutContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCartForCheckoutContainerQuery, GetCartForCheckoutContainerQueryVariables>(GetCartForCheckoutContainerDocument, baseOptions);
        }
export type GetCartForCheckoutContainerQueryHookResult = ReturnType<typeof useGetCartForCheckoutContainerQuery>;
export type GetCartForCheckoutContainerLazyQueryHookResult = ReturnType<typeof useGetCartForCheckoutContainerLazyQuery>;
export type GetCartForCheckoutContainerQueryResult = ApolloReactCommon.QueryResult<GetCartForCheckoutContainerQuery, GetCartForCheckoutContainerQueryVariables>;
export const GetProductsForHomeContainerDocument = gql`
    query GetProductsForHomeContainer {
  products {
    ...ProductInfo
  }
}
    ${ProductInfoFragmentDoc}`;

/**
 * __useGetProductsForHomeContainerQuery__
 *
 * To run a query within a React component, call `useGetProductsForHomeContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsForHomeContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsForHomeContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsForHomeContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductsForHomeContainerQuery, GetProductsForHomeContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductsForHomeContainerQuery, GetProductsForHomeContainerQueryVariables>(GetProductsForHomeContainerDocument, baseOptions);
      }
export function useGetProductsForHomeContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductsForHomeContainerQuery, GetProductsForHomeContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductsForHomeContainerQuery, GetProductsForHomeContainerQueryVariables>(GetProductsForHomeContainerDocument, baseOptions);
        }
export type GetProductsForHomeContainerQueryHookResult = ReturnType<typeof useGetProductsForHomeContainerQuery>;
export type GetProductsForHomeContainerLazyQueryHookResult = ReturnType<typeof useGetProductsForHomeContainerLazyQuery>;
export type GetProductsForHomeContainerQueryResult = ApolloReactCommon.QueryResult<GetProductsForHomeContainerQuery, GetProductsForHomeContainerQueryVariables>;
export const AddToCartDocument = gql`
    mutation AddToCart($input: UpdateCartInput!) {
  addToCart(input: $input) {
    cart {
      productId
      quantity
    }
  }
}
    `;
export type AddToCartMutationFn = ApolloReactCommon.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        return ApolloReactHooks.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, baseOptions);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = ApolloReactCommon.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = ApolloReactCommon.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;