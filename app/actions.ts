"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { delay } from "@/lib/utils";

export async function getUser() {
  const cookieStore = await cookies();

  return {
    uid: cookieStore.get("chatapp:uid")?.value,
    name: cookieStore.get("chatapp:user")?.value,
    loggedIn: cookieStore.has("chatapp:uid") && cookieStore.has("chatapp:user"),
  };
}

export async function createUser(prevState: any, formData: FormData) {
  const username = String(formData.get("username")).trim();

  if (!username) {
    await delay(200);
    return {
      success: false,
      message: "Por favor, digite seu nome de usuário",
    };
  }

  if (username.length < 3) {
    await delay(200);
    return {
      success: false,
      message: "O usuário deve ter pelo menos 3 caracteres",
    };
  }

  await delay();
  const cookieStore = await cookies();
  cookieStore.set("chatapp:uid", uuidv4(), { maxAge: 60 * 60 * 72 });
  cookieStore.set("chatapp:user", username, { maxAge: 60 * 60 * 72 });
}
