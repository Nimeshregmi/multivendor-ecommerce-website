import { JSX } from "react";

interface Props {
    children: JSX.Element|string;
    type?: string;
    className?: string;
  }
  const Button = ({ children, type = "submit", className }: Props) => {
    return (
      <div>
        {" "}
        <button
          type={type as "submit" | "reset" | "button" | undefined}
          data-dropdown-toggle="language-dropdown-menu"
          className={`${className} inline-flex transition-colors duration-700 ease-in-out  items-center  w-full font-medium justify-center px-4 py-2 xl:text-xl md:text-lg text-base text-white bg-black   border-2 hover:border-black cursor-pointer hover:bg-white hover:text-black dark:hover:text-black  rounded-xl  `}
        >
          {children}
        </button>
      </div>
    );
  };
  
  export default Button;
  