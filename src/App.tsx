import { useThemeDispatch } from "@/hooks/useThemeDispatch";
import { ConfigProvider, theme } from "antd";

import Router from "./router";
export default function App() {
  const { isDark } = useThemeDispatch();
  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router />
    </ConfigProvider>
  );
}
