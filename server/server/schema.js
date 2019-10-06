import { gql } from 'apollo-server-express';

const types = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
  }

  type AuthPayload {
    id: ID!
    token: String!
  }

  type Action {
    _id: ID!
    title: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ActionInput {
    title: String!
  }

  type Query {
    actions: [Action]
  }

  type Mutation {
    addAction(action: ActionInput!): Action
    createUser(user: UserInput!): User
    login(email: String!, password: String!): AuthPayload
  }

  scalar DateTime
  scalar JSON
`;

export default types;
