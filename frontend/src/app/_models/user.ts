// export class User {
//     id: string;
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     token: string;
// }

import { Role } from "./role";

export class User {
    id: number;
    email: String;
    name: string;
    phone: number;
    text: string;
    createdDate: Date
    // lastName: string;
    username: string;
    role: Role;
    token?: string;
}