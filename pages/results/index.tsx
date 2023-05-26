import React, { ReactEventHandler, useEffect, useState } from "react";
import AppLayout from "../../layouts/applayout";
import { useQuery } from "@apollo/client";
import GET_ALL_STUDENTS from "../../graphql/query/getallstudents";
import StudentsTable from "../../components/studentstable";
import * as xlsx from "xlsx";
import { useUserStore } from "../../store/auth";
import ImportResultsFromExcel from "../../modal/ImportResultsFromExcel";
import { useRouter } from "next/router";

const Results = () => {
  const router = useRouter();

  const { user } = useUserStore();

  const [isOpen, setIsOpen] = useState(false);

  const [usn, setUsn] = useState("");

  const findResultByUsn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/results/${usn}`);
  };

  return (
    <AppLayout>
      {isOpen && (
        <ImportResultsFromExcel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div className=" rounded-md w-full h-full bg-gray-100">
        <div className="flex flex-col w-full justify-center px-10 p-4">
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Results Management</p>
          </div>
        </div>
        <div className="px-10 w-full">
          <div className="flex gap-4">
            <form className="flex flex-col gap-4 bg-white rounded-md p-4 w-1/3">
              <p className="font-semibold text-lg">
                Search for results with USN
              </p>
              <input
                type="text"
                name="usn"
                className="border-2 w-full p-2 rounded-md"
                onChange={(e) => setUsn(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                onClick={(e) => findResultByUsn(e)}
                disabled={usn.length !== 10}
              >
                Search
              </button>
            </form>
            {user.role === "fa" && (
              <div className="flex flex-col gap-4 bg-white p-6 items-center justify-center">
                <p className="font-semibold text-lg">
                  Upload Class Result from Excel
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Results;
