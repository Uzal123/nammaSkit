import React from "react";

interface listofbuttonProps {
  title: string;
  listOf: string;
  setListOf: React.Dispatch<React.SetStateAction<string>>;
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
    <button className=" px-4 hover:bg-gray-200 py-2 border-r-2 hover:rounded-none " onClick={() => setListOf(title)}>
      {title}
    </button>
  );
};

export default ListOfButton;
