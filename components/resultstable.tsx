import React from "react";
import { result } from "../pages/results/[id]";

interface Props {
  ia1: result[];
  ia2: result[];
  ia3: result[];
  as1: result[];
  as2: result[];
  as3: result[];
  semesterResult: result[];
  semester: number | undefined;
  onEdit?: (id: string) => React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

const ResultsTable: React.FC<Props> = ({
  ia1,
  ia2,
  ia3,
  as1,
  as2,
  as3,
  semesterResult,
  isLoading,
  semester,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4 mx-6 h-full">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Semester {semester}
        </h3>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Subject Code</th>
              <th className="px-4 py-2">Subject Name</th>
              <th className="px-4 py-2">External</th>
              <th className="px-4 py-2">IA1</th>
              <th className="px-4 py-2">IA2</th>
              <th className="px-4 py-2">IA3</th>
              <th className="px-4 py-2">AS1</th>
              <th className="px-4 py-2">AS2</th>
              <th className="px-4 py-2">AS3</th>
            </tr>
          </thead>
          <tbody>
            {semesterResult.map((res, index) => (
              <tr key="">
                <td className="border px-4 py-2">{res.subject.subjectCode}</td>
                <td className="border px-4 py-2">{res.subject.subjectName}</td>
                <td className="border px-4 py-2">{res.obtainedMark}</td>
                <td className="border px-4 py-2">
                  {ia1.filter(
                    (item) =>
                      item.subject.subjectCode != res.subject.subjectCode
                  ).length > 0
                    ? ia1.filter((item) => item != res)[0].obtainedMark
                    : "--"}
                </td>
                <td className="border px-4 py-2">
                  {ia2.filter(
                    (item) =>
                      item.subject.subjectCode != res.subject.subjectCode
                  ).length > 0
                    ? ia2.filter((item) => item != res)[0].obtainedMark
                    : "--"}
                </td>
                <td className="border px-4 py-2">
                  {ia2.filter(
                    (item) =>
                      item.subject.subjectCode != res.subject.subjectCode
                  ).length > 0
                    ? ia2.filter((item) => item != res)[0].obtainedMark
                    : "--"}
                </td>
                <td className="border px-4 py-2">{res.obtainedMark}</td>
                <td className="border px-4 py-2">{res.obtainedMark}</td>
                <td className="border px-4 py-2">{res.obtainedMark}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-4 py-2">Total Marks</th>
              <td className="border px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
