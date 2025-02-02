'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
interface NavbarPathProps {
  href: string;
  classname?: string;
  title: string;
}
const NavPath = ({ href, classname, title }: NavbarPathProps) => {
    const path = usePathname();
  return (
    <>
    <li>
      <Link
        className={`dark:hover:text-gray-200 group font-bold  transition-all ease-in-out duration-700 ${classname}`}
        href={`${href}`}
      >
        {title}
        <div
          className={`${
            path == href ? "w-full" : "w-0"
          } transition-all ease-in-out duration-700 group-hover:w-full  h-1 rounded-lg dark:bg-white bg-gray-700`}
        />
      </Link>
    </li>
    </>
  )
}

export default NavPath