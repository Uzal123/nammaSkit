import { gql } from "@apollo/client";

const LOGIN = gql`
mutation Login($phone: Float!, $password: String!) {
  login(phone: $phone, password: $password) {
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
}`

export default LOGIN;