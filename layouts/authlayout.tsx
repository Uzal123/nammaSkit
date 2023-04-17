import { FC, Fragment, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Router, { withRouter, useRouter } from "next/router";
import { useUserStore } from "../store/auth";

const AuthLayout = ({ ...props }) => {
  const { setUser, isLoading, isAuthenticated } = useUserStore(
    (state) => state
  );

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="h-screen bg-bgColor w-full flex flex-col justify-center items-center">
        <div className={`flex flex-col justify-center  items-center space-y-4`}>
          Initializing please wait...
        </div>
      </div>
    );
  }
  if (!isLoading && isAuthenticated) {
    return <Fragment>{props.children}</Fragment>;
  }
  // todo: change / to /login
  router.push("/login");
  return <Fragment></Fragment>;
};

export default AuthLayout;
