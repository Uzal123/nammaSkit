import { gql } from "@apollo/client";

const GET_SUBJECT = gql`
  query GetSubjectsBySem($department: String!, $semester: Float!) {
    getSubjects(department: $department, semester: $semester) {
      success
      message
      result {
        _id
        subjectName
        semester
        department {
          _id
        }
        subjectCode
        subjectDescription
        subjectType
        subjectCredits
      }
    }
  }
`;

export default GET_SUBJECT;
