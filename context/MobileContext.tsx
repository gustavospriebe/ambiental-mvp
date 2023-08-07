"use client";

import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface MobileContextProps {
    showMobileMenu: boolean;
    setShowMobileMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileContext = createContext<MobileContextProps>({
    showMobileMenu: false,
    setShowMobileMenu: () => {},
});

interface MobileProviderProps {
    children: React.ReactNode;
}

const MobileProvider = ({ children }: MobileProviderProps) => {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const value = { showMobileMenu, setShowMobileMenu };

    return (
        <MobileContext.Provider value={value}>
            {children}
        </MobileContext.Provider>
    );
};

const useMobile = () => useContext(MobileContext);

export { MobileContext, MobileProvider, useMobile };
