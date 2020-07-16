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

export type County = {
  __typename?: 'County';
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Product>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String'];
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
  products?: Maybe<Array<Product>>;
};

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