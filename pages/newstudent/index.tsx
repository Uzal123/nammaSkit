import { useEffect, useState } from "react";
import Input from "../../components/forminput";
import CREATE_STUDENT from "../../graphql/mutation/createStudent";
import AppLayout from "../../layouts/applayout";
import { client } from "../../graphql/client";
import AuthLayout from "../../layouts/authlayout";
import { useNotificationStore } from "../../store/notification";
import { v4 as uuidv4 } from "uuid";
import GET_ALL_DEPTS from "../../graphql/query/getalldepartments";

type AllowedDepartment = "cse" | "me";

export interface Department {
  _id: string;
  deptName: string;
  deptCode: string;
  numberOfSemesters: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  section: string;
  phone: number | "";
  semester: number | "";
  gender: string | "";
  usn: string | "";
  currentAddress: string | "";
  dob: string | "";
  category: string | "";
  department: string | "";
  admissionYear: string | "";
  fatherName: string | "";
  motherName: string | "";
  parentPhone: string | "";
  parentOccupation: string | "";
  anualIncome: string | "";
  entranceExamMarks: string | "";
  parmanentAddress: string | "";
  course: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    section: "A",
    lastName: "",
    email: "",
    phone: "",
    semester: "",
    gender: "",
    usn: "",
    currentAddress: "",
    dob: "",
    category: "",
    department: "me",
    admissionYear: "",
    fatherName: "",
    motherName: "",
    parentPhone: "",
    parentOccupation: "",
    anualIncome: "",
    entranceExamMarks: "",
    parmanentAddress: "",
    course: "",
  });

  const [departments, setDepartments] = useState<Department[]>([]);

  const { setNotification } = useNotificationStore((state: any) => state);

  const [loading, setLoading] = useState(false);

  const [sameAddress, setSameAddress] = useState(false);

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
    if (sameAddress === true && name === "currentAddress") {
      setFormData((prevState) => ({ ...prevState, parmanentAddress: value }));
    }
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
        mutation: CREATE_STUDENT,
        variables: { createStudentInput: formData },
      });

      console.log(response);
      if (response.data.createStudent.success === true) {
        setLoading(false);
        setNotification({
          id: uuidv4(),
          message: "Student Created Successfully",
          status: "Success",
          duration: 3000,
        });
      } else {
        setLoading(false);
        setNotification({
          id: uuidv4(),
          message: `Error: ${response.data.createStudent.message}`,
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

  useEffect(() => {
    console.log(departments);
  }, [departments]);

  return (
    <AuthLayout>
      <AppLayout>
        <div className="h-full w-full overflow-y-auto px-10">
          <h1 className="text-2xl font-semibold py-2">Add new Student</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Students Details
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
                label="USN"
                name="usn"
                type="text"
                value={formData.usn}
                onChange={handleInputChange}
              />
              <Input
                label="Gender"
                name="gender"
                type="text"
                value={formData.gender}
                onChange={handleInputChange}
              />
              <Input
                label="Email for Login"
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
                label="Semester"
                name="semester"
                type="number"
                value={formData.semester}
                onChange={handleFloat}
              />
              <Input
                label="Section"
                name="section"
                type="text"
                value={formData.section}
                onChange={handleInputChange}
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

              <Input
                label="Course"
                name="course"
                type="text"
                value={formData.course}
                onChange={handleInputChange}
              />
              <Input
                label="Admission Year"
                name="admissionYear"
                type="text"
                value={formData.admissionYear}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Personal Details
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
              />
              <Input
                label="Category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
              />
              <Input
                label="Father's Name"
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
              <Input
                label="Mother's Name"
                name="motherName"
                type="text"
                value={formData.motherName}
                onChange={handleInputChange}
              />
              <Input
                label="Parent's Occupation"
                name="parentOccupation"
                type="text"
                value={formData.parentOccupation}
                onChange={handleInputChange}
              />

              <Input
                label="Annual Income"
                name="anualIncome"
                type="text"
                value={formData.anualIncome}
                onChange={handleInputChange}
              />
              <Input
                label="Entrance Exam Marks"
                name="entranceExamMarks"
                type="text"
                value={formData.entranceExamMarks}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex w-full md:w-1/3 py-2 mb-2 border-b-2">
              <h2 className="font-semibold text-lg text-gray-700">
                Contact Details
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Input
                  label="Parent's Phone"
                  name="parentPhone"
                  type="text"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                />
              </div>

              <Input
                label="Current Address"
                name="currentAddress"
                type="text"
                value={formData.currentAddress}
                onChange={handleInputChange}
              />
              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="parmanentAddress"
                    className="block mb-2 font-medium text-md"
                  >
                    Permanent Address
                  </label>

                  <p
                    onClick={() => setSameAddress(!sameAddress)}
                    className="text-sm cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    Same as current
                  </p>
                </div>

                <input
                  id="parmanentAddress"
                  name="parmanentAddress"
                  type="text"
                  value={
                    sameAddress
                      ? formData.currentAddress
                      : formData.parmanentAddress
                  }
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
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
