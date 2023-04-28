import { gql } from "@apollo/client";

const GET_ALL_DEPTS = gql`
  query GetDepartments {
    getDepartment {
      message
      success
      results {
        _id
        deptName
        numberOfSemesters
        deptCode
      }
    }
  }
`;
export default GET_ALL_DEPTS;
