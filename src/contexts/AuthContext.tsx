
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // For testing only - in production this should be replaced with real authentication
    if (email === "admin@example.com" && password === "admin123") {
      setUser({
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        isAdmin: true,
      });
    } else if (email === "user@example.com" && password === "user123") {
      setUser({
        id: 2,
        name: "Regular User",
        email: "user@example.com",
        isAdmin: false,
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
