import { gql } from "@apollo/client";

const CREATE_MULTIPLE_STUDENTS = gql`
  mutation CreateMultipleStudents(
    $createMultipleStudentsInput: [CreateStudentInput!]!
  ) {
    createMultipleStudents(
      createMultipleStudentsInput: $createMultipleStudentsInput
    ) {
      message
      success
      students {
        _id
        anualIncome
        admissionYear
        category
        course
        currentAddress
        department {
          deptCode
        }
        dob
        entranceExamMarks
        fatherName
        isEligible
        motherName
        parentOccupation
        parentPhone
        parmanentAddress
        proctor {
          _id
        }
        section
        semester
        user {
          email
          firstName
          lastName
        }
        usn
      }
    }
  }
`;

export default CREATE_MULTIPLE_STUDENTS;
