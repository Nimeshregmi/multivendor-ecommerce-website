import React from "react";
import {  ProductCard } from "@/components";


const allproducts = () => {
  return (
    <div>
      <div className="my-5 mx-5">
          <h1 className="text-4xl my-5 font-bold dark:text-white text-black ">
            All Products
          </h1>
          <div className=" mx-4 grid xl:grid-cols-4 grid-cols-2 gap-4 ">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
    </div>
  );
};

export default allproducts;
