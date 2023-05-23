import React, { useEffect, useState } from "react";
import AppLayout from "../../layouts/applayout";
import ListOfButton, {
  ListOfDept,
  ListOfSem,
} from "../../components/listofbutton";
import { client } from "../../graphql/client";
import GET_ALL_DEPTS from "../../graphql/query/getalldepartments";
import CREATE_DEPT from "../../graphql/mutation/createDept";
import AddDepartmentModal from "../../components/newdepartmentmodal";
import GET_SUBJECT from "../../graphql/query/getsubjectbysem";
import SubjectsTable from "../../components/subjectstable";
import AddSubjectsModal from "../../components/newsubjectsmodal";
import { useUserStore } from "../../store/auth";

interface Deparment {
  deptCode: string;
  deptName: string;
  _id: string;
  numberOfSemesters: number;
}

const Courses = () => {
  const { user } = useUserStore((state: any) => state);
  const [currentDept, setCurrentDept] = useState<string>("");
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [currentSemester, setCurrentSemester] = useState<number>(1);

  const [dept, setDept] = useState<Deparment[]>([]);

  const [subLoading, setSubLoading] = useState<boolean>(true);

  const [subjects, setSubjects] = useState([]);

  const getDepartment = async () => {
    try {
      const response = await client.query({ query: GET_ALL_DEPTS });
      if (
        response.data.getDepartment.results.length > 0 &&
        response.data.getDepartment.success
      )
        setDept(response.data.getDepartment.results);
      setCurrentDept(response.data.getDepartment.results[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDepartment = async () => {
    try {
    } catch (error) {}
  };

  const getSubjects = async (currentDept: string, currentSemester: number) => {
    try {
      const response = await client.query({
        query: GET_SUBJECT,
        variables: { department: currentDept, semester: currentSemester },
      });

      if (response.data.getSubjects.success) {
        setSubjects(response.data.getSubjects.result);
        setSubLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getDepartment();
  }, []);

  useEffect(() => {
    console.log(currentDept, currentSemester);
    getSubjects(currentDept, currentSemester);
  }, [currentDept, currentSemester]);

  return (
    <AppLayout>
      <div className=" rounded-md w-full h-full">
        {user.role === "ad" && (
          <AddDepartmentModal
            isOpen={isDeptModalOpen}
            onClose={() => setIsDeptModalOpen(false)}
          />
        )}
        {user.role === ("ad" || "hod") && (
          <AddSubjectsModal
            isOpen={isSubjectModalOpen}
            department={currentDept}
            semester={currentSemester}
            onClose={() => setIsSubjectModalOpen(false)}
          />
        )}
        <div className="flex flex-col w-full justify-center px-10 p-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">
              {user.role === "ad" ? "Deparments" : "My Department"}
            </p>
          </div>
          {user.role === "ad" && (
            <div className="flex justify-between w-full border-b-2">
              <div className="flex pt-2">
                {dept.length > 0 &&
                  dept.map((item, index) => (
                    <ListOfDept
                      key={item.deptCode}
                      deptName={item.deptName}
                      _id={item._id}
                      currentDept={currentDept}
                      setCurrentDept={setCurrentDept}
                    />
                  ))}
              </div>

              <button
                className=" px-4 hover:bg-gray-400 py-2 text-gray-500 font-medium hover:text-white hover:rounded-lg "
                onClick={() => setIsDeptModalOpen(true)}
              >
                Add new Department
              </button>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <p className="font-semibold text-lg">Semseters</p>
          </div>
          <div className="flex justify-between w-full border-b-2">
            <div className="flex pt-2">
              {dept.map((item, index) => {
                if (item._id === currentDept && item.numberOfSemesters) {
                  return (
                    <div className="flex text-center" key={item._id}>
                      {new Array(item.numberOfSemesters)
                        .fill(null)
                        .map((arr, i) => (
                          <ListOfSem
                            currentSemester={currentSemester}
                            setCurrentSemester={setCurrentSemester}
                            semester={i + 1}
                            key={i}
                          />
                        ))}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <p className="font-semibold text-lg">Subjects</p>
            <button
              className=" px-4 hover:bg-gray-400 py-2 text-gray-500 font-medium hover:text-white hover:rounded-lg "
              onClick={() => setIsSubjectModalOpen(true)}
            >
              Add Subjects
            </button>
          </div>
          <div>
            <SubjectsTable subjects={subjects} isLoading={subLoading} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Courses;
