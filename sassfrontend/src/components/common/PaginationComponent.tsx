"use client";
import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
// import { PaginationContent } from '../ui/pagination';
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  href: string;
}

const CustomPagination: React.FC<PaginationProps> =  ({ totalPages, href }) => {
  const param =  useSearchParams();
  const currentPage = Number(param.get("page"));
  // Define page range
  const pageRange = 2;

  // Generate page numbers
  const startPage = Math.max(0, currentPage - pageRange);
  const endPage = Math.min(totalPages - 1, currentPage + pageRange);

  // Generate pagination items
  const pages = [];
  if (startPage > 0) {
    pages.push(
      <PaginationItem key="ellipsis-start">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink
          className={`text-black dark:text-white rounded-xl ${
            i === currentPage ? "border-2 bg-white/15" : ""
          }`}
          href={`${href}/?page=${i}`}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (endPage < totalPages - 1) {
    pages.push(
      <PaginationItem key="ellipsis-end">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`text-black dark:text-white ${
              currentPage === 0 ? "opacity-50 " : ""
            }`}
            href={`${href}/?page=${Math.max(currentPage - 1, 0)}`}
            onClick={(e) => {
              if (currentPage === 0) {
                e.preventDefault();
              }
            }}
          />
        </PaginationItem>

        {pages}

        <PaginationItem>
          <PaginationNext
            className={`text-black dark:text-white ${
              currentPage === totalPages - 1 ? "opacity-50 " : ""
            }`}
            href={`${href}/?page=${Math.min(currentPage + 1, totalPages - 1)}`}
            onClick={(e) => {
              if (currentPage === totalPages - 1) {
                e.preventDefault();
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
