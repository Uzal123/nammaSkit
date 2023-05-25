import { useEffect, useState } from "react";
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface createStudentInput {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  gender: string;
  semester: number;
  parentOccupation: string;
  parentPhone: string;
  parmanentAddress: string;
  anualIncome: string;
  currentAddress: string;
  course: string;
  entranceExamMarks: string;
  category: string;
  department: string;
  section: string;
  admissionYear: string;
  dob: Date;
  fatherName: string;
  motherName: string;
  usn: string;
}

interface createTeacherInput {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  gender: string;
  address: string;
  department: string;
  designation: string;
  role: string;
  experience: string;
  qualification: string;
}

const ImportUserFromExcel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setNotification } = useNotificationStore((state: any) => state);

  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);

  const [department, setDepartment] = useState("");

  const [userType, setUserType] = useState("");

  const { data, loading, error } = useQuery(GET_ALL_DEPTS);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    console.log(value, name);
    if (name === "department") setDepartment(value);
    if (name === "userType") setUserType(value);
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
      const sheetData = xlsx.utils.sheet_to_json(sheet, {
        raw: false, // Parse dates as strings
        dateNF: "yyyy-mm-dd", // Date format used by the sheet
        defval: "", // Default value for null/undefined values
      });

      if (userType === "student") {
        console.log(sheetData);
        const students: createStudentInput[] = sheetData.map((row: any) => ({
          firstName: row.firstName,
          lastName: row.lastName,
          phone: parseInt(row.phone),
          email: row.email,
          gender: row.gender,
          semester: parseInt(row.semester),
          admissionYear: row.admissionYear,
          parentOccupation: row.parentOccupation,
          parentPhone: row.parentPhone,
          parmanentAddress: row.parmanentAddress,
          anualIncome: row.anualIncome,
          currentAddress: row.currentAddress,
          course: row.course,
          entranceExamMarks: row.entranceExamMarks,
          category: row.category,
          department: department,
          section: row.section,
          dob: row.dob,
          fatherName: row.fatherName,
          motherName: row.motherName,
          usn: row.usn,
        }));
        console.log(students);
        importStudents(students);
      } else if (userType === "teacher") {
        const teachers = sheetData.map((row: any) => ({
          firstName: row.firstName,
          lastName: row.lastName,
          phone: parseInt(row.phone),
          email: row.email,
          gender: row.gender,
          address: row.address,
          department: department,
          designation: row.designation,
          role: row.role,
          experience: row.experience,
          qualification: row.qualification,
        }));
        console.log(teachers);
        importTeachers(teachers);
      }

      console.log(sheetData);

      // Process the sheetData and update the results as needed
    };
    reader.readAsArrayBuffer(file);
    //remove the file from the input
    e.target.value = "";
  };

  const importStudents = async (students: createStudentInput[]) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_MULTIPLE_STUDENTS,
        variables: {
          createMultipleStudentsInput: students,
        },
      });
      if (response.data.createMultipleStudents.success) {
        setNotification({
          id: uuidv4(),
          message: "Students created successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      } else {
        setNotification({
          id: uuidv4(),
          message: response.data.createMultipleStudents.message,
          status: "Error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      setNotification({
        id: uuidv4(),
        message: "Error creating students!",
        status: "Error",
        duration: 3000,
      });
    }
  };

  const importTeachers = async (teachers: createTeacherInput[]) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_MULTIPLE_TEACHERS,
        variables: {
          createTeacherInputs: teachers,
        },
      });
      if (response.data.createMultipleTeachers.success) {
        setNotification({
          id: uuidv4(),
          message: "Teachers created successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      } else {
        setNotification({
          id: uuidv4(),
          message: response.data.createMultipleTeachers.message,
          status: "Error",
          duration: 3000,
        });
      }
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error creating teachers!",
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
            <h2 className="text-2xl font-bold mb-4">Import Users From Excel</h2>
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

              {department !== "" && (
                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block mb-2 font-medium text-md"
                  >
                    Select user type
                  </label>
                  <div>
                    <div className="flex ">
                      <input
                        id="userType"
                        name="userType"
                        value="student"
                        type="radio"
                        checked={userType === "student"}
                        onChange={(e) => handleInputChange(e)}
                        className=" px-3 py-2 border rounded-lg outline-none "
                      />
                      <label>Student</label>
                    </div>
                    <div className="flex">
                      <input
                        id="userType"
                        name="userType"
                        value="teacher"
                        type="radio"
                        checked={userType === "teacher"}
                        onChange={(e) => handleInputChange(e)}
                        required
                        className=" px-3 py-2 border rounded-lg outline-none "
                      />
                      <label>Teachers</label>
                    </div>
                  </div>
                  {userType && (
                    <div className="mt-4">
                      <label
                        htmlFor="department"
                        className="block mb-2 font-medium text-md"
                      >
                        Select the excel file
                      </label>
                      <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => fileChangedHandler(e)}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                {/* <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Assign
                </button> */}
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

export default ImportUserFromExcel;
