"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { TCustomerData, TUserData } from "@/types/auth";
import { getCurrentUserService } from "@/services/AuthService";

interface AuthContextType {
  user: TUserData | null;
  customer: TCustomerData | null;
  setUser: (user: TUserData | null) => void;
  setCustomer: (customer: TCustomerData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserData | null>(null);
  const [customer, setCustomer] = useState<TCustomerData | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getCurrentUserService();
        if (response) {
          const { user, customer } = response;
          setUser(user);
          setCustomer(customer);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        setUser,
        setCustomer,
      }}
    >
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
