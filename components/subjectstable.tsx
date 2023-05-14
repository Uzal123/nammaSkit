import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SubjectModal from "../modal/SubjectModal";

interface Subject {
  subjectName: string;
  subjectCode: string;
  subjectCredits: number;
  subjectType: string;
  _id: string;
  subjectDescription: string;
}

interface Props {
  subjects: Subject[];
  isLoading?: boolean;
}

const SubjectsTable: React.FC<Props> = ({ subjects, isLoading = false }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!subjects || subjects.length === 0) {
    return <p>No Subjects Available.</p>;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [clickedSub, setClickedSub] = useState({});

  const onClick = (subject: React.SetStateAction<{}>) => {
    setClickedSub(subject);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(clickedSub);
  }, [clickedSub]);

  const router = useRouter();

  return (
    <table className="divide-y w-full divide-gray-200">
      {isOpen && clickedSub && (
        <SubjectModal isOpen={isOpen} onClose={onClose} subject={clickedSub} />
      )}

      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Subject Code
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Subject Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Subject Type
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Credits
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only"></span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {subjects.map((subject) => (
          <tr key={subject._id}>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => onClick(subject)}
            >
              {subject.subjectCode}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => onClick(subject)}
            >
              {subject.subjectName}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => onClick(subject)}
            >
              {subject.subjectType}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => onClick(subject)}
            >
              {subject.subjectCredits}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubjectsTable;
