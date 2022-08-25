import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createHttpLink  } from "@apollo/client";
import { setContext } from "apollo-link-context";

const headersContext = setContext((_, { headers }) => {
    return {
        headers : {
            "Access-Control-Allow-Origin": "https://countries.trevorblades.com",
            "Content-Type": "application/json",
        },

    }
})

const Apolloclient = new ApolloClient({
    uri: "https://api.vrmarketing.guru",
    cache: new InMemoryCache(),
});

export default Apolloclient;
