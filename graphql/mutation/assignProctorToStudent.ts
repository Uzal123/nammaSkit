import { gql } from "@apollo/client";

const ASSIGN_PROCTOR_TO_STUDENT = gql`
  mutation AssignProctorToStudent($updateStudentInput: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $updateStudentInput) {
      message
      success
    }
  }
`;

export default ASSIGN_PROCTOR_TO_STUDENT;
