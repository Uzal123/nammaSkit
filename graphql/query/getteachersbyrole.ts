import { gql } from "@apollo/client";

const GET_TEACHERS_BY_ROLE = gql`
  query GetTeachersByRole($allowedRoles: [AllowedRole!]!) {
    getTeachersByRole(allowedRoles: $allowedRoles) {
      _id
      user {
        _id
        role
        email
        phone
        firstName
        lastName
      }
      department
      designation
      qualification
      experience
      address
    }
  }
`;

export default GET_TEACHERS_BY_ROLE;
