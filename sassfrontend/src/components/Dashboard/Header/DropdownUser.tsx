"use client";

import { LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUserInfoFromLocalStorage } from "@/utils/local";
import Link from "next/link";
import { removeAuthToken } from "@/utils/TokenManagement";
import { useEffect, useState } from "react";

interface UserDropdownProps {
  imageUrl: string;
}
export interface User {
  username: string | null;
  email: string | null;
  role: string | null;
  full_name: string | null;
}
export default function UserDropdown({ imageUrl }: UserDropdownProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  if (!user) {
    return (
      <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none">
          <Avatar>
            <AvatarImage src={imageUrl} alt={user.full_name || "User"} />
          </Avatar>
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {user.username||"User"}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] mr-2 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0">
        <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
          <Avatar className="h-10 w-10">
            <AvatarImage src={imageUrl} alt={user.full_name || "User"} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm  text-gray-800 dark:text-white font-bold">
              {user.username || "User"}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {user.full_name || "User"}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {user.email || "user@gmail.com"}
            </span>
          </div>
        </div>
        <div className="p-1">
          <Link href="/dashboard/profile">
            <DropdownMenuItem className="flex font-bold items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-white">
              <User className="h-4 w-4" />
              View profile
            </DropdownMenuItem>
          </Link>
          <Link href={"/dashboard/profile"}>
            <DropdownMenuItem className="flex font-bold items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-white">
              <Settings className="h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="bg-gray-200 dark:bg-black h-[1px]" />
          <DropdownMenuItem
            className="flex font-bold items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-white"
            onClick={LogoutUser}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function LogoutUser() {
  localStorage.clear();
  await removeAuthToken("access_token");
  await removeAuthToken("refresh_token");
  window.location.href = "/";
}
