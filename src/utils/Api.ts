import { baseUrl } from "./constants";
import { getCookie } from "./utils";

export const getServOrderRequest = async (orderId: number) => {
  return await fetch(`${baseUrl}orders`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({ ingredients: orderId }),
  });
};

export const getBurgerDataRequest = async () => {
  return await fetch(`${baseUrl}ingredients`);
};

//forgot-password

export const getForgotPass = async (forgotEmail: string) => {
  return await fetch(`${baseUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: forgotEmail }),
  });
};

//reset-password

export const getResetPass = async (resetToken: string, resetPass: string) => {
  return await fetch(`${baseUrl}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password: resetPass, token: resetToken }),
  });
};

//Regitstration
export const getUserRegister = async (
  userName: string,
  userEmail: string,
  userPassword: string
) => {
  return await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
      name: userName,
    }),
  });
};

export const getUserAuthorization = async (
  userEmail: string,
  userPassword: string
) => {
  return await fetch(`${baseUrl}auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });
};

export const logoutRequest = async (token: string) => {
  return await fetch(`${baseUrl}auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: token }),
  });
};

export const getUserRequest = async () => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const updateUserDataRequest = async (
  email: string,
  password: string,
  name: string
) => {
  return await fetch(`${baseUrl}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const updateUserTokenRequest = async () =>
  await fetch(`${baseUrl}auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: localStorage.getItem("refreshToken"),
  });
