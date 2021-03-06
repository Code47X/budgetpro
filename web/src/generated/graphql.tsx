import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Budget = {
  __typename?: 'Budget';
  id: Scalars['ID'];
  month: Scalars['Int'];
  year: Scalars['Int'];
  budgetGroups: Array<BudgetGroup>;
  transactions: Array<Transaction>;
};

export type BudgetDateInput = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export type BudgetGroup = {
  __typename?: 'BudgetGroup';
  id: Scalars['ID'];
  label: Scalars['String'];
  budgetItems: Array<BudgetItem>;
  type: Scalars['String'];
};

export type BudgetGroupInput = {
  id: Scalars['Float'];
  label: Scalars['String'];
};

export type BudgetItem = {
  __typename?: 'BudgetItem';
  id: Scalars['ID'];
  name: Scalars['String'];
  plannedAmount: Scalars['Float'];
  position: Scalars['Int'];
};

export type BudgetItemInput = {
  id: Scalars['Float'];
};

export type CreateBudgetPayload = {
  __typename?: 'CreateBudgetPayload';
  budget?: Maybe<Budget>;
  error?: Maybe<ErrorMessage>;
};

export type CreateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user?: Maybe<User>;
  error?: Maybe<ErrorMessage>;
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  user?: Maybe<User>;
  error?: Maybe<ErrorMessage>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginPayload;
  logout: Scalars['Boolean'];
  createBudget: CreateBudgetPayload;
  updateBudget?: Maybe<Budget>;
  reorderBudgetItems?: Maybe<BudgetGroup>;
  createUser: CreateUserPayload;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationCreateBudgetArgs = {
  input: BudgetDateInput;
};


export type MutationUpdateBudgetArgs = {
  id: Scalars['Float'];
  budgetGroups: Array<BudgetGroupInput>;
};


export type MutationReorderBudgetItemsArgs = {
  input: ReorderBudgetItemsInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  budget?: Maybe<Budget>;
  me?: Maybe<User>;
};


export type QueryBudgetArgs = {
  input: BudgetDateInput;
};

