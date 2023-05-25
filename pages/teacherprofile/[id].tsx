import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../graphql/client";
import AppLayout from "../../layouts/applayout";
import GET_TEACHER_BY_ID from "../../graphql/query/getteacherbyid";
import MAKE_PROCTOR from "../../graphql/mutation/makeProctor";
import UpdateTeacherModal from "../../modal/UpdateTeacherModal";

type User = {
  firstName: string;
  _id: string;
  role: string;
  email: string;
  phone: number;
  verifiedPhone: boolean;
  gender: string;
  lastName: string;
};

export type Teacher = {
  _id: string;
  user: User;
  department: {
    _id: string;
    deptName: string;
    deptCode: string;
  };
  designation: string;
  qualification: string;
  experience: string;
  address: string;
};

interface Props {
  teacher: Teacher;
}

const TeacherProfile: React.FC<Props> = () => {
  const router = useRouter();

  const { id } = router.query;

  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const [updateModal, setUpdateModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const getProfileById = async () => {
    try {
      const { data } = await client.query({
        query: GET_TEACHER_BY_ID,
        variables: {
          userId: id,
        },
      });
      console.log(data);
      setTeacher(data.getTeacherByUserId.teacher[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const makeProctor = async () => {
    try {
      const { data } = await client.mutate({
        mutation: MAKE_PROCTOR,
        variables: {
          _id: teacher?._id,
          role: "pr",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProfileById();
    }
  }, [id]);

  return (
    <AppLayout>
      <div className="flex flex-col justify-center bg-gray-100">
        <h2 className="font-semibold text-2xl px-6 py-2">Teacher Profile</h2>
        {loading ? (
          <div className="h-4/5">Loading...</div>
        ) : (
          <Fragment>
            <UpdateTeacherModal
              isOpen={updateModal}
              teacher={teacher!}
              onClose={() => setUpdateModal(false)}
            />

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
                <h2 className="text-xl font-medium text-gray-800 mt-4">{`${teacher?.user.firstName} ${teacher?.user.lastName}`}</h2>
                <p className="text-gray-600 mt-2">{teacher?.user.email}</p>
                <p className="text-gray-600 mt-2">
                  {teacher?.department.deptName}
                </p>
                <p className="text-gray-600 mt-2">{teacher?.user.role}</p>
              </div>

              <div className="bg-white shadow-md rounded px-8 py-6 mb-4 w-2/5">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Personal Information
                </h3>

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
                  <div>
                    <p className="text-gray-600">Current Address:</p>
                    <p className="font-medium">{teacher?.address}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/5">
                <button
                  className="bg-gray-600 text-white p-2 rounded-sm w-full"
                  onClick={() => setUpdateModal(true)}
                >
                  Update Teacher
                </button>

                <button className="bg-red-600 text-white p-2 rounded-sm">
                  Delete Student
                </button>
                {teacher?.user.role === "fa" && (
                  <button
                    className="bg-gray-600 text-white p-2 rounded-sm"
                    onClick={() => makeProctor()}
                  >
                    Make Proctor
                  </button>
                )}
                {teacher?.user.role === "pr" && (
                  <button className="bg-gray-600 text-white p-2 rounded-sm">
                    See Students
                  </button>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </AppLayout>
  );
};

export default TeacherProfile;
