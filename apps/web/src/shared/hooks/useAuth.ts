import { useContext } from "react";
import { AuthContext } from "@/shared/context/auth";

export const useAuth = () => {
  return useContext(AuthContext);
};
