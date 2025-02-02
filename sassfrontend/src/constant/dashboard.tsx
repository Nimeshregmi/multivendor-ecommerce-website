import { Home, Settings2, User } from "lucide-react";

export const clientAdmin = [
  {
    slug: "admin",
    sidebar: [
      {
        title: "Dashboard",
        url: "user",
        icon: Home,
        isActive: true,
      },
      {
        title: "Profile",
        url: "profile",
        icon: User,
      },
    ],
  },
  {
    slug: "buyer",
  },
  {
    slug: "seller",
  },
];
