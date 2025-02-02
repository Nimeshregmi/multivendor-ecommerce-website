"use client";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  price?: number;
  quantity?: number;
}
const CheckoutClient = ({ price = 25, quantity = 1 }: Props) => {
  const total = price * quantity;
  const [totalPrice, settotalPrice] = useState<number>(total);
  const [totalquantity, settotalquantity] = useState<number>(1);
  function increment() {
    settotalquantity(totalquantity + 1);
    settotalPrice(totalquantity * price);
  }
  function decrement() {
    if (totalquantity > 1) {
      settotalquantity(totalquantity - 1);
      settotalPrice(totalquantity * price);
    }
  }
  useEffect(()=>{},[totalPrice,totalquantity])
  return (
    <>
      <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
        <div className="flex items-center h-full">
          <button
            onClick={decrement}
            className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
          >
            <Minus />
          </button>
          <input
            type="text"
            className="border-y border-gray-200 outline-none dark:text-white text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] dark:placeholder:text-white placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
            placeholder="1"
            onChange={(e: any) => settotalquantity(e.target.value)}
            value={totalquantity}
          />
          <button
            onClick={increment}
            className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
          >
            <Plus />
          </button>
        </div>
      </div>
      <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600 dark:text-white">
          ${totalPrice}
        </p>
      </div>
    </>
  );
};

export default CheckoutClient;
