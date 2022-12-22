import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  queueSubmissionGeneration: Scalars['Boolean'];
};


export type MutationQueueSubmissionGenerationArgs = {
  count?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  submissions: Array<Submission>;
};

export type Submission = {
  __typename?: 'Submission';
  data: Scalars['JSON'];
  id: Scalars['ID'];
  submittedAt: Scalars['DateTime'];
};

export type SubmissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'Submission', id: string, data: any, submittedAt: any }> };


export const SubmissionsDocument = gql`
    query Submissions {
  submissions {
    id
    data
    submittedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Submissions(variables?: SubmissionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubmissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubmissionsQuery>(SubmissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Submissions', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;