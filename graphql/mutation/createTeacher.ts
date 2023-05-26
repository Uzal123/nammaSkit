import { gql } from "@apollo/client";

const CREATE_TEACHER = gql`
  mutation CreateTeacher($createTeacherInput: CreateTeacherInput!) {
    createTeacher(createTeacherInput: $createTeacherInput) {
      success
      message
      teacher {
        department {
          _id
        }
        _id
        user {
          _id
          firstName
          gender
          lastName
          role
        }
      }
    }
  }
`;

export default CREATE_TEACHER;
