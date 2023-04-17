import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GET_STUDENT_BY_ID from "../../graphql/query/getstudentbyid";
import { client } from "../../graphql/client";
import AppLayout from "../../layouts/applayout";

type User = {
  firstName: string;
  _id: string;
  role: string;
  email: string;
  phone: string;
  verifiedPhone: boolean;
  gender: string;
  lastName: string;
};

type Student = {
  _id: string;
  user: User;
  usn: string;
  currentAddress: string;
  dob: string;
  category: string;
  department: string;
  admissionYear: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  parentOccupation: string;
  anualIncome: string;
  entranceExamMarks: string;
  parmanentAddress: string;
  course: string;
  semester: string;
};

interface Props {
  student: Student;
}

const StudentProfile: React.FC<Props> = () => {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

  const { userId } = router.query;

  //   const { data, loading, error } = useQuery(GET_STUDENT_BY_ID, {
  //     variables: {
  //       userId: userId as string, // You can assert the type here to remove the possibility of it being undefined or null
  //     },
  //   });

  const getProfileById = async () => {
    try {
      if (!userId) return;
      const data = await client.query({
        query: GET_STUDENT_BY_ID,
        variables: { userId: userId as string },
      });
      console.log(data);
      setStudent(data.data.getStudentByUserId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileById();
  }, [userId]);

  useEffect(() => {
    console.log(student);
  }, [student]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex gap-6">
          <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
            <div className="flex items-center justify-center">
              <div className="rounded-full w-32 h-32 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt="Profile"
                />
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-800 mt-4">{`${student?.user.firstName} ${student?.user.lastName}`}</h2>
            <p className="text-gray-600 mt-2">{student?.user.email}</p>
          </div>

          <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date of Birth:</p>
                <p className="font-medium">{student?.dob}</p>
              </div>
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{student?.category}</p>
              </div>
              <div>
                <p className="text-gray-600">Father's Name:</p>
                <p className="font-medium">{student?.fatherName}</p>
              </div>
              <div>
                <p className="text-gray-600">Mother's Name:</p>
                <p className="font-medium">{student?.motherName}</p>
              </div>
              <div>
                <p className="text-gray-600">Annual Income:</p>
                <p className="font-medium">{student?.anualIncome}</p>
              </div>
              <div>
                <p className="text-gray-600">Entrance Exam Marks:</p>
                <p className="font-medium">{student?.entranceExamMarks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Current Address:</p>
              <p className="font-medium">{student?.currentAddress}</p>
            </div>
            <div>
              <p className="text-gray-600">Permanent Address:</p>
              <p className="font-medium">{student?.parmanentAddress}</p>
            </div>
            <div>
              <p className="text-gray-600">Parent's Phone:</p>
              <p className="font-medium">{student?.parentPhone}</p>
            </div>
            <div>
              <p className="text-gray-600">Parent's Occupation:</p>
              <p className="font-medium">{student?.parentOccupation}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Academic Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Role:</p>
              <p className="font-medium">role</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentProfile;
