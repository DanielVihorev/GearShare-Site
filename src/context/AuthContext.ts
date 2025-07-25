import { createContext } from "react";
import type { User } from "firebase/auth";

// Define the shape of the context value
export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

// Create and EXPORT the context so the hook and provider can use it
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});
