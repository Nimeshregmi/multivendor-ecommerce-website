import CheckoutClient from "./CheckoutClient";

interface Props {
  image?: string;
  name?: string;
  categories?: string;
  price?: number;
  quantity?: number;
}
const IndividualProduct = ({
  image,
  name = "Rose Petals Divine",
  categories = "Perfumes",
  price = 25,
  quantity = 1,
}: Props) => {
  return (
    <>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
        <div className="w-full md:max-w-[126px]">
          <img
            src="https://pagedone.io/asset/uploads/1701162850.png"
            alt={`${name ? name : "Image"}`}
            className="mx-auto rounded-xl object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
          <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
              <h6 className="font-semibold text-base leading-7 dark:text-white text-black">
                {name}
              </h6>
              <h6 className="font-normal text-base leading-7 dark:text-white text-gray-500">
                {categories}
              </h6>
              <h6 className="font-medium text-base leading-7 dark:text-white text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                ${price}
              </h6>
            </div>
          </div>
          <CheckoutClient />
        </div>
      </div>
    </>
  );
};

export default IndividualProduct;
