export enum ROLES {
  "Admin" = "ad",
  "HOD" = "hod",
  "Faculty" = "fa",
  "Student" = "st",
  "Proctor" = "pr",
}


export type Roles = keyof typeof ROLES;

