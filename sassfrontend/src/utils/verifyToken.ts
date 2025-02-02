import { getAuthToken } from "./TokenManagement";

interface UserData {
  username: string;
  email: string;
  role: string;
}
// utils/auth.js
export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.access; 
    } else {
      return null; 
    }
  } catch (error) {
    return null;
  }
}
