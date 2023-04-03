import { gql } from "@apollo/client";

const ME = gql`
  query Me {
    me {
      user {
        _id
        firstName
        lastName
        role
        email
        accessToken
      }
      success
      message
    }
  }
`;

export default ME;
