import { gql } from "@apollo/client";

const CREATE_SUBJECTS = gql`
  mutation CreateSubjects($createSubjectInput: [CreateSubjectInput!]!) {
    createSubjects(createSubjectInput: $createSubjectInput) {
      success
      message
      result {
        _id
        subjectName
        semester
      }
    }
  }
`;

export default CREATE_SUBJECTS;
