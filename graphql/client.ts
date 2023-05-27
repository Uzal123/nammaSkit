import {
    setContext
} from "@apollo/client/link/context";
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import {
    createUploadLink
} from "apollo-upload-client";

const authLink = setContext((_, {
    headers
}) => {
    let token;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("skit-user-token");
    }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,

            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});


const httpLink = createUploadLink({
    uri: "http://ec2-65-2-83-47.ap-south-1.compute.amazonaws.com/api",
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
});