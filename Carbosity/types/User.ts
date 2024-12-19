import { Email } from './Email';
import { Role } from './Role';

export interface User {
    token: string;
    id: string; // UUID
    email: Email;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    roles: Role[];
}