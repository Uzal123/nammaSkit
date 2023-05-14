import type { NextPage } from "next";
import AppLayout from "../layouts/applayout";
import { useUserStore } from "../store/auth";
import StudentDashboard from "../components/StudentDashboard";
import AuthLayout from "../layouts/authlayout";
import AdminDashboard from "../adminComponents/adminDashboard";

const Home: NextPage = () => {
  const { user } = useUserStore();
  return (
    <div>
      {user.role === "st" ? (
        <h1>Ram Ram</h1>
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
