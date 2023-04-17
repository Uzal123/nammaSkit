import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import LOGIN from "../../graphql/mutation/login.";
import { useUserStore } from "../../store/auth";
import { useRouter } from "next/router";
import { useNotificationStore } from "../../store/notification";
import { v4 as uuidv4 } from "uuid";

const LoginPage = () => {
  const [loginInput, setLoginInput] = useState({ phone: "", password: "" });

  const router = useRouter();

  const user = useUserStore((state: { user: any }) => state.user);
  const setUser = useUserStore((state: { setUser: any }) => state.setUser);

  const { setNotification } = useNotificationStore((state: any) => state);

  const handleString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const key = e.target.name;
    setLoginInput((prevs) => ({ ...prevs, [key]: val }));
  };

  const handleFloat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const key = e.target.name;
    setLoginInput((prevs) => ({ ...prevs, [key]: val }));
  };
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(loginInput);
      if (!loading) {
        login({
          variables: loginInput,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.login?.["success"] && !loading) {
      const user = data.login["user"];
      setUser(
        user.accessToken,
        user._id,
        user.phone,
        user.firstName,
        user.email,
        user.role
      );
      setNotification({
        id: uuidv4(),
        message: "Logged in successfully",
        status: "Success",
        duration: 3000,
      });
    }
    if (data?.login?.success == false) {
      setNotification({
        id: uuidv4(),
        message: data.login.message,
        status: "Error",
        duration: 3000,
      });
    }
  }, [data]);

  useEffect(() => {
    if (user.id) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={loginInput.phone}
                  onChange={(e) => handleFloat(e)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={loginInput.password}
                  onChange={(e) => handleString(e)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
