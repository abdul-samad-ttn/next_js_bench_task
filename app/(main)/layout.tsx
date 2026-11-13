import MenuNavigation from "@/app/components/navigation/menuNavigation";
import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({children}:MainLayoutProps) =>
    {
        return (
            <>
            <MenuNavigation />
            <main className="container mx-auto py-4">
                {children}
            </main>
            <Toaster position="top-right" />
            </>
        )
    };

    export default MainLayout;