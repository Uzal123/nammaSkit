import { gql } from "@apollo/client";

const GET_STUDENT_BY_ID = gql`
  query GetStudentByUserId($userId: String!) {
    getStudentByUserId(userId: $userId) {
      success
      message
      student {
        _id
        usn
        currentAddress
        user {
          firstName
          lastName
          gender
          role
          email
          phone
          _id
        }
        dob
        category
        department {
          _id
          deptName
          deptCode
        }
        admissionYear
        motherName
        fatherName
        parentPhone
        parentOccupation
        anualIncome
        parmanentAddress
        entranceExamMarks
        course
        semester
      }
    }
  }
`;

export default GET_STUDENT_BY_ID;
