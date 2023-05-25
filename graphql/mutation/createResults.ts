import { gql } from "@apollo/client";

const CREATE_RESULTS = gql`
  mutation CreateResults($createResultInput: [CreateResultInput!]!) {
    createResults(createResultInput: $createResultInput) {
      message
      success
      results {
        _id
        obtainedMark
        fullMark
        resultType
        student {
          _id
        }
        subject {
          _id
        }
      }
    }
  }
`;

export default CREATE_RESULTS;
