import React from "react";

interface Teacher {
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
  teachers: Teacher[];
  isLoading?: boolean;
}

const TeacherTable: React.FC<Props> = ({ teachers, isLoading = false }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!teachers || teachers.length === 0) {
    return <p>No teachers found.</p>;
  }

  return (
    <table className="divide-y w-full divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          
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
        {teachers.map((teacher) => (
          <tr key={teacher.user._id}>
            
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {teacher.user.firstName + " " + teacher.user.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {teacher.user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {teacher.user.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {teacher.department}
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

export default TeacherTable;
