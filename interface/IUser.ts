import {Roles} from "../assets/roles";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  phone: string;
  role?: Roles;
}
