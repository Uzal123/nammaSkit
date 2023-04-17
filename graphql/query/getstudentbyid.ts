import { gql } from "@apollo/client";

const GET_STUDENT_BY_ID = gql`query GetStudentByUserId($userId: String!) {
  getStudentByUserId(userId: $userId) {
    _id
    user {
      firstName
      _id
      role
      email
      verifiedPhone
      gender
      lastName
      phone
    }
    semester
    course
    parmanentAddress
    entranceExamMarks
    anualIncome
    parentOccupation
    parentPhone
    motherName
    fatherName
    admissionYear
    department
    category
    dob
    currentAddress
    usn
  }
}`;

export default GET_STUDENT_BY_ID;