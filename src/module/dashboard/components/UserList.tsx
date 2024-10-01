import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  FunctionField,
} from "react-admin";
import UserFilter from "./UserFilter";

const formatPhoneNumber = (
  phoneNumber: string | null | undefined
): string => {
  if (!phoneNumber) {
    return "";
  }
  
  let cleaned = phoneNumber.replace(/\s+/g, "");

  if (cleaned.startsWith("+971")) {
    cleaned = cleaned.replace(/^(\+971)(\d+)/, "$1 $2");
  } else if (cleaned.startsWith("+91")) {
    cleaned = cleaned.replace(/^(\+91)(\d+)/, "$1 $2");
  }

  cleaned = cleaned.replace(
    /(\+971 \d{1})(\d{3})(\d{3})(\d{4})/,
    "$1 $2 $3 $4"
  );

  return cleaned;
};


const UserList: React.FC = (props) => (
  <List actions={false} {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" />
      <FunctionField
        label="Phone Number"
        render={(record: { phone_number: string }) =>
          formatPhoneNumber(record.phone_number)
        }
      />
    </Datagrid>
  </List>
);

export default UserList;
