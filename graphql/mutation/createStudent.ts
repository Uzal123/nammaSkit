import { gql } from "@apollo/client";

const CREATE_STUDENT = gql`
mutation CreateStudent($createStudentInput: CreateStudentInput!) {
  createStudent(createStudentInput: $createStudentInput) {
    success
    message
    student {
      _id
      user {
        lastName
        _id
        firstName
      }
    }
  }
}`

export default CREATE_STUDENT;