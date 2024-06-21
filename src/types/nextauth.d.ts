import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      phone: string;
      email: string;
      role?: string;
      avatar?: string;
      address?: string;
      district?: string;
      fatherName?: string;
      motherName?: string;
      postCode?: string;
    };
    accessToken: string;
    refreshToken: string;
    expireIn: number;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      name: string;
      phone: string;
      email: string;
      role?: string;
      avatar?: string;
      address?: string;
      district?: string;
      fatherName?: string;
      motherName?: string;
      postCode?: string;
    };
    accessToken: string;
    refreshToken: string;
    expireIn: number;
  }
}
