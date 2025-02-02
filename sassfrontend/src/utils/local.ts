// Utility to safely access localStorage only on the client
const isBrowser = () => typeof window !== "undefined";

export const getUserInfoFromLocalStorage = () => {
  if (isBrowser()) {
    return {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      full_name: localStorage.getItem("full_name"),
    }
  }
  return null;
};


