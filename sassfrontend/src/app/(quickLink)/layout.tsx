import type { Metadata } from "next";
import { Footer, NavBar } from "@/components";

export const metadata: Metadata = {
  title: "Nimeshregmi",
  description: "DASHboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <div> {children}</div>
      <Footer />
    </div>
  );
}
