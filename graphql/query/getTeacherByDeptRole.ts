import { gql } from "@apollo/client";

const GET_BY_DEPT_ROLE = gql`
  query GetTeachersByDepartmentAndRole(
    $departmentId: String!
    $allowedRoles: [AllowedRole!]!
  ) {
    getTeachersByDepartmentAndRole(
      departmentId: $departmentId
      allowedRoles: $allowedRoles
    ) {
      message
      success
      teacher {
        _id
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

export default GET_BY_DEPT_ROLE;
