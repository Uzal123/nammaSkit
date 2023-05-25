import { gql } from "@apollo/client";

const GET_STUDENT_BY_USN = gql`
  query Student($usn: String!) {
    getStudentByUSN(usn: $usn) {
      student {
        _id
        admissionYear
        anualIncome
        category
        course
        currentAddress
        department {
          _id
          deptCode
          deptName
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
          user {
            firstName
            _id
            lastName
            email
            gender
            phone
            role
          }
          qualification
          experience
          designation
          department {
            deptCode
            _id
            deptName
          }
          address
        }
        section
        semester
        user {
          firstName
          lastName
          phone
          email
          gender
          _id
          role
        }
        usn
      }
    }
  }
`;

export default GET_STUDENT_BY_USN;
