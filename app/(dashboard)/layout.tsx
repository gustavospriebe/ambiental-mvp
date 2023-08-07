import Navigation from "@/components/dashboard/navigation/Navigation";
import { MobileProvider } from "@/context/MobileContext";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

const DashboardRootLayout = ({ children }: DashboardRootLayoutProps) => {
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
