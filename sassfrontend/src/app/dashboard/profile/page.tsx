"use client";

import { AccountInfo } from "@/components/Dashboard/profile/account-info";
import ContactInfo from "@/components/Dashboard/profile/contact-information";
import { PersonalInfo } from "@/components/Dashboard/profile/personal-info";
import { UserInfo } from "@/components/Dashboard/profile/user-info";
import { UserProfile } from "@/components/Dashboard/profile/user-profile";
import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
// import { Button } from "react-day-picker";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    dpName: "Ek Kadam",
    boid: "0000925646",
    accountStatus: "ACTIVE",
    boSubStatus: "INDIVIDUAL-RESIDENT",
    confirmationWaived: "Yes",
    gender: "M",
    dateOfBirth: "20012-09-24",
    citizenshipNumber: "3-01277-2020",
    panNumber: "N/A",
    accountOpenDate: "2021-11-23",
    contactNumber: " 980000000",
    address: "kathmandu-5,  NEPAL",
    avatar:
      "https://th.bing.com/th/id/R.36a637acd327c76357628dca25f838de?rik=KEv28AfFiyqYjA&pid=ImgRaw&r=0",
    backgroundImage:
      "https://th.bing.com/th/id/OIP.RUDkZbfyN5-fzOzROPcwAwHaEK?rs=1&pid=ImgDetMain",
    role: "Software Developer",
    location: "Kathmandu, Nepal",
  });

  const handleUpdate = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    // Here you would typically make an API call to update the user data
    console.log(`Updated ${field} to ${value}`);
  };
  const handleUserUpdate = (field: "name" | "email", value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  return (
    <>
      <div className="min-h-screen bg-sidebar">
        <div className="relative h-80 w-full">
          <img
            src={user.backgroundImage}
            alt="Profile background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-24 flex flex-col items-center">
            {/* <Avatar className="h-48 w-48 border-4 rounded-full border-white shadow-lg">
              <AvatarImage
                src={user.avatar}
                className="rounded-full"
                alt={user.name}
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar> */}
            <h1 className="mt-1 text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-white">{user.role}</p>
            <p className="text-white ">johndoe@gmail.com</p>
          </div>
          <div className="container mx-auto px-4 py-8">
            {/* <UserProfile user={user} onUpdate={handleUpdate} /> */}
            <div className="pt-8 grid gap-8 md:grid-cols-2">
              <div className="">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="mb-4 text-xl font-semibold">
                      User Information
                    </h2>
                    <UserInfo user={user} onUpdate={handleUserUpdate} />
                  </CardContent>
                </Card>
                
              </div>
              <AccountInfo user={user} />
              <PersonalInfo user={user} />
              <ContactInfo user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
