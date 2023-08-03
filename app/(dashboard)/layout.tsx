import Sidebar from "@/components/Sidebar";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            {children}
        </div>
    );
};

export default DashboardRootLayout;
