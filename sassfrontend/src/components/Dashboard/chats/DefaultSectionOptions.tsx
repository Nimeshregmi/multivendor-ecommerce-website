import React, { useState } from "react";
import ClickOutside from "../Header/ClickOutside";

const DefaultSelectOption = ({ options }: any) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <ClickOutside onClick={() => setIsOpen(false)}>
      <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded border border-gray-300 bg-white text-sm font-medium outline-none dark:border-gray-600 dark:bg-gray-800">
      <div
        className={`py-1.5 pl-3 pr-10 text-sm font-medium text-gray-900 dark:text-white ${
          isOpen ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <span className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            className="fill-current text-gray-500 dark:text-gray-400"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.32293 6.38394C3.5251 6.14807 3.88021 6.12075 4.11608 6.32293L9.00001 10.5092L13.8839 6.32293C14.1198 6.12075 14.4749 6.14807 14.6771 6.38394C14.8793 6.61981 14.8519 6.97492 14.6161 7.17709L9.36608 11.6771C9.15543 11.8576 8.84459 11.8576 8.63394 11.6771L3.38394 7.17709C3.14807 6.97492 3.12075 6.61981 3.32293 6.38394Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-full rounded border border-gray-300 bg-white py-1.5 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:shadow-gray-700/50">
          <ul>
            {options.map((option: string, index: number) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`flex w-full cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-left font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${
                  selectedOption === option ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </ClickOutside>
  );
};

export default DefaultSelectOption;
