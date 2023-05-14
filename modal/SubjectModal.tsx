import { useState } from "react";
import CREATE_DEPT from "../graphql/mutation/createDept";
import { client } from "../graphql/client";
import { useNotificationStore } from "../store/notification";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subject: any;
}

const SubjectModal: React.FC<Props> = ({ isOpen, onClose, subject }) => {
  //   const { setNotification } = useNotificationStore((state: any) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <div className="w-2/5 bg-white p-6 rounded-md">
          <div className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Subject Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="departmentName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  <span className="font-semibold">Subject Name : </span>
                  {subject.subjectName}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deptCode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  <span className="font-semibold">Subject Code : </span>
                  {subject.subjectCode}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfSubjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  <span className="font-semibold">Subject Type : </span>
                  {subject.subjectType}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfSubjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  <span className="font-semibold">Subject Credits : </span>
                  {subject.subjectCredits}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfSubjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  <span className="font-semibold">Subject Description : </span>
                  {subject.subjectDescription}
                </label>
              </div>
              <div className="flex justify-between">
                <div>
                  <button className="bg-red-600 text-white py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-2 bg-gray-400 text-white py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectModal;
