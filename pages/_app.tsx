import "../styles/globals.css";
import type { AppProps } from "next/app";
import { client } from "../graphql/client";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import ME from "../graphql/query/me";

function MyApp({ Component, pageProps }: AppProps) {
  const loadUser = async () => {
    try {
      const res = await client.query({ query: ME });
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadUser();
    }
  }, [typeof window !== "undefined"]);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
