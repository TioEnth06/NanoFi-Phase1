import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "user" | "spv";

interface User {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user is already logged in (from localStorage)
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Dummy accounts for testing
  const dummyAccounts: Array<{ email: string; password: string; role: UserRole }> = [
    { email: "demo@nanofi.com", password: "Demo123", role: "user" },
    { email: "test@nanofi.com", password: "Test123", role: "user" },
    { email: "admin@nanofi.com", password: "Admin123", role: "user" },
    { email: "spv@nanofi.com", password: "SPV123", role: "spv" },
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const account = dummyAccounts.find(
      acc => acc.email === email && acc.password === password
    );
    
    if (account) {
      setIsAuthenticated(true);
      const userData: User = { email: account.email, role: account.role };
      setUser(userData);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const signup = async (email: string, password: string, _fullName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingAccount = dummyAccounts.find(acc => acc.email === email);
    if (existingAccount) {
      return false;
    }
    
    // Create new user account and automatically log them in
    setIsAuthenticated(true);
    const userData: User = { email: email, role: "user" };
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Add to dummy accounts for future login
    dummyAccounts.push({ email, password, role: "user" });
    
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

