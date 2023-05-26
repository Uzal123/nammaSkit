import { Fragment, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import GET_STUDENT_BY_ID from "../../graphql/query/getstudentbyid";
import { client } from "../../graphql/client";
import AppLayout from "../../layouts/applayout";
import UpdateStudentModal from "../../modal/UpdateStudentModal";
import AssignProctorModal from "../../modal/AssignProctorModal";
import GET_RESULT_BY_TYPE_SEM_STU_ID from "../../graphql/query/getResultByTypeSemStuID";
import { get } from "http";
import { useUserStore } from "../../store/auth";
import ResultsTable from "../../components/resultstable";
import GET_STUDENT_BY_USN from "../../graphql/query/getStudentByUsn";

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
  semester: string;
};

enum IRESULTENUM {
  SEMESTER = "SEMESTER",
  IA1 = "IA1",
  IA2 = "IA2",
  IA3 = "IA3",
  AS1 = "AS1",
  AS2 = "AS2",
  AS3 = "AS3",
}

const IResultType = `${IRESULTENUM}`;

export type result = {
  _id: string;
  subject: {
    _id: string;
    subjectName: string;
    subjectCode: string;
    subjectType?: string;
    subjectCredits?: number;
  };
  obtainedMark: number;
  resultType: IRESULTENUM;
};

// type fetchResultInput = {
//   studentId: string;
//   semester: number | undefined;
//   resultType?: resultType[];
// };

interface Props {
  student: Student;
}

interface ResultsData {
  IA1: result[];
  IA2: result[];
  IA3: result[];
  SEMESTER: result[];
  AS1: result[];
  AS2: result[];
  AS3: result[];
}

const StudentResult: React.FC<Props> = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const { id } = router.query;

  const [student, setStudent] = useState<Student | null>(null);

  const [studentId, setStudentId] = useState<string>("");

  const [semester, setSemester] = useState<number>();

  const [resultSem, setResultSem] = useState<number>();

  const [fetchResultInput, setFetchResultInput] = useState({
    studentId: "",
    semester: semester,
    resultType: ["IA1", "IA2", "IA3", "SEMESTER", "AS1", "AS2", "AS3"],
  });

  const [result, setResult] = useState<result[]>([]);

  const [updateModal, setUpdateModal] = useState<boolean>(false);

  const [proctorModal, setProctorModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [resultsData, setResultsData] = useState<ResultsData>({
    IA1: [],
    IA2: [],
    IA3: [],
    SEMESTER: [],
    AS1: [],
    AS2: [],
    AS3: [],
  });

  const getProfileById = async () => {
    try {
      const { data } = await client.query({
        query: GET_STUDENT_BY_USN,
        variables: {
          usn: id,
        },
      });
      console.log(data.getStudentByUSN);
      setFetchResultInput({
        studentId: data.getStudentByUSN.student._id,
        semester: data.getStudentByUSN.student.semester,
        resultType: ["SEMESTER", "IA1", "IA2", "IA3", "AS1", "AS2", "AS3"],
      });
      setStudent(data.getStudentByUSN.student);
      setStudentId(data.getStudentByUSN.student._id);
      setSemester(data.getStudentByUSN.student.semester);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getResults = async () => {
    try {
      const response = await client.query({
        query: GET_RESULT_BY_TYPE_SEM_STU_ID,
        variables: {
          fetchResultInput: fetchResultInput,
        },
        fetchPolicy: "no-cache",
      });

      if (response.data.getResultsByresultTypeAndSemester.success) {
        setResult(response.data.getResultsByresultTypeAndSemester.results);
      }
      setResultSem(semester);
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = () => {
    setUpdateModal(false);
    setProctorModal(false);
  };

  useEffect(() => {
    if (id) {
      getProfileById();
    }
  }, [id]);

  useEffect(() => {
    if (
      fetchResultInput.studentId &&
      fetchResultInput.semester &&
      fetchResultInput.resultType.length > 0
    )
      getResults();
  }, [student]);

  useEffect(() => {
    if (studentId && semester) {
      setFetchResultInput({
        studentId: studentId,
        semester: semester,
        resultType: ["IA1", "IA2", "IA3", "SEMESTER", "AS1", "AS2", "AS3"],
      });
    }
  }, [studentId, semester]);

  const resetResult = () => {
    let data: ResultsData = {
      IA1: [],
      IA2: [],
      IA3: [],
      SEMESTER: [],
      AS1: [],
      AS2: [],
      AS3: [],
    };

    setResultsData(data);
  };

  useEffect(() => {
    if (result.length > 0) {
      let data: ResultsData = {
        IA1: [],
        IA2: [],
        IA3: [],
        SEMESTER: [],
        AS1: [],
        AS2: [],
        AS3: [],
      };
      result.forEach((item, i) => {
        data[item.resultType].push(item);
      });
      console.log({ data: data! });
      setResultsData(data!);
    }
  }, [result]);

  return (
    <AppLayout>
      <div className="flex flex-col justify-center bg-gray-100">
        <h2 className="font-semibold text-2xl px-6 py-2 h-full">
          {student?.user.firstName + " " + student?.user.lastName + " "}Result
        </h2>
        {loading ? (
          <div className="h-4/5">Loading...</div>
        ) : (
          <Fragment>
            <div className="flex gap-6 px-6 py-2 h-full w-full">
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
                <p className="text-gray-600 mt-2">
                  {student?.department.deptName}
                </p>
                <p className="text-gray-600 mt-2">
                  {student?.semester.toString() +
                    " Semester -" +
                    student?.section}
                </p>
              </div>
              <div className="bg-white shadow-md rounded px-8 py-6 mb-4 w-2/5">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Select Semester
                </h3>
                <div className="grid gap-4">
                  <div>
                    <p className="text-gray-600">Semester</p>
                    <select
                      className="border border-gray-300 rounded w-full p-2"
                      value={semester}
                      onChange={(e) => setSemester(parseInt(e.target.value))}
                    >
                      <option value="1">1st Semester</option>
                      <option value="2">2nd Semester</option>
                      <option value="3">3rd Semester</option>
                      <option value="4">4th Semester</option>
                      <option value="5">5th Semester</option>
                      <option value="6">6th Semester</option>
                      <option value="7">7th Semester</option>
                      <option value="8">8th Semester</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="bg-gray-600 text-white p-2 rounded-sm w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        resetResult();
                        getResults();
                      }}
                    >
                      See Results
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-1/5">
                <button
                  className="bg-gray-600 text-white p-2 rounded-sm w-full"
                  onClick={() =>
                    user.role === "st"
                      ? router.push(`/`)
                      : router.push(`/studentprofile/${student?.user._id}`)
                  }
                >
                  View Profile
                </button>

                <button
                  className="bg-gray-600 text-white p-2 rounded-sm"
                  onClick={() => router.push("/attendance")}
                >
                  View Attendance
                </button>
              </div>
            </div>
            <h2 className="font-semibold text-2xl px-6 py-2 h-full">Results</h2>
            <ResultsTable
              ia1={resultsData.IA1}
              ia2={resultsData.IA2}
              ia3={resultsData.IA3}
              as1={resultsData.AS1}
              as2={resultsData.AS2}
              as3={resultsData.AS3}
              semester={resultSem}
              semesterResult={resultsData.SEMESTER}
            />
          </Fragment>
        )}
      </div>
    </AppLayout>
  );
};

export default StudentResult;
