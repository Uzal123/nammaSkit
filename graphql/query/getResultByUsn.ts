import { gql } from "@apollo/client";

const GET_RESULT_BY_USN = gql`
  query GetResultsByUSN($usn: String!) {
    getResultsByUSN(usn: $usn) {
      message
      results {
        fullMark
        obtainedMark
        _id
        resultType
        subject {
          subjectCode
          semester
          subjectName
        }
      }
    }
  }
`;

export default GET_RESULT_BY_USN;
