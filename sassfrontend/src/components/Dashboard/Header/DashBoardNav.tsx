import { SidebarTrigger } from "../../ui/sidebar";
import BreadcrumbComponent from "./breadcumb";
import DarkModeSwitcher from "../../common/Navbar/DarkWhiteMode";
import SearchForm from "./SearchForm";
import NotificationDropdown from "./DropdownNotifications";
import UserDropdown from "./DropdownUser";

const DashBoardNav = () => {
  return (
    <>
      <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
        <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
          <div className="flex items-center gap-1  pr-2 rounded-lg">
            <SidebarTrigger className="-ml-1" />
            <BreadcrumbComponent />
          </div>
          <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <!-- Search Form --> */}
              <SearchForm />
              {/* <!-- Search Form --> */}

              {/* <!-- Dark Mode Toggle --> */}
              <DarkModeSwitcher />
              {/* <!-- Dark Mode Toggle --> */}

              {/* <!-- Notification Menu Area --> */}
              <NotificationDropdown />
              {/* <!-- Notification Menu Area --> */}
            </ul>

            {/* <!-- User Area --> */}
            <UserDropdown  imageUrl={"/profile.jpg"} />
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashBoardNav;
