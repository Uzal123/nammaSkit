import React from "react";
import { result } from "../pages/results/[id]";

interface Props {
  results: result[];
  resultType: string;
  semester: number | undefined;
  onEdit?: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

const ResultsTable: React.FC<Props> = ({
  results,
  isLoading,
  resultType,
  semester,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4 mx-6 h-full">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Semester {semester} - {resultType}
        </h3>

        {results.length > 0 ? (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Subject Code</th>
                <th className="px-4 py-2">Subject Name</th>
                <th className="px-4 py-2">Obtained Marks</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => (
                <tr key="">
                  <td className="border px-4 py-2">
                    {res.subject.subjectCode}
                  </td>
                  <td className="border px-4 py-2">
                    {res.subject.subjectName}
                  </td>
                  <td className="border px-4 py-2">{res.obtainedMark}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="px-4 py-2">Total Marks</th>
                <td className="border px-4 py-2">98</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsTable;
