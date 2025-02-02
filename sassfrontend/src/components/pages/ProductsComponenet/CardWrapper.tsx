import { ArrowRight } from "lucide-react";
import React from "react";
interface Props {
  title: string;
  children: React.ReactNode;
  href?: string;
}
const CardWrapper = ({ title, children, href }: Props) => {
  const lastWord = title.trim().split(/\s+/).pop();
  return (
    <div >
      <div className=" my-5 mx-4 flex justify-between">
        <h1 className="text-4xl  font-bold dark:text-white text-black ">{title}</h1>
        <a
          href={`${href}`}
          className="float-right mr-2 px-2 py-1 items-center  rounded-mdr  flex text-white dark:text-black font-bold bg-black dark:bg-white "
        >
          View all {lastWord} <ArrowRight />
        </a>
      </div>

      <div className=" mx-4 grid xl:grid-cols-4 grid-cols-2 gap-4 ">{children}</div>
    </div>
  );
};

export default CardWrapper;
