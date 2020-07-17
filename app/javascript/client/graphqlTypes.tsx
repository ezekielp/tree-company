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

export type CartItem = {
  __typename?: 'CartItem';
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type County = {
  __typename?: 'County';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateCart: UpdateCartPayload;
};


export type MutationUpdateCartArgs = {
  input: UpdateCartInput;
};

export type Product = {
  __typename?: 'Product';
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
};


export type QueryProductArgs = {
  productId: Scalars['String'];
};

export type UpdateCartInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

/** Autogenerated return type of UpdateCart */
export type UpdateCartPayload = {
  __typename?: 'UpdateCartPayload';
  cart: CartItem;
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
    & { cart: (
      { __typename?: 'CartItem' }
      & Pick<CartItem, 'productId' | 'quantity'>
    ) }
  ) }
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
  )>> }
);

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