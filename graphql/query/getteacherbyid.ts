import { gql } from "@apollo/client";

const GET_TEACHER_BY_ID = gql`
  query TeacherByUserId($userId: String!) {
    getTeacherByUserId(userId: $userId) {
      teacher {
        _id
        department {
          _id
          deptName
          deptCode
        }
        user {
          firstName
          lastName
          _id
          gender
          role
          email
          phone
        }
        designation
        qualification
        experience
        address
      }
      message
      success
    }
  }
`;

export default GET_TEACHER_BY_ID;
