import { useState } from "react";
import CREATE_DEPT from "../graphql/mutation/createDept";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";
import GET_BY_DEPT_ROLE from "../graphql/query/getTeacherByDeptRole";
import { Teacher } from "../pages/teacherprofile/[id]";
import ASSIGN_PROCTOR_TO_STUDENT from "../graphql/mutation/assignProctorToStudent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dept: string;
  student: string;
}

const AssignProctorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  dept,
  student,
}) => {
  const { setNotification } = useNotificationStore((state: any) => state);

  const { data, loading, error } = useQuery(GET_BY_DEPT_ROLE, {
    variables: {
      departmentId: dept,
      allowedRoles: ["pr"],
    },
  });

  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [numberOfSemesters, setNumberOfSemesters] = useState<number>(0);

  const [proctor, setProctor] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setProctor(value);
  };

  const addDepartment = async () => {
    try {
      const response = await client.mutate({
        mutation: ASSIGN_PROCTOR_TO_STUDENT,
        variables: {
          updateStudentInput: { _id: student, proctor: proctor },
        },
      });
      if (response.data.updateStudent.success) {
        setNotification({
          id: uuidv4(),
          message: "Proctor Assigned successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error assigning proctor!",
        status: "Error",
        duration: 3000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDepartment();
  };

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
              Select the Proctor for the Student
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="departmentName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Proctor Name
                </label>
                <select
                  id="proctor"
                  name="proctor"
                  value={proctor}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a proctor</option>
                  {!loading &&
                    data?.getTeachersByDepartmentAndRole?.teacher.map(
                      (proctor: Teacher) => (
                        <option key={proctor._id} value={proctor._id}>
                          {proctor.user.firstName} {proctor.user.lastName}
                        </option>
                      )
                    )}
                  {!loading &&
                    data?.getTeachersByDepartmentAndRole?.teacher.length ===
                      0 && <option value="">No Proctor Found</option>}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Assign
                </button>
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

export default AssignProctorModal;
