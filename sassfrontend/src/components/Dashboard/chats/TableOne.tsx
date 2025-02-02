
import Image from "next/image";
export type BRAND = {
    logo: string;
    name: string;
    visitors: number;
    revenues: string;
    sales: number;
    conversion: number;
  };
  
const brandData: BRAND[] = [
  {
    logo: "",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "",
    name: "X.com",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "",
    name: "Github",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "",
    name: "Facebook",
    visitors: 1.2,
    revenues: "2,740",
    sales: 230,
    conversion: 1.9,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-xl">
      <h4 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Top Channels</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          <div className="px-2 pb-3">
            <h5 className="text-sm font-medium uppercase sm:text-base text-gray-500 dark:text-gray-400">Source</h5>
          </div>
          <div className="px-2 pb-3 text-center">
            <h5 className="text-sm font-medium uppercase sm:text-base text-gray-500 dark:text-gray-400">Visitors</h5>
          </div>
          <div className="px-2 pb-3 text-center">
            <h5 className="text-sm font-medium uppercase sm:text-base text-gray-500 dark:text-gray-400">Revenues</h5>
          </div>
          <div className="hidden px-2 pb-3 text-center sm:block">
            <h5 className="text-sm font-medium uppercase sm:text-base text-gray-500 dark:text-gray-400">Sales</h5>
          </div>
          <div className="hidden px-2 pb-3 text-center sm:block">
            <h5 className="text-sm font-medium uppercase sm:text-base text-gray-500 dark:text-gray-400">Conversion</h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 gap-4 ${
              key === brandData.length - 1 ? "" : "border-b border-gray-200 dark:border-gray-700"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 px-2 py-4">
              <div className="flex-shrink-0">
                <Image src={brand.logo || "/profile.jpg"} alt="Brand" className="rounded-full" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-gray-900 dark:text-white sm:block">{brand.name}</p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-gray-900 dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-500">${brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-gray-900 dark:text-white">{brand.sales}</p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-gray-900 dark:text-white">{brand.conversion}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
