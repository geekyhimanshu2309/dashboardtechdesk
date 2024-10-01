import { User } from "firebase/auth";
import { createContext, useMemo, useState } from "react";

import { getCurrentUser, signOutUser, signIn } from "../services";

export type AuthContext = {
  role: string;
  user?: User | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const value = useMemo(() => {
    return {
      role,
      user,
      initialized,
      initialize: async () => {
        try {
          if (initialized) return;
          const currentResponse = await getCurrentUser();
          setRole(currentResponse.roles);
          setUser(currentResponse.user);
          setInitialized(true);
        } catch (error) {
          console.error(error);
        }
      },
      login: async (email: string, password: string) => {
        try {
          setLoading(true);
          const authResponse = await signIn(email, password);
          setRole(authResponse.roles);
          setUser(authResponse.user);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      logout: async () => {
        try {
          await signOutUser();
        } catch (error) {
          console.error(error);
        }
      },
      loading,
    };
  }, [role, user, initialized, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
