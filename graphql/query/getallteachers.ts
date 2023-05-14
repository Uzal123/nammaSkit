import { gql } from "@apollo/client";

const GET_ALL_TEACHERS = gql`
  query GetAllTeacher {
    getAllTeachers {
      address
      experience
      qualification
      designation
      department {
        _id
        deptName
        deptCode
      }
      user {
        gender
        role
        email
        phone
        _id
        firstName
        lastName
      }
      _id
    }
  }
`;

export default GET_ALL_TEACHERS;
