// dependencies
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import buildHasuraProvider from "ra-data-hasura";

/**
 * A function to retrieve the Firebase authentication token for the currently logged-in user.
 *
 * @returns A Promise that resolves with the user's token as a string, or rejects with an error message if no user is logged in.
 */
export const getToken = () => {
  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const userToken = await user.getIdToken(true);
        console.log(userToken);
        resolve(userToken);
      } else {
        reject("No user is logged in");
      }
    });
  });
};

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_SCHEMA_PATH,
});

/**
 * @ignore
 * A constant representing an Apollo Link that sets the Authorization header with a Firebase token.
 * The token is fetched using the `getToken` function.
 */
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken().catch((error) => {
    console.error("Error fetching token:", error);
    return null;
  });

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/**
 * @ignore
 * An object representing the Apollo Client options with the authentication link included.
 */
const clientOptionsWithAuth = {
  link: authLink.concat(httpLink),
};

/**
 * @ignore
 * A data provider for the React-Admin application, using the Hasura GraphQL API.
 * The client options include the authentication link.
 */
const dataProvider = buildHasuraProvider({
  clientOptions: clientOptionsWithAuth,
});

export default dataProvider;
