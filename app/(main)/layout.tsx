import MenuNavigation from "@/app/components/navigation/menuNavigation";


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
            </>
        )
    };

    export default MainLayout;