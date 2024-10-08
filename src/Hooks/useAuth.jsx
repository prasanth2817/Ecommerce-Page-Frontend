import { useContext } from "react";
import { AuthDataContext } from "../Context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthDataContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};