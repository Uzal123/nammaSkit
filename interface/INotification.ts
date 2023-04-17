export enum STATUS {
  Success = "Success",
  Error = "Error",
  Loading = "Loading",
  warning = "Warning",
}

export type Status = `${STATUS}`;

export interface INotification {
  id: string;
  message: string;
  status: Status;
  duration?: number;
}
