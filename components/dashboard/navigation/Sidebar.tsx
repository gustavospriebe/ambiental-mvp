import { navConfig } from "@/config/Menu";
import LogOutButton from "../../LogOutButton";
import Logo from "../../Logo";

const Sidebar = () => {
    const items = navConfig.NavMenu;

    return (
        <div className="md:flex hidden w-56 h-screen fixed top-0 bg-white">
            <div className="flex flex-col w-full">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex items-start flex-col flex-shrink-0 px-4">
                        <Logo />
                        <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col flex-grow px-4 mt-5">
                        <nav className="flex-1 space-y-1 bg-white">
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
                                Analytics
                            </p>
                            <ul>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">
                                            Performance
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
                                Content
                            </p>
                            <ul>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Guides</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Hotspots</span>
                                        <span className="inline-flex ml-auto items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
                                            25
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Checklist</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">TLD</span>
                                    </a>
                                </li>
                            </ul>
                            <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase">
                                Customization
                            </p>
                            <ul>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Segments</span>
                                        <span className="inline-flex ml-auto items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-500">
                                            25
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500"
                                        href="#"
                                    >
                                        icon
                                        <span className="ml-4">Links</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <LogOutButton />
            </div>
        </div>
    );
};

export default Sidebar;