import { gql } from "@apollo/client";

const CREATE_DEPT = gql`
  mutation createDept($createDepartmentInput: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $createDepartmentInput) {
      success
      message
      result {
        _id
        deptName
        numberOfSemesters
        deptCode
      }
    }
  }
`;

export default CREATE_DEPT;
