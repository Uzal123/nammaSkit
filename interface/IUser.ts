import { ROLES } from "../assets/roles";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  phone: string;
  role: ROLES | string;
}
