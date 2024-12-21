"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { delay } from "@/lib/utils";

export async function getSession() {
  const cookieStore = await cookies();

  return {
    loggedIn: cookieStore.has("chatapp"),
    session: JSON.parse(cookieStore.get("chatapp")?.value || "{}"),
  };
}

export async function createSession(prevState: any, formData: FormData) {
  const username = String(formData.get("username")).trim();

  if (!username) {
    await delay();
    return {
      success: false,
      message: "Por favor, digite seu nome de usuário",
    };
  }

  if (username.length < 3) {
    await delay();
    return {
      success: false,
      message: "O usuário deve ter pelo menos 3 caracteres",
    };
  }

  await delay(2000);
  const cookieStore = await cookies();
  cookieStore.set({
    name: "chatapp",
    value: JSON.stringify({
      uid: uuidv4(),
      user: username,
    }),
    // maxAge: 300,
    maxAge: 3600 * 24,
  });
}
