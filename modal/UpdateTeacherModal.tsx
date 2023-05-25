import { useState } from "react";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/forminput";
import { Teacher } from "../pages/teacherprofile/[id]";
import UPDATE_TEACHER from "../graphql/mutation/updateTeacher";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher;
}

type AllowedRole = "fa" | "hod" | "pr";

interface FormData {
  _id: string;
  email: string;
  role: string;
  phone: number;
  address: string | "";
  designation: string | "";
  qualification: string | "";
  experience: string | "";
}

const allowedRoles: AllowedRole[] = ["fa", "hod", "pr"];

const UpdateTeacherModal: React.FC<Props> = ({ isOpen, onClose, teacher }) => {
  const [formData, setFormData] = useState<FormData>({
    _id: teacher._id,
    email: teacher.user.email,
    role: teacher.user.role,
    phone: teacher.user.phone,
    address: teacher.address,
    designation: teacher.designation,
    qualification: teacher.qualification,
    experience: teacher.experience,
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

  const updateTeacher = async () => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_TEACHER,
        variables: {
          updateTeacherInput: {
            ...formData,
          },
        },
      });
      if (response.data.updateTeacher.success) {
        setNotification({
          id: uuidv4(),
          message: "Teacher updated successfully!",
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
    updateTeacher();
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
              Update Teacher's Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
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
                  label="Designation"
                  name="designation"
                  type="text"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
                <Input
                  label="Qualification"
                  name="qualification"
                  type="text"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
                <Input
                  label="Experience in years"
                  name="experience"
                  type="text"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block mb-2 font-medium text-md"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select a role</option>
                    {allowedRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => console.log(formData)}
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

export default UpdateTeacherModal;
