import { CardWrapper, PaginationComponent, ProductCard } from "@/components";

const page = () => {
  return (
    <div>
      <div className="my-5 mx-5">
        <h1 className="text-4xl my-5 font-bold dark:text-white text-black ">
          All Category
        </h1>
        <div className=" mx-4 grid xl:grid-cols-4 grid-cols-2 gap-4 ">
          <ProductCard categories />
          <ProductCard categories />
          <ProductCard categories />
          <ProductCard categories />
          <ProductCard categories />
        </div>
      </div>
      <PaginationComponent totalPages={4} href={"/catagory"} />
    </div>
  );
};

export default page;
