import { gql } from "@apollo/client";

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $updateStudentInput) {
      message
      success
      student {
        _id
      }
    }
  }
`;

export default UPDATE_STUDENT;
