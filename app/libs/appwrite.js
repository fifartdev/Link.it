import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

export const account = new Account(client);
