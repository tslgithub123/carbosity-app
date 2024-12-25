import { Email } from "./Email";

export interface Credentials {
    emailAddress: Email["emailAddress"];
    password: string;
}