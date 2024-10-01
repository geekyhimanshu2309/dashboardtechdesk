import React from "react";
import { Filter, TextInput } from "react-admin";

const UserFilter: React.FC = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="first_name" alwaysOn className="w-full" />
  </Filter>
);

export default UserFilter;
