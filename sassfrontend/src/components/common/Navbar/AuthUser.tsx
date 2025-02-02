import UserDropdown from "@/components/Dashboard/Header/DropdownUser";
import React from "react";
import CartIcon from "./CartIcon";
import FlipOnHover from "@/components/ui/flipOn-hover";
import { getAuthToken } from "@/utils/TokenManagement";
import Link from "next/link";

const AuthUser = async () => {
  const token = await getAuthToken("access_token");
  if (!token) {
    return (
      <div className="flex items-center space-x-5">
        <Link href={'/auth/login'}>
          <FlipOnHover name={"Login"} />
        </Link>
        <Link href={'/auth/registration'}>
          <FlipOnHover name={"Signup"} />
        </Link>
      </div>
    );
  }
  return (
    <>
      <a className="" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-700 ease-in-out"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </a>
      <CartIcon />
      <UserDropdown imageUrl={"/profile.jpg"} />
    </>
  );
};

export default AuthUser;
