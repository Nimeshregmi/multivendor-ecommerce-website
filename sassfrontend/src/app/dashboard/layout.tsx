// 'use client'
import type { Metadata } from "next";
import { AppSidebar } from "@/components/Dashboard/Header/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import RemoveToken from "@/components/Dashboard/RemoveToken";
import DashBoardNav from "@/components/Dashboard/Header/DashBoardNav";
import {  verifyToken } from "@/utils/TokenManagement";
// import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Nimesh Regmi",
  description: "A ecommerce webiste",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await verifyToken();
  if (!role) {
    return <RemoveToken />;
  }
  return (
    // <div className="bg-sidebar">
    <SidebarProvider className="max-w-[1700px] mx-auto overflow-hidden">
      <AppSidebar roles={role.role} />
      <SidebarInset>
        <DashBoardNav />
        <main className="max-w-screen-2xl mx-auto dark:bg-black bg-slate-300 p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
    // </div>
  );
}
