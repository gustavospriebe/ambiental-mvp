import Sidebar from "@/components/Sidebar";

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>
    );
};

export default DashboardRootLayout;
