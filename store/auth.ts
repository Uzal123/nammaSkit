import { create } from "zustand";
import { IUser } from "../interface/IUser";
import { ROLES } from "../assets/roles";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser;
  setUser: (
    token: string,
    id: string,
    email: string,
    firstName: string,
    phone: string,
    role: ROLES
  ) => void;
  removeUser: () => void;
  setAuthenticatedUser: () => void;
}

const useStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
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
      isAuthenticated: true,
      isLoading: false,
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
    set((state) => ({
      isAuthenticated: false,
      isLoading: false,
      user: {
        id: "",
        firstName: "",
        email: "",
        phone: "",
        role: "",
      },
    }));
  },
  setAuthenticatedUser: () => {
    set((state) => ({
      isAuthenticated: false,
      isLoading: false,
    }));
  },
}));

export const useUserStore = useStore;
