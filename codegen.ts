import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    "http://localhost:8080/v1/graphql": {
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey",
      },
    },
  },
  documents: ["src/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagname: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
