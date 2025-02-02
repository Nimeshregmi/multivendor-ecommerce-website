"use client";
import LoadinUI from "@/components/common/LoadinUI";
import useGetSingleProducts from "@/hooks/reactQuary/useGetSingleProducts";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import Rating from "../ProductsComponenet/Rating";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  slug: string;
  id: number;
}
const FetchSingleProduct = ({ slug, id }: Props) => {
  const { data, isLoading, isError, error } = useGetSingleProducts({ id });
  const [products, setproducts] = useState({
    name: "Python",
    price: 10,
    image: "/logo/logo.png",
    rating: 0,
    description: "No things",
    stock: 0,
    about: "This is great products.",
    technlogy: ["python", "django"],
  });
  if (isLoading)
    return (
      <div>
        '<LoadinUI />'
      </div>
    );
  // if (error) return <div className="text-black dark:text-white">Error: {error.message}</div>;
  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lgr bg-gray-300 dark:bg-gray-700 mb-4">
                <Image
                  width={999}
                  height={999}
                  className="w-full rounded-lgr h-full object-contain"
                  src={`${products.image}`}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className="md:flex-1 max-md:justify-center max-md:items-center mx-auto px-4">
              <h2 className="text-2xl font-bold  text-gray-800 dark:text-white mb-2">
                {products.name}
              </h2>
              <Rating rating={products.rating} />
              <p className="text-gray-600 font-semibold dark:text-gray-300 text-sm mb-4">
                {products.description}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-xl text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 font-semibold dark:text-gray-300">
                    ${products.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-xl text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600  dark:text-gray-300">
                    {" "}
                    {products.stock}&nbsp;In Stock
                  </span>
                </div>
              </div>
              <div className="flex md:justify-start flex-wrap max-md:flex-col gap-2  max-md:justify-center w-full mb-4">
                <div className=" max-md:max-w-sm ">
                  <button className="w-full bg-green-800  text-white py-2 px-4 rounded-full font-bold hover:bg-green-700 flex gap-2 ">
                    <ShoppingCart />
                    Add to Cart
                  </button>
                </div>
                <div className="max-md:max-w-sm ">
                  <button className="w-full bg-blue-800  text-white  py-2 px-4 rounded-full font-bold hover:bg-blue-700  flex gap-2">
                    <ShoppingBag />
                    Buy now
                  </button>
                </div>
                <div className="max-md:max-w-sm">
                  <button className="w-full bg-red-800 text-white py-2 px-4 rounded-full font-bold hover:bg-red-700 flex gap-2 ">
                    <Heart />
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 text-xl dark:text-gray-300">
                  Tags:
                </span>
                <div className="flex items-center flex-wrap mt-2">
                  {products.technlogy.map((item, i) => (
                    <button
                      key={i}
                      className="bg-gray-300 underline dark:bg-gray-700 text-gray-700 dark:text-white py-1 px-2 rounded-full font-semibold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        <Carousel>
          <CarouselContent className="ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <FetchSingleProduct slug={"hh"} id={5}/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default FetchSingleProduct;
