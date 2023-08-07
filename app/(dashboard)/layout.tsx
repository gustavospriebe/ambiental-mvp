import Navigation from "@/components/dashboard/navigation/Navigation";
import { MobileProvider } from "@/context/MobileContext";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MobileProvider>
            <div className="flex flex-col md:flex-row">
                <Navigation />
                {children}
            </div>
        </MobileProvider>
    );
};

export default DashboardRootLayout;
