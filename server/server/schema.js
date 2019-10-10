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
    id: ID!
    title: String!
    completed: Boolean
    createdAt: DateTime!
    user: User!
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
    actions(completed: Boolean): [Action]
  }

  type Mutation {
    addAction(action: ActionInput!): Action
    completeAction(actionId: ID!): Boolean
    deleteAction(actionId: ID!): Boolean
    createUser(user: UserInput!): User
    login(email: String!, password: String!): AuthPayload
  }

  scalar DateTime
  scalar JSON
`;

export default types;
