import type { NextPage } from "next";
import AppLayout from "../layouts/applayout";
import { useUserStore } from "../store/auth";
import StudentDashboard from "../components/StudentDashboard";
import AuthLayout from "../layouts/authlayout";
import {ROLES, Roles} from "../assets/roles";

const Home: NextPage = () => {
  const { user } = useUserStore();
  return (
    <AuthLayout>
      <AppLayout>
        {user.role === ROLES.Admin ? (
          <StudentDashboard />
        ) : (
          <div>Admin Dashboard</div>
        )}
      </AppLayout>
    </AuthLayout>
  );
};

export default Home;
