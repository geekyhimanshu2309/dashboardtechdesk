import React from "react";
import { Resource } from "react-admin";
import UserList from "../components/UserList";

const Home: React.FC = () => {
  return (
    <Resource name="user" list={UserList}/>
  );
};

export default Home;