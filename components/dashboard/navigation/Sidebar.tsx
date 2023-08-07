import { navConfig } from "@/config/Menu";
import LogOutButton from "../../LogOutButton";
import Logo from "../../Logo";

const Sidebar = () => {
  const items = navConfig.NavMenu;

  return (
    <div className="fixed top-0 hidden h-screen w-56 bg-white md:flex">
      <div className="flex w-full flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r bg-white pt-5">
          <Logo className="px-4" />
          <nav className="mt-5flex-1 space-y-1 bg-white px-4">
            <p className="px-4 pt-4 text-xs font-semibold uppercase text-gray-400">
              Analytics
            </p>
            <ul>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Performance</span>
                </a>
              </li>
            </ul>
            <p className="px-4 pt-4 text-xs font-semibold uppercase text-gray-400">
              Content
            </p>
            <ul>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Guides</span>
                </a>
              </li>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Hotspots</span>
                  <span className="ml-auto inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
                    25
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Checklist</span>
                </a>
              </li>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">TLD</span>
                </a>
              </li>
            </ul>
            <p className="px-4 pt-4 text-xs font-semibold uppercase text-gray-400">
              Customization
            </p>
            <ul>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Segments</span>
                  <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-500">
                    25
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm text-gray-500 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-blue-500"
                  href="#"
                >
                  icon
                  <span className="ml-4">Links</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <LogOutButton className="rounded-none" />
      </div>
    </div>
  );
};

export default Sidebar;
