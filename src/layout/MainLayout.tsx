import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1B1B1F]/90">
      <Navigation />
      <main className="flex-1 pt-20 px-5">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
