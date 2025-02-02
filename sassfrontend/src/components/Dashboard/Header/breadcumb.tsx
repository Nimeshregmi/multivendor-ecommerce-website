"use client"; // This component runs on the client side

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbComponent() {
  const pathname = usePathname(); // Get the current path
  const segments = pathname
    .replace("/dashboard", "") // Remove the /dashboard prefix
    .split("/") // Split into segments
    .filter(Boolean); // Remove empty values

  return (
    <Breadcrumb className="text-sm flex items-center ">
      {/* Root breadcrumb */}
      <BreadcrumbItem>
        <BreadcrumbLink href="" className="disabled:opacity-50">
          dashboard
        </BreadcrumbLink>
        {segments.length > 0 && <span>&gt;</span>}
      </BreadcrumbItem>

      {/* Dynamic breadcrumbs */}
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
        const displayName = segment === "past-view" ? "Past View" : segment;

        return (
          <BreadcrumbItem key={index} className="flex items-center">
            <BreadcrumbLink
              href={isLast ? undefined : href}
              aria-current={isLast ? "page" : undefined}
              className={`${
                isLast ? "" : "hover:text-blue-900 hover:font-bold"
              }`}
            >
              {displayName}
            </BreadcrumbLink>
            {!isLast && <span>&gt;</span>}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
