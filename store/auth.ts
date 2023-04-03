import { create } from "zustand";
import { IUser } from "../interface/IUser";

interface AuthStore {
  user: IUser;
  setUser: (
    token: string,
    id: string,
    email: string,
    firstName: string,
    phone: string,
    role: string
  ) => void;
  removeUser: (center: { lat: number; lng: number }) => void;
}

const useStore = create<AuthStore>((set) => ({
  user: {
    id: "",
    firstName: "",
    email: "",
    phone: "",
    role: "",
  },
  setUser: (
    token: string,
    id: string,
    email: string,
    firstName: string,
    phone: string,
    role: string
  ) => {
    if (token) {
      localStorage.setItem("skit-user-token", token);
    }
    set((state) => ({
      user: {
        ...state,
        phone: phone,
        firstName: firstName,
        email: email,
        id: id,
        role: role,
      },
    }));
  },
  removeUser: () => {
    localStorage.removeItem("skit-user-token");
    set({
      user: {
        id: "",
        firstName: "",
        email: "",
        phone: "",
        role: "",
      },
    });
  },
}));

export const useUserStore = useStore;
