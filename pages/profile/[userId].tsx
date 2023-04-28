import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import GET_STUDENT_BY_ID from "../../graphql/query/getstudentbyid";
import { client } from "../../graphql/client";
import AppLayout from "../../layouts/applayout";
import GET_TEACHER_BY_ID from "../../graphql/query/getteacherbyid";

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

type Teacher = {
  _id: string;
  user: User;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  address: string;
};

interface Props {
  student: Student;
}

const StudentProfile: React.FC<Props> = () => {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const { query } = useRouter();

  const getProfileById = async () => {
    if (role === "st") {
      try {
        const { data } = await client.query({
          query: GET_STUDENT_BY_ID,
          variables: {
            userId: userId,
          },
        });
        console.log(data.getStudentByUserId);
        setStudent(data.getStudentByUserId.student);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await client.query({
          query: GET_TEACHER_BY_ID,
          variables: {
            userId: userId,
          },
        });
        console.log(data.getTeacherByUserId);
        setTeacher(data.getTeacherByUserId.teacher);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setTeacher(null);
    setStudent(null);
    if (query.id && query.role) {
      setUserId(query.id as string);
      setRole(query.role as string);
    }
  }, [query]);

  useEffect(() => {
    if (userId && role) {
      getProfileById();
      console.log(userId, role);
    }
  }, [userId, role]);

  useEffect(() => {
    console.log(student);
  }, [student]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {loading ? (
          <div className="h-4/5">Loading...</div>
        ) : (
          <Fragment>
            <div className="flex gap-6">
              {role === "st" ? (
                <div className="bg-white shadow-md rounded px-8 py-6 mb-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full w-32 h-32 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-medium text text-gray-800 mt-4">{`${student?.user.firstName} ${student?.user.lastName}`}</h2>
                  <p className="text-gray-600 mt-2">{student?.user.email}</p>
                  <p className="text-gray-600 mt-2">{student?.usn}</p>
                  <p className="text-gray-600 mt-2">{student?.department}</p>
                </div>
              ) : (
                <div className="bg-white shadow-md rounded px-8 py-6 mb-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="rounded-full w-32 h-32 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-medium text-gray-800 mt-4">{`${teacher?.user.firstName} ${teacher?.user.lastName}`}</h2>
                  <p className="text-gray-600 mt-2">{teacher?.user.email}</p>
                  <p className="text-gray-600 mt-2">{teacher?.department}</p>
                </div>
              )}

              <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Personal Information
                </h3>
                {role === "st" ? (
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
                      <p className="text-gray-600">Parent Occupation:</p>
                      <p className="font-medium">{student?.parentOccupation}</p>
                    </div>

                    <div>
                      <p className="text-gray-600">Entrance Exam Marks:</p>
                      <p className="font-medium">
                        {student?.entranceExamMarks}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Experience:</p>
                      <p className="font-medium">{teacher?.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Designation</p>
                      <p className="font-medium">{teacher?.designation}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Qualification:</p>
                      <p className="font-medium">{teacher?.qualification}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Contact Information
              </h3>
              {role === "st" ? (
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
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Current Address:</p>
                    <p className="font-medium">{teacher?.address}</p>
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </AppLayout>
  );
};

export default StudentProfile;
