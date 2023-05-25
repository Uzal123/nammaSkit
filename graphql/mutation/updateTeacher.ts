import { gql } from "@apollo/client";

const UPDATE_TEACHER = gql`
  mutation UpdateTeacher($updateTeacherInput: UpdateTeacherInput!) {
    updateTeacher(updateTeacherInput: $updateTeacherInput) {
      message
      success
      teacher {
        _id
        address
        department {
          _id
          deptCode
          deptName
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

export default UPDATE_TEACHER;
