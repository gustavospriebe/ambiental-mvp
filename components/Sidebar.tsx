import LogOutButton from "./LogOutButton";

const Sidebar = () => {
    return (
        <div className="md:flex hidden w-72 bg-white">
            <div className="flex flex-col w-full">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                    <div className="flex flex-col flex-shrink-0 px-4">
                        <a
                            className="text-lg font-semibold tracking-tighter text-black focus:outline-none focus:ring "
                            href="/"
                        >
                            <span className="inline-flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 mx-auto"
                                    viewBox="0 0 232 232"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M166.524 51.4683L116.367 101.625L65.5235 51.4683L116.367 0.62434L166.524 51.4683ZM231.11 116.054L180.953 166.898L130.796 116.054L180.953 65.8969L231.11 116.054ZM101.939 116.054L51.0948 166.898L0.250934 116.054L51.0948 65.8969L101.939 116.054ZM166.524 181.326L116.367 231.483L65.5235 181.326L116.367 130.482L166.524 181.326Z"
                                        fill="#0c0c0c"
                                    ></path>
                                </svg>
                                windstatic
                            </span>{" "}
                        </a>
                        <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
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
