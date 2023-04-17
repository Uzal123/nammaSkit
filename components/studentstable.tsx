import { useRouter } from "next/router";
import React from "react";

interface Student {
  usn: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  department: string;
}

interface Props {
  students: Student[];
  isLoading?: boolean;
}

const StudentTable: React.FC<Props> = ({ students, isLoading = false }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!students || students.length === 0) {
    return <p>No students found.</p>;
  }

  const router = useRouter();

  console.log(students);
  return (
    <table className="divide-y w-full divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            USN
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Full Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Department
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <tr key={student.user._id}>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hover:text-indigo-600"
              onClick={() => router.push(`/profile/${student.user._id}`)}
            >
              {student.usn}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => router.push(`/profile/${student.user._id}`)}
            >
              {student.user.firstName + " " + student.user.lastName}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => router.push(`/profile/${student.user._id}`)}
            >
              {student.user.email}
            </td>
            <td
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-indigo-600"
              onClick={() => router.push(`/profile/${student.user._id}`)}
            >
              {student.user.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {student.department}
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

export default StudentTable;
