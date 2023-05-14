import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      user {
        _id
        role
        lastName
        firstName
        email
        accessToken
      }
    }
  }
`;

export default LOGIN;
