"use server";
import { cookies } from "next/headers";

export async function setAuthToken(key: string,token: string) {
  (await cookies()).set(key, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
    priority: 'high',
    // sameSite: process.env.NODE_ENV === "production"?'strict' : 'none' //use this when hosting on same domain and subdomain
  });
}

export async function getAuthToken(key: string): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get(key)?.value;

  if (!token) {
    return null;
  }
  if (!isValidToken(token)) {
    return null;
  }

  return token;
}

function isValidToken(token: string): boolean {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtRegex.test(token);
}

// "use server";
export async function removeAuthToken(key: string) {
  const cookieStore = cookies();
  (await cookieStore).delete(key);
}

interface UserData {
  username: string;
  email: string;
  role: string;
}
export async function verifyToken(): Promise<UserData | null> {
  const access_token = await getAuthToken("access_token");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/token/verify/`,
      {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: access_token }),
      }
    );

    if (response.ok) {
      const data: UserData = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