export type ReorderBudgetItemsInput = {
  id: Scalars['Float'];
  budgetItems: Array<BudgetItemInput>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  amount: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type CreateBudgetMutationVariables = Exact<{
  input: BudgetDateInput;
}>;


export type CreateBudgetMutation = (
  { __typename?: 'Mutation' }
  & { createBudget: (
    { __typename?: 'CreateBudgetPayload' }
    & { budget?: Maybe<(
      { __typename?: 'Budget' }
      & Pick<Budget, 'id' | 'month' | 'year'>
      & { budgetGroups: Array<(
        { __typename?: 'BudgetGroup' }
        & Pick<BudgetGroup, 'id' | 'type' | 'label'>
        & { budgetItems: Array<(
          { __typename?: 'BudgetItem' }
          & Pick<BudgetItem, 'id' | 'name'>
        )> }
      )> }
    )> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'CreateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, error?: Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    )>, error?: Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ReorderBudgetItemsMutationVariables = Exact<{
  input: ReorderBudgetItemsInput;
}>;


export type ReorderBudgetItemsMutation = (
  { __typename?: 'Mutation' }
  & { reorderBudgetItems?: Maybe<(
    { __typename?: 'BudgetGroup' }
    & Pick<BudgetGroup, 'id' | 'type' | 'label'>
    & { budgetItems: Array<(
      { __typename?: 'BudgetItem' }
      & Pick<BudgetItem, 'id' | 'name' | 'position' | 'plannedAmount'>
    )> }
  )> }
);

export type BudgetQueryVariables = Exact<{
  input: BudgetDateInput;
}>;


export type BudgetQuery = (
  { __typename?: 'Query' }
  & { budget?: Maybe<(
    { __typename?: 'Budget' }
    & Pick<Budget, 'id' | 'month' | 'year'>
    & { budgetGroups: Array<(
      { __typename?: 'BudgetGroup' }
      & Pick<BudgetGroup, 'id' | 'type' | 'label'>
      & { budgetItems: Array<(
        { __typename?: 'BudgetItem' }
        & Pick<BudgetItem, 'id' | 'name' | 'position' | 'plannedAmount'>
      )> }
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  )> }
);


export const CreateBudgetDocument = gql`
    mutation CreateBudget($input: BudgetDateInput!) {
  createBudget(input: $input) {
    budget {
      id
      month
      year
      budgetGroups {
        id
        type
        label
        budgetItems {
          id
          name
        }
      }
    }
  }
}
    `;
export type CreateBudgetMutationFn = Apollo.MutationFunction<CreateBudgetMutation, CreateBudgetMutationVariables>;

/**
 * __useCreateBudgetMutation__
 *
 * To run a mutation, you first call `useCreateBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBudgetMutation, { data, loading, error }] = useCreateBudgetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBudgetMutation(baseOptions?: Apollo.MutationHookOptions<CreateBudgetMutation, CreateBudgetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBudgetMutation, CreateBudgetMutationVariables>(CreateBudgetDocument, options);
      }
export type CreateBudgetMutationHookResult = ReturnType<typeof useCreateBudgetMutation>;
export type CreateBudgetMutationResult = Apollo.MutationResult<CreateBudgetMutation>;
export type CreateBudgetMutationOptions = Apollo.BaseMutationOptions<CreateBudgetMutation, CreateBudgetMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      firstName
      lastName
      email
    }
    error {
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      firstName
      lastName
      email
    }
    error {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReorderBudgetItemsDocument = gql`
    mutation ReorderBudgetItems($input: ReorderBudgetItemsInput!) {
  reorderBudgetItems(input: $input) {
    id
    type
    label
    budgetItems {
      id
      name
      position
      plannedAmount
    }
  }
}
    `;
export type ReorderBudgetItemsMutationFn = Apollo.MutationFunction<ReorderBudgetItemsMutation, ReorderBudgetItemsMutationVariables>;

/**
 * __useReorderBudgetItemsMutation__
 *
 * To run a mutation, you first call `useReorderBudgetItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderBudgetItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderBudgetItemsMutation, { data, loading, error }] = useReorderBudgetItemsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReorderBudgetItemsMutation(baseOptions?: Apollo.MutationHookOptions<ReorderBudgetItemsMutation, ReorderBudgetItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderBudgetItemsMutation, ReorderBudgetItemsMutationVariables>(ReorderBudgetItemsDocument, options);
      }
export type ReorderBudgetItemsMutationHookResult = ReturnType<typeof useReorderBudgetItemsMutation>;
export type ReorderBudgetItemsMutationResult = Apollo.MutationResult<ReorderBudgetItemsMutation>;
export type ReorderBudgetItemsMutationOptions = Apollo.BaseMutationOptions<ReorderBudgetItemsMutation, ReorderBudgetItemsMutationVariables>;
export const BudgetDocument = gql`
    query Budget($input: BudgetDateInput!) {
  budget(input: $input) {
    id
    month
    year
    budgetGroups {
      id
      type
      label
      budgetItems {
        id
        name
        position
        plannedAmount
      }
    }
  }
}
    `;

/**
 * __useBudgetQuery__
 *
 * To run a query within a React component, call `useBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBudgetQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBudgetQuery(baseOptions: Apollo.QueryHookOptions<BudgetQuery, BudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BudgetQuery, BudgetQueryVariables>(BudgetDocument, options);
      }
export function useBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BudgetQuery, BudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BudgetQuery, BudgetQueryVariables>(BudgetDocument, options);
        }
export type BudgetQueryHookResult = ReturnType<typeof useBudgetQuery>;
export type BudgetLazyQueryHookResult = ReturnType<typeof useBudgetLazyQuery>;
export type BudgetQueryResult = Apollo.QueryResult<BudgetQuery, BudgetQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;