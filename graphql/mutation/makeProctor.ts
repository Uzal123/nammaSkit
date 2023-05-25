import { gql } from "@apollo/client";

const MAKE_PROCTOR = gql`
  mutation MakeProctor($updateTeacherInput: UpdateTeacherInput!) {
    updateTeacher(updateTeacherInput: $updateTeacherInput) {
      message
      success
      teacher {
        _id
        address
        department {
          deptCode
        }
        designation
      }
    }
  }
`;

export default MAKE_PROCTOR;
