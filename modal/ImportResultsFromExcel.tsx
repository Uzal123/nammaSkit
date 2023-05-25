import { Fragment, useEffect, useState } from "react";
import CREATE_DEPT from "../graphql/mutation/createDept";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";
import GET_BY_DEPT_ROLE from "../graphql/query/getTeacherByDeptRole";
import { Teacher } from "../pages/teacherprofile/[id]";
import CREATE_MULTIPLE_STUDENTS from "../graphql/mutation/createMultipleStudents";
import { Department } from "../pages/newstudent";
import GET_ALL_DEPTS from "../graphql/query/getalldepartments";
import * as xlsx from "xlsx";
import CREATE_MULTIPLE_TEACHERS from "../graphql/mutation/createMultipleTeachers";
import { Deparment } from "../pages/courses";
import { ListOfSem } from "../components/listofbutton";
import GET_SUBJECT from "../graphql/query/getsubjectbysem";
import { Subject } from "../components/subjectstable";
import CREATE_RESULTS from "../graphql/mutation/createResults";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Result {
  usn: string;
  subjectCode: string;
  fullMark: number;
  obtainedMark: number;
  resultType: string;
}

const ImportResultsFromExcel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setNotification } = useNotificationStore((state: any) => state);

  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);

  const [currentSemester, setCurrentSemester] = useState<number>(1);

  const [currentSubject, setCurrentSubject] = useState<string>("");

  const [resultTypeValue, setResultTypeValue] = useState<string>("");

  const [department, setDepartment] = useState("");

  const [subLoading, setSubLoading] = useState<boolean>(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [userType, setUserType] = useState("");

  let inputref: HTMLInputElement | null;

  const { data, loading, error } = useQuery(GET_ALL_DEPTS);

  const getSubjects = async () => {
    try {
      const response = await client.query({
        query: GET_SUBJECT,
        variables: { department: department, semester: currentSemester },
      });

      if (response.data.getSubjects.success) {
        console.log(response.data.getSubjects.result);
        setSubjects(response.data.getSubjects.result);
        setSubLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    if (name === "department") setDepartment(value);
    if (name === "semster") setCurrentSemester(parseInt(value));
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("works");
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = xlsx.utils.sheet_to_json(sheet);

      const results: Result[] = sheetData.map((row: any) => ({
        usn: row.usn,
        fullMark: row.fullMark,
        obtainedMark: row.obtainedMark,
        resultType: resultTypeValue,
        subjectCode: currentSubject,
      }));

      console.log(sheetData);
      importResults(results);

      // Process the sheetData and update the results as needed
    };
    reader.readAsArrayBuffer(file);
    //remove the file from the input
    e.target.value = "";
  };

  const importResults = async (results: Result[]) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_RESULTS,
        variables: { createResultInput: results },
      });
      if (response.data.createResults.success) {
        setNotification({
          id: uuidv4(),
          message: "Results Imported Successfully",
          status: "Success",
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      console.log(error);
      setNotification({
        id: uuidv4(),
        message: "Something went wrong",
        status: "Error",
        duration: 3000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userType, department);
  };

  useEffect(() => {
    console.log(currentSemester, department);
    if (currentSemester && department) {
      getSubjects();
    }
  }, [currentSemester]);

  useEffect(() => {
    console.log(currentSubject);
  }, [currentSubject]);

  useEffect(() => {
    if (data && !loading && data.getDepartment.success)
      setDepartmentsList(data.getDepartment.results);
  }, [data]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`${
          isOpen ? "translate-y-0" : "translate-y-full"
        } fixed bottom-0 left-0 right-0  z-50 transition-all duration-300 transform w-screen flex justify-center items-center h-screen`}
      >
        <div className="w-1/2 bg-white p-6">
          <div className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">
              Import Subject Results From Excel
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block mb-2 font-medium text-md"
                >
                  Select the Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a department</option>
                  {departmentsList.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
              </div>

              {department && (
                <div className="mb-4 flex w-full">
                  <div className="w-1/2">
                    <label
                      htmlFor="department"
                      className="block mb-2 font-medium text-md"
                    >
                      Select semester
                    </label>

                    <div className="flex justify-between w-full">
                      <div className="flex pt-2">
                        {departmentsList.map((item, index) => {
                          if (
                            item._id === department &&
                            item.numberOfSemesters
                          ) {
                            return (
                              <div
                                className="flex text-center flex-col"
                                key={item._id}
                              >
                                {new Array(item.numberOfSemesters)
                                  .fill(null)
                                  .map((arr, i) => (
                                    <Fragment>
                                      <div className="flex">
                                        <input
                                          id="semester"
                                          name="semester"
                                          value={i + 1}
                                          type="radio"
                                          // checked={currentSemester === i + 1}
                                          onChange={(e) =>
                                            setCurrentSemester(
                                              parseInt(e.target.value)
                                            )
                                          }
                                          className=" px-3 py-2 border rounded-lg outline-none "
                                        />
                                        <label>Semester {i + 1}</label>
                                      </div>
                                    </Fragment>
                                  ))}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  {currentSemester && (
                    <div>
                      <label
                        htmlFor="department"
                        className="block mb-2 font-medium text-md"
                      >
                        Select Subject
                      </label>

                      {subjects.length > 0 ? (
                        <div className="flex flex-col">
                          <label>Select a subject</label>
                          {subjects.map((subject) => (
                            <div className="flex items-center">
                              <input
                                key={subject._id}
                                value={subject.subjectCode}
                                type="radio"
                                name="subject"
                                onChange={(e) =>
                                  setCurrentSubject(e.target.value)
                                }
                              />
                              <label>{subject.subjectCode}</label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No subjects found</p>
                      )}
                    </div>
                  )}
                </div>
              )}
              {currentSubject && currentSemester && (
                <div className="py-2">
                  <p className="text-gray-600">Result Type</p>
                  <select
                    className="border border-gray-300 rounded w-full p-2"
                    value={resultTypeValue.toString()}
                    onChange={(e) => setResultTypeValue(e.target.value)}
                  >
                    <option value="">Select a result type</option>
                    <option value="SEMESTER">External Results</option>
                    <option value="IA1">1st Internal</option>
                    <option value="IA2">2nd Internal</option>
                    <option value="IA3">3rd Internal</option>
                    <option value="AS1">1st Assignment</option>
                    <option value="AS2">2nd Assignment</option>
                    <option value="AS3">3rd Assignment</option>
                  </select>
                </div>
              )}
              <input
                type="file"
                ref={(refParam) => (inputref = refParam)}
                className="hidden"
                onChange={(e) => fileChangedHandler(e)}
              />

              <div className="flex justify-end">
                {currentSemester &&
                  currentSubject &&
                  resultTypeValue !== "" && (
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => inputref!.click()}
                    >
                      Upload
                    </button>
                  )}
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 bg-gray-400 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportResultsFromExcel;
