"use server"
import { cookies } from "next/headers";

/** Check whether cookie exist given key */
async function hasCookie(key: string): Promise<boolean> {
  const cookieStore = await cookies();

  return cookieStore.has(key);
}

/** Get player token, generate if the token does not exist */
export async function getOrCreateCookie(key: string): Promise<string> {
  const cookieStore = await cookies();

  let token = cookieStore.get(key)?.value;

  if (!token) {
    token = crypto.randomUUID();

    cookieStore.set(key, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1
    });
  }

  return token;
}