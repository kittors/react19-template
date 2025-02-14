import Navigation from "@/components/Navigation";
import { useLayoutSettins } from "@/hooks/useLayoutSettins";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
function MainLayout() {
  const {
    navigation: { height: navigationHeight, isShow } = {},
  } = useLayoutSettins().state.layoutSettings || {};
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1B1B1F]/90">
      {isShow && <Navigation />}
      <main className={clsx("flex-1", isShow ? navigationHeight : "", "px-5")}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
