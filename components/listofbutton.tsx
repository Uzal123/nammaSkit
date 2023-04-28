import React from "react";

interface listofbuttonProps {
  title: string;
  listOf: string;
  setListOf: React.Dispatch<React.SetStateAction<string>>;
}

interface listofdeptProps {
  deptName: string;
  _id: string;
  currentDept: string;
  setCurrentDept: React.Dispatch<React.SetStateAction<string>>;
}

interface listofsemesterProps {
  semester: number;
  currentSemester: number;
  setCurrentSemester: React.Dispatch<React.SetStateAction<number>>;
}

const ListOfButton: React.FC<listofbuttonProps> = ({
  title,
  listOf,
  setListOf,
  ...props
}) => {
  const isActive = title === listOf;

  if (isActive) {
    return (
      <button className="font-semibold px-3 py-2 hover:bg-gray-200 bg-gray-300 ">
        {title}
      </button>
    );
  }

  return (
    <button
      className=" px-4 hover:bg-gray-200 py-2 border-r-2 hover:rounded-none "
      onClick={() => setListOf(title)}
    >
      {title}
    </button>
  );
};

export default ListOfButton;

export const ListOfDept: React.FC<listofdeptProps> = ({
  deptName,
  currentDept,
  _id,
  setCurrentDept,
  ...props
}) => {
  const isActive = _id === currentDept;

  if (isActive) {
    return (
      <button className="font-semibold px-3 py-2 hover:bg-gray-200 bg-gray-300 ">
        {deptName}
      </button>
    );
  }

  return (
    <button
      className=" px-4 hover:bg-gray-200 py-2 border-r-2 hover:rounded-none "
      onClick={() => setCurrentDept(_id)}
    >
      {deptName}
    </button>
  );
};

export const ListOfSem: React.FC<listofsemesterProps> = ({
  semester,
  currentSemester,
  setCurrentSemester,
  ...props
}) => {
  const isActive = semester === currentSemester;

  if (isActive) {
    return (
      <button className="font-semibold px-3 py-2 hover:bg-gray-200 bg-gray-300 ">
        {"Semester " + semester}
      </button>
    );
  }

  return (
    <button
      className=" px-4 hover:bg-gray-200 py-2 border-r-2 hover:rounded-none "
      onClick={() => setCurrentSemester(semester)}
    >
      {"Semester " + semester}
    </button>
  );
};
