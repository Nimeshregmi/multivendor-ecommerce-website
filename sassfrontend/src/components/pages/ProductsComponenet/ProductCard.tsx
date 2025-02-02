import Image from "next/image";
// import { BsCartCheckFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa";
import Rating from "./Rating";

interface Props {
  image?: string;
  title?: string;
  rating?: number;
  price?: number;
  id?: number;
  categories?: boolean;
  vendor?: boolean;
  downloaded?: number;
  vendorCategories?: string[];
}
const testVendorCategory = ["python", "javascript", "java"];
const ProductCard = ({
  image = "/logo/logo.png",
  price = 220,
  rating = 4.7,
  title = "Python",
  id = 1,
  categories = false,
  vendor = false,
  downloaded = 225,
  vendorCategories = testVendorCategory,
}: Props) => {
  const fullhref = `${
    categories
      ? "catagory/" + title.toLowerCase()
      : vendor
      ? "vendor/" + title.toLowerCase()
      : "products/" + title.toLowerCase() + "/" + id
  }`;

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="  bg-white bg-opacity-50   bg-clip-padding backdrop-filter backdrop-blur-lg  border border-gray-100 shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-200">
          <a href="#">
            <Image
              width={900}
              height={900}
              loading="lazy"
              className="rounded-t-lg p-8 hover:scale-110 transition-all ease-in-out duration-700"
              src={`${image}`}
              alt={title}
            />
          </a>
          <div className="px-5 pb-5">
            <a href={`${fullhref}`}>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                {title}
              </h3>
            </a>
            <Rating rating={rating} />
            {!categories && !vendor && (
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${price}
                </span>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="text-white bg-blue-700 transition-all ease-in-out duration-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {/* <BsCartCheckFill /> */}
                  </a>
                  <a
                    href="#"
                    className="text-white transition-all ease-in-out duration-700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {/* <FaHeart /> */}
                  </a>
                </div>
              </div>
            )}
            {vendor && (
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold flex flex-wrap text-center text-gray-900 dark:text-white">
                  Popular Category :{" "}
                  {vendorCategories.map((item, i) => (
                    <a
                      key={i}
                      className="underline text-red-600 hover:underline  text-md"
                      href={`/catagory/${item.toLowerCase()}`}
                    >
                      {item},&nbsp;
                    </a>
                  ))}
                </span>
              </div>
            )}
            {categories && (
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Product Downloaded :{downloaded.toString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
