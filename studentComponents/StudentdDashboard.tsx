import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../graphql/client";
import GET_STUDENT_BY_ID from "../graphql/query/getstudentbyid";
import UpdateStudentModal from "../modal/UpdateStudentModal";
import AssignProctorModal from "../modal/AssignProctorModal";
import { useUserStore } from "../store/auth";
import AppLayout from "../layouts/applayout";
import { Teacher } from "../pages/teacherprofile/[id]";
import GET_TEACHER_BY_ID from "../graphql/query/getteacherbyid";

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
  department: {
    _id: string;
    deptName: string;
    deptCode: string;
  };
  admissionYear: string;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  parentOccupation: string;
  anualIncome: string;
  entranceExamMarks: string;
  parmanentAddress: string;
  course: string;
  section: string;
  proctor?: Teacher;
  semester: string;
  isEligible: boolean;
};

const StudentDashboard = () => {
  const router = useRouter();

  const { user } = useUserStore((state) => state);

  const [student, setStudent] = useState<Student | null>(null);

  const [proctor, setProctor] = useState<Teacher | null>(null);

  const [updateModal, setUpdateModal] = useState<boolean>(false);

  const [proctorModal, setProctorModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const getProfileById = async () => {
    try {
      const { data } = await client.query({
        query: GET_STUDENT_BY_ID,
        variables: {
          userId: user.id,
        },
      });
      console.log(data.getStudentByUserId);
      setStudent(data.getStudentByUserId.student);
    } catch (error) {
      console.log(error);
    }
  };

  const getProctor = async () => {
    try {
      const { data } = await client.query({
        query: GET_TEACHER_BY_ID,
        variables: {
          userId: student?.proctor?._id,
        },
      });
      console.log(data.getTeacherById);
      setProctor(data.getTeacherById.teacher);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    setUpdateModal(false);
    setProctorModal(false);
  };

  useEffect(() => {
    if (user.id) {
      getProfileById();
    }
  }, [user]);

  useEffect(() => {
    if (student?.proctor?._id) {
      getProctor();
    } else {
      setLoading(false);
    }
  }, [student]);

  useEffect(() => {
    if (proctor) {
      console.log(student, proctor);
    }
  }, [proctor]);

  return (
    <AppLayout>
      <div className="flex flex-col justify-center bg-gray-100">
        <h2 className="font-semibold text-2xl px-6 py-2">Student Profile</h2>

        <div className="flex gap-6 px-6 py-2 w-full">
          <div className="bg-white shadow-md rounded px-8 py-6 mb-4 text-center w-2/5">
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
            <p className="text-gray-600 mt-2">{student?.department.deptName}</p>
            <p className="text-gray-600 mt-2">
              {student?.semester.toString() + " Semester -" + student?.section}
            </p>
            <div className="w-full text-center">
              <h2>Eligibilty for Exam:</h2>

              {student?.isEligible ? (
                <p className="text-green-600 font-medium">Eligible</p>
              ) : (
                <p className="text-red-600 font-medium">Not Eligible</p>
              )}
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-8 py-6 mb-4 w-2/5">
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
                <p className="text-gray-600">Father&apos;s Name:</p>
                <p className="font-medium">{student?.fatherName}</p>
              </div>
              <div>
                <p className="text-gray-600">Mother&apos;s Name:</p>
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
                <p className="font-medium">{student?.entranceExamMarks}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/5">
            <button
              className="bg-gray-600 text-white p-2 rounded-sm"
              onClick={() => router.push(`/results/${student!.usn}`)}
            >
              View Results
            </button>
            {student?.proctor === null ? (
              <div className="text-center"> No Proctor Assigned</div>
            ) : (
              <div className="bg-white shadow-md rounded px-8 py-6 text-center">
                <h2 className="text-xl font-medium text text-gray-800">
                  Proctor
                </h2>
                <div className="flex items-center justify-center">
                  <div className="rounded-full w-32 h-32 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      alt="Profile"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-medium text text-gray-800 mt-4">{`${proctor?.user.firstName} ${proctor?.user.lastName}`}</h2>

                <p className="text-gray-600 mt-2">{proctor?.user.phone}</p>
                <p className="text-gray-600 mt-2">
                  {student?.department.deptName}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 py-6 mb-4 mx-6">
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
              <p className="text-gray-600">Parent&apos;s Phone:</p>
              <p className="font-medium">{student?.parentPhone}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
