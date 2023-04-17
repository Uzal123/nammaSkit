import React from "react";
import AuthLayout from "../../layouts/authlayout";
import AppLayout from "../../layouts/applayout";

const AddNewStudent = () => {
  return (
    <AuthLayout>
      <AppLayout>
        <div className="w-full h-full">
          <h1>Add New Student</h1>
        </div>
      </AppLayout>
    </AuthLayout>
  );
};

export default AddNewStudent;
