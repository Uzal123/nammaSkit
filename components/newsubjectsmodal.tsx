import { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import CREATE_SUBJECTS from "../graphql/mutation/createSubjects";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  semester: number;
  department: string;
}

interface Subject {
  scheme: string;
  subjectName: string;
  subjectCode: string;
  subjectType: string;
  subjectCredits: number;
  subjectDescription: string;
  department: string;
  semester: number;
}

const AddSubjectsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  semester,
  department,
}) => {
  const { setNotification } = useNotificationStore((state: any) => state);
  const [scheme, setScheme] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [subjectCredits, setSubjectCredits] = useState(0);
  const [subjectDescription, setSubjectDescription] = useState("");

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubjects([
      ...subjects,
      {
        scheme,
        subjectName,
        subjectCode,
        subjectType,
        subjectCredits,
        department,
        semester,
        subjectDescription,
      },
    ]);
    setScheme("");
    setSubjectName("");
    setSubjectCode("");
    setSubjectType("");
    setSubjectCredits(0);
    setSubjectDescription("");
  };

  const submitSubjects = async () => {
    console.log(subjects);
    try {
      const response = await client.mutate({
        mutation: CREATE_SUBJECTS,
        variables: { createSubjectInput: subjects },
      });

      if (response.data.createSubjects.success) {
        setNotification({
          id: uuidv4(),
          message: "Subjects added successfully!",
          status: "Success",
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error adding subjects!",
        status: "Error",
        duration: 3000,
      });
    }
  };
  const removeSubject = (index: number) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
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
              Add Subjects for {semester} Semester
            </h2>
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-4 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="subjectName"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Subject Name
                  </label>
                  <input
                    id="subjectName"
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="border border-gray-400 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subjectCode"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Subject Code
                  </label>
                  <input
                    id="subjectCode"
                    type="text"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="border border-gray-400 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="scheme"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Scheme
                  </label>
                  <input
                    id="scheme"
                    type="text"
                    value={scheme}
                    onChange={(e) => setScheme(e.target.value)}
                    className="border border-gray-400 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subjectType"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Subject Type
                  </label>
                  <input
                    id="subjectType"
                    type="text"
                    value={subjectType}
                    onChange={(e) => setSubjectType(e.target.value)}
                    className="border border-gray-400 p-2 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subjectCredits"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Subject Credits
                  </label>
                  <input
                    id="subjectCredits"
                    type="number"
                    value={subjectCredits}
                    onChange={(e) => setSubjectCredits(Number(e.target.value))}
                    className="border border-gray-400 p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subjectCredits"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Subject Description
                </label>
                <input
                  id="subjectDescription"
                  type="text"
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  className="border border-gray-400 p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add
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
            {subjects.length > 0 && (
              <div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 mt-4">
                    Confirm the Subjects you want to add
                  </h2>
                  <div className="flex gap-4 w-full flex-col">
                    <div className="flex w-full">
                      <h3 className="font-semibold w-1/3">Subject Code</h3>
                      <h3 className="font-semibold w-1/3">Subject Name</h3>
                      <h3 className="font-semibold w-1/3"></h3>
                    </div>

                    <div>
                      {subjects.map((subject, index) => (
                        <div
                          className="flex gap-4 w-full justify-between border-b-2"
                          key={subject.subjectCode}
                        >
                          <p className="w-1/3">{subject.subjectCode}</p>
                          <p className="w-1/3">{subject.subjectName}</p>
                          <p
                            className="w-1/3   flex justify-center items-center"
                            key={index}
                          >
                            <button
                              onClick={() => removeSubject(index)}
                              className="text-red-600 flex hover:bg-red-600 hover:text-white px-2 py-1 rounded"
                            >
                              Remove
                            </button>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="m-2 p-2 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600"
                  onClick={() => submitSubjects()}
                >
                  <button>Confirm and Add Subjects</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubjectsModal;
