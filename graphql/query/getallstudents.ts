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
      department {
        _id
        deptName
        deptCode
      }
    }
  }
`;

export default GET_ALL_STUDENTS;
