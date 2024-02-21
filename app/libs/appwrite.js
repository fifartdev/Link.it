import { Client, Account, Functions, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);
export const DB = process.env.NEXT_PUBLIC_DB_ACCOUNT_ID;
export const COL_ACCOUNT = process.env.NEXT_PUBLIC_COL_ACCOUNT_PROFILE_ID;
export const account = new Account(client);
export const functions = new Functions(client);
export const db = new Databases(client);
export { ID, Query } from "appwrite";
