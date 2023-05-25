import type { NextPage } from "next";
import AppLayout from "../layouts/applayout";
import { useUserStore } from "../store/auth";

import AuthLayout from "../layouts/authlayout";
import AdminDashboard from "../adminComponents/adminDashboard";
import StudentLayout from "../layouts/studentlayout";
import StudentDashboard from "../studentComponents/StudentdDashboard";

const Home: NextPage = () => {
  const { user } = useUserStore();
  return (
    <div>
      {user.role === "st" ? (
        <StudentLayout>
          <StudentDashboard />
        </StudentLayout>
      ) : (
        <AuthLayout>
          <AppLayout>
            <AdminDashboard />
          </AppLayout>
        </AuthLayout>
      )}
    </div>
  );
};

export default Home;
