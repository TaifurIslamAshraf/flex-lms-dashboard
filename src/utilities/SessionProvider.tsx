"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
