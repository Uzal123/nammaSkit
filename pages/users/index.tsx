import React, { ReactEventHandler, useEffect, useState } from "react";
import AppLayout from "../../layouts/applayout";
import ListOfButton from "../../components/listofbutton";
import { useQuery } from "@apollo/client";
import GET_ALL_STUDENTS from "../../graphql/query/getallstudents";
import StudentsTable from "../../components/studentstable";
import { useUserStore } from "../../store/auth";
import TeacherTable from "../../components/teacherstable";
import { useRouter } from "next/router";
import GET_ALL_TEACHERS from "../../graphql/query/getallteachers";
import { client } from "../../graphql/client";
import GET_TEACHER_BY_ID from "../../graphql/query/getteacherbyid";

const Users = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [listOf, setListOf] = useState("Students");

  const handleAddNew = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (listOf === "Students") router.push("/newstudent");
    else router.push("/newteacher");
  };

  const { data, loading, error } = useQuery(
    listOf === "Students" ? GET_ALL_STUDENTS : GET_ALL_TEACHERS
  );

  const getProfileById = async () => {
    try {
      const { data } = await client.query({
        query: GET_TEACHER_BY_ID,
        variables: {
          userId: user.id,
        },
      });
      console.log(data.getTeacherByUserId.teacher);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [listOf]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (user.role && user.role !== "ad" && user.role !== "st") {
      console.log("here", { role: user.role });
      //   getProfileById();
    }
  }, [user]);

  return (
    <AppLayout>
      <div className=" rounded-md w-full h-full">
        <div className="flex flex-col w-full justify-center px-10 p-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">
              {user.role === "ad" ? "Users" : "Department"}
            </p>

            {user.role === "ad" ? (
              <div className="flex gap-4">
                <button
                  className="bg-gray-600 px-4 py-1.5 rounded-md text-white"
                  onClick={(e) => handleAddNew(e)}
                >
                  Import {listOf} from Excel
                </button>
                <button
                  className="bg-gray-600 px-4 py-1.5 rounded-md text-white"
                  onClick={(e) => handleAddNew(e)}
                >
                  Add new {listOf.slice(0, -1)}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-between w-full border-b-2">
            <div className="flex pt-2">
              <ListOfButton
                title="Students"
                listOf={listOf}
                setListOf={setListOf}
              />
              <ListOfButton
                title="Teachers"
                listOf={listOf}
                setListOf={setListOf}
              />
            </div>
          </div>
        </div>
        <div className="px-10">
          {listOf === "Students" ? (
            <StudentsTable
              students={data?.getAllStudents}
              isLoading={loading}
            />
          ) : (
            <TeacherTable teachers={data?.getAllTeachers} isLoading={loading} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Users;
