import { gql } from "@apollo/client";

const CREATE_MULTIPLE_TEACHERS = gql`
  mutation CreateMultipleTeachers(
    $createTeacherInputs: [CreateTeacherInput!]!
  ) {
    createMultipleTeachers(createTeacherInputs: $createTeacherInputs) {
      message
      success
      teacher {
        _id
        address
        department {
          deptCode
          _id
        }
        designation
        experience
        qualification
        user {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export default CREATE_MULTIPLE_TEACHERS;
