import Link from "next/link";

const CartIcon = () => {
  return (
    <>
      <Link
        className="relative inline-flex cursor-pointer hover:scale-110 transition-all duration-700 ease-in-out items-center p-3 text-sm font-medium text-center rounded-lg "
        href="/checkout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="sr-only">Cart</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -end-0 dark:border-gray-900">
          20
        </div>
      </Link>
    </>
  );
};

export default CartIcon;
