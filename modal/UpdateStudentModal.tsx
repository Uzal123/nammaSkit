import { useState } from "react";
import CREATE_DEPT from "../graphql/mutation/createDept";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";
import { Student } from "../pages/studentprofile/[id]";
import Input from "../components/forminput";
import UPDATE_STUDENT from "../graphql/mutation/updateStudent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

interface FormData {
  _id: string;
  email: string;
  phone: number;
  currentAddress: string | "";
  semester: number | "";
  dob: Date | string | "";
  section: string | "";
  category: string | "";
  isEligible: boolean | "";
  fatherName: string | "";
  motherName: string | "";
  parentPhone: string | "";
  parentOccupation: string | "";
  anualIncome: string | "";
  entranceExamMarks: string | "";
  parmanentAddress: string | "";
  course: string | "";
}

const UpdateStudentModal: React.FC<Props> = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState<FormData>({
    _id: student._id,
    email: student.user.email,
    phone: student.user.phone,
    semester: student.semester,
    currentAddress: student.currentAddress,
    dob: student.dob,
    section: student.section,
    category: student.category,
    isEligible: student.isEligible,
    fatherName: student.fatherName,
    motherName: student.motherName,
    parentPhone: student.parentPhone,
    parentOccupation: student.parentOccupation,
    anualIncome: student.anualIncome,
    entranceExamMarks: student.entranceExamMarks,
    parmanentAddress: student.parmanentAddress,
    course: student.course,
  });
  const { setNotification } = useNotificationStore((state: any) => state);
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [numberOfSemesters, setNumberOfSemesters] = useState<number>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFloat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setFormData((prevState) => ({ ...prevState, [key]: val }));
  };

  const updateStudent = async () => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_STUDENT,
        variables: {
          updateStudentInput: {
            ...formData,
          },
        },
      });
      if (response.data.updateStudent.success) {
        setNotification({
          id: uuidv4(),
          message: "Student Updated successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error while Updating!",
        status: "Error",
        duration: 3000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStudent();
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
              <div className="grid grid-cols-3 gap-4 overflow-x-scroll">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleFloat}
                />

                <Input
                  label="Current Address"
                  name="currentAddress"
                  type="text"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                />

                <Input
                  label="Semester"
                  name="semester"
                  type="number"
                  value={formData.semester}
                  onChange={handleFloat}
                />

                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob.toLocaleString().split("T")[0] || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Section"
                  name="section"
                  type="text"
                  value={formData.section || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Category"
                  name="category"
                  type="text"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Father's Name"
                  name="fatherName"
                  type="text"
                  value={formData.fatherName || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Mother's Name"
                  name="motherName"
                  type="text"
                  value={formData.motherName || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Parent's Phone"
                  name="parentPhone"
                  type="text"
                  value={formData.parentPhone || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Parent's Occupation"
                  name="parentOccupation"
                  type="text"
                  value={formData.parentOccupation || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Annual Income"
                  name="annualIncome"
                  type="text"
                  value={formData.anualIncome || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Entrance Exam Marks"
                  name="entranceExamMarks"
                  type="text"
                  value={formData.entranceExamMarks || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Permanent Address"
                  name="permanentAddress"
                  type="text"
                  value={formData.parmanentAddress || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Course"
                  name="course"
                  type="text"
                  value={formData.course || ""}
                  onChange={handleInputChange}
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
