import { useRouter } from "next/router";
import React from "react";

interface Subject {
  subjectName: string;
  subjectCode: string;
  subjectCredits: number | undefined;
  subjectType: string | undefined;
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

  const router = useRouter();

  return (
    <table className="divide-y w-full divide-gray-200">
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
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {subjects.map((subject) => (
          <tr key={subject.subjectCode}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {subject.subjectCode}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {subject.subjectName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {subject.subjectType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {subject.subjectCredits}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubjectsTable;
