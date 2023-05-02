import { useEffect, useState } from "react";
import Input from "../../components/forminput";
import AppLayout from "../../layouts/applayout";
import { client } from "../../graphql/client";
import AuthLayout from "../../layouts/authlayout";
import { useNotificationStore } from "../../store/notification";
import { v4 as uuidv4 } from "uuid";
import CREATE_TEACHER from "../../graphql/mutation/createTeacher";
import GET_ALL_DEPTS from "../../graphql/query/getalldepartments";
import { Department } from "../newstudent";

type AllowedDepartment = "cse" | "me";

type AllowedRole = "fa" | "hod" | "pr";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AllowedRole;
  phone: number | "";
  gender: string | "";
  address: string | "";
  department: string | "";
  designation: string | "";
  qualification: string | "";
  experience: string | "";
}


const allowedRoles: AllowedRole[] = ["fa", "hod", "pr"];

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "fa",
    phone: "",
    gender: "",
    address: "",
    department: "cse",
    designation: "",
    qualification: "",
    experience: "",
  });

   const [departments, setDepartments] = useState<Department[]>([]);

  const { setNotification } = useNotificationStore((state: any) => state);

  const [loading, setLoading] = useState(false);

  const getalldepartments = async () => {
    try {
      const response = await client.query({
        query: GET_ALL_DEPTS,
      });
      console.log(response);
      if (response.data.getDepartment.success === true) {
        setDepartments(response.data.getDepartment.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await client.mutate({
        mutation: CREATE_TEACHER,
        variables: { createTeacherInput: formData },
      });

      console.log(response);
      if (response.data.createTeacher.success === true) {
        setLoading(false);
        setNotification({
          id: uuidv4(),
          message: "Teacher Created Successfully",
          status: "Success",
          duration: 3000,
        });
      } else {
        setLoading(false);
        setNotification({
          id: uuidv4(),
          message: `Error: ${response.data.createTeacher.message}`,
          status: "Error",
          duration: 3000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getalldepartments();
  }, []);

  return (
    <AuthLayout>
      <AppLayout>
        <div className="h-full w-full overflow-y-auto px-10">
          <h1 className="text-2xl font-semibold py-2">Add new Teacher</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Teachers Details
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Input
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Gender"
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleInputChange}
              />
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
              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block mb-2 font-medium text-md"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Personal Details
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
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

            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Contact Details
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/3">
              <div className="flex w-full py-2 mb-2 border-b-2">
                <h2 className="font-semibold text-lg text-gray-700">
                  Login Details
                </h2>
              </div>
              <p className="py-1">
                Phone number for Login :{" "}
                <span className="font-semibold">{formData.phone}</span>
              </p>

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                className=" px-6 float-right py-2 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none hover:bg-blue-600 hover:font-semibold"
              >
                {loading ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </AppLayout>
    </AuthLayout>
  );
};

export default SignUpForm;
