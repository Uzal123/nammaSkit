import type { NextPage } from "next";
import AppLayout from "../layouts/applayout";
import { useUserStore } from "../store/auth";
import StudentDashboard from "../components/StudentDashboard";
import AuthLayout from "../layouts/authlayout";
import AdminDashboard from "../adminComponents/adminDashboard";

const Home: NextPage = () => {
  const { user } = useUserStore();
  return (
    <AuthLayout>
      <AppLayout>
        {user.role === "st" ? (
          <StudentDashboard />
        ) : (
          <AdminDashboard />
        )}
      </AppLayout>
    </AuthLayout>
  );
};

export default Home;
