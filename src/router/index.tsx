import NProgress from "nprogress";
import "nprogress/nprogress.css"; // 引入 NProgress 的样式
import { Suspense, lazy, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { useIsMounted } from "@/hooks/useIsMounted"; // 引入自定义 Hook

const MainLayout = lazy(() => import("@/layout/MainLayout"));
const HomePage = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/errorPage/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default function Router() {
  const isMounted = useIsMounted(); // 使用自定义 Hook
  useEffect(() => {
    // 如果组件已经挂载过，直接返回
    if (isMounted) return;

    // 设置 NProgress 的配置
    NProgress.configure({ showSpinner: false }); // 隐藏加载小圆圈

    // 开始进度条
    NProgress.start();

    return () => {
      // 组件卸载时结束进度条
      NProgress.done();
    };
  }, [isMounted]); // 使用 isMounted() 的返回值作为依赖项

  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
