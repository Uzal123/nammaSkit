import { gql } from "@apollo/client";

const GET_RESULT_BY_TYPE_SEM_STU_ID = gql`
  query GetResultsByresultTypeAndSemester(
    $fetchResultInput: FetchResultInput!
  ) {
    getResultsByresultTypeAndSemester(fetchResultInput: $fetchResultInput) {
      success
      message
      results {
        _id
        student {
          _id
          usn
        }
        subject {
          _id
          subjectName
          subjectCode
          subjectCredits
          semester
        }
        resultType
        obtainedMark
      }
    }
  }
`;

export default GET_RESULT_BY_TYPE_SEM_STU_ID;
