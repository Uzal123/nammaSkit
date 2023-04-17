import { gql } from "@apollo/client";

const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    getAllStudents {
      semester
      user {
        _id
        firstName
        lastName
        role
        email
        phone
      }
      usn
      department
    }
  }
`;

export default GET_ALL_STUDENTS;
