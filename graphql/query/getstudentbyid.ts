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
        section
        motherName
        fatherName
        parentPhone
        parentOccupation
        anualIncome
        isEligible
        section
        parmanentAddress
        entranceExamMarks
        course
        semester
        proctor {
          _id
          user {
            _id
          }
        }
      }
    }
  }
`;

export default GET_STUDENT_BY_ID;
