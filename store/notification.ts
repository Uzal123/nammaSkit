import { create } from "zustand";
import { INotification } from "../interface/INotification";

interface NotificationState {
  notifications: INotification[];
  removeNotification: (id: string) => void;
  setNotification: (notification: INotification) => void;
}

export const useStore = create<NotificationState>((set) => ({
  notifications: [],
  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((item) => item.id != id),
    }));
  },
  setNotification: ({
    id,
    message,
    duration = 3000,
    status,
  }: INotification) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id,
          message,
          status,
        },
      ],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((item) => item.id != id),
      }));
    }, duration);
  },
}));

export const useNotificationStore = useStore;

export default useStore;
