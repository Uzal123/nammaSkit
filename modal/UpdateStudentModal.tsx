import { useState } from "react";
import CREATE_DEPT from "../graphql/mutation/createDept";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateStudentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setNotification } = useNotificationStore((state: any) => state);
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [numberOfSemesters, setNumberOfSemesters] = useState<number>(0);

  const addDepartment = async () => {
    try {
      const response = await client.mutate({
        mutation: CREATE_DEPT,
        variables: {
          createDepartmentInput: {
            deptName,
            deptCode,
            numberOfSemesters,
          },
        },
      });
      if (response.data.createDepartment.success) {
        setNotification({
          id: uuidv4(),
          message: "Department added successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error adding department!",
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
              Update Student's Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="departmentName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Current Address
                </label>
                <input
                  id="deptName"
                  type="text"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  className="border border-gray-400 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deptCode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Annual Income
                </label>
                <input
                  id="deptCode"
                  type="text"
                  value={deptCode}
                  onChange={(e) => setDeptCode(e.target.value)}
                  className="border border-gray-400 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfSubjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Parent Phone
                </label>
                <input
                  id="numberOfSubjects"
                  type="number"
                  value={numberOfSemesters}
                  onChange={(e) => setNumberOfSemesters(Number(e.target.value))}
                  className="border border-gray-400 p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="parentOccupation"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Parent Occupation
                </label>
                <input
                  id="parentOccupation"
                  type="text"
                  className="border border-gray-400 p-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
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

export default UpdateStudentModal;
