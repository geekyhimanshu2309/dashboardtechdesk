import React from "react";
import { Admin, CustomRoutes } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { FirebaseAuthProvider, RAFirebaseOptions } from "react-admin-firebase";
import "./styles/index.css";
import { firebaseConfig } from "../src/firebase";
import dataProvider from "../src/utils/client";
import AuthPage from "../src/module/auth/screens/Login";
import Dashboard from "../src/module/dashboard/screens/Dashboard";

const App: React.FC = () => {
  const options: RAFirebaseOptions = {
    rootRef: "root-collection/some-doc",
    logging: false,
  };

  const authProvider = FirebaseAuthProvider(firebaseConfig, options);

  console.log("data provider passed successfully", dataProvider);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Admin
        loginPage={AuthPage}
        authProvider={authProvider}
        dataProvider={dataProvider}
        requireAuth
        defaultTheme="light"
      >
        <CustomRoutes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </CustomRoutes>
      </Admin>
    </BrowserRouter>
  );
};

export default App;
