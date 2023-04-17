import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { client } from "../graphql/client";
import { ApolloProvider, useQuery } from "@apollo/client";
import { useEffect } from "react";
import ME from "../graphql/query/me";
import { useUserStore } from "../store/auth";
import { useRouter } from "next/router";
import { useNotificationStore } from "../store/notification";
import PopUpNotification from "../components/popupnotification";

function MyApp({ Component, pageProps }: AppProps) {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const { notifications, setNotification } = useNotificationStore(
    (state) => state
  );
  const router = useRouter();

  //   const { data, loading, error } = useQuery(ME);

  const loadUser = async () => {
    try {
      const res = await client.query({ query: ME });
      if (res.data?.me?.["success"]) {
        const user = res.data.me["user"];
        setUser(
          user.accessToken,
          user._id,
          user.phone,
          user.firstName,
          user.email,
          user.role
        );
      }
    } catch (error) {
      router.push("/login");
    }
  };

  //   useEffect(() => {
  //     if (data?.me?.["success"]) {
  //       const user = data.me["user"];
  //       setUser(
  //         user.accessToken,
  //         user._id,
  //         user.phone,
  //         user.firstName,
  //         user.email,
  //         user.role
  //       );
  //     }
  //     if (data?.me?.["success"] == false) {
  //       router.push("/login");
  //     }
  //   }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUser();
    }
  }, [typeof window !== "undefined"]);

  useEffect(() => {}, [user]);
  return (
    <ApolloProvider client={client}>
      <PopUpNotification notifications={notifications} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
