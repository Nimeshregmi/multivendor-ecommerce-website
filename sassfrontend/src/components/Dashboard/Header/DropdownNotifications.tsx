"use client";

const notificationList = [
  {
    image: "/images/user/user-15.png",
    title: "Piter Joined the Team!",
    subTitle: "Congratulate him",
  },
  {
    image: "/images/user/user-02.png",
    title: "New message received",
    subTitle: "Devid sent you new message",
  },
  {
    image: "/images/user/user-26.png",
    title: "New Payment received",
    subTitle: "Check your earnings",
  },
  {
    image: "/images/user/user-28.png",
    title: "Jolly completed tasks",
    subTitle: "Assign her newtasks",
  },
  {
    image: "/images/user/user-27.png",
    title: "Roman Joined the Team!",
    subTitle: "Congratulate him",
  },
];

import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  title: string;
  subTitle: string;
  image: string;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
  unreadCount?: number;
}

export default function NotificationDropdown({
  notifications = notificationList,
  unreadCount = 5,
}: NotificationDropdownProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            // className="relative w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-800"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-gray-2 text-ddark mr-4 hover:text-dprimary dark:border-ddark-4 dark:bg-ddark-3 dark:text-white dark:hover:text-white"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[320px] bg-white dark:bg-[#1E2330] border-gray-200 dark:border-gray-700 p-0 shadow-lg"
          align="end"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {unreadCount} new
              </span>
            )}
          </div>
          <ScrollArea className="h-[300px]">
            <div className="px-1 py-2">
              {notifications.map((notification,index) => (
                <button
                  key={index}
                  className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={notification.image} />
                    <AvatarFallback>{notification.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.subTitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className="w-full text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              See all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
