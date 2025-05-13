"use server";

import api from "@/lib/axiosInstance";
import { TLoginData, TRegisterData } from "@/types/auth";
import { cookies } from "next/headers";

export const loginService = async (payload: TLoginData) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    const cookieStore = await cookies();
    cookieStore.set("token", data?.data?.token);
    return data?.data?.user;
  } catch (error) {
    console.log(error);
  }
};

export const registerService = async (payload: TRegisterData) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    const cookieStore = await cookies();
    cookieStore.set("token", data?.data?.token);
    return {
      user: data?.data?.user,
      customer: data?.data?.customer,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserService = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return {
      user: data?.data?.user,
      customer: data?.data?.customer,
    };
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    path: "/",
    expires: new Date(0),
  });
};
