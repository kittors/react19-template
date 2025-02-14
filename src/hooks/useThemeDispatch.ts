import { useAppContext } from "@/hooks/useAppContext";
import { getCache, setCache } from "@/utils/cache";
import { useEffect } from "react";

export function useThemeDispatch() {
  const { state, dispatch } = useAppContext();

  // 检测系统主题模式
  const isSystemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  // 初始化时，根据 localStorage 或系统主题模式设置 isDark
  useEffect(() => {
    const savedTheme = getCache("theme");
    const initialIsDark = savedTheme ? savedTheme === "dark" : isSystemDarkMode;

    dispatch({
      type: "theme",
      payload: {
        isDark: initialIsDark,
      },
    });

    // 设置 html 元素的类
    if (initialIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, isSystemDarkMode]);

  // 监听系统主题模式变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const isDark = event.matches;
      dispatch({
        type: "theme",
        payload: {
          isDark: isDark,
        },
      });

      // 更新 html 元素的类
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // 监听系统主题模式变化
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // 清除监听
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [dispatch]);

  /**
   * 切换主题 暗黑模式 和 明亮模式
   * @param isDark 是否暗黑模式
   */
  const toggleTheme = (isDark: boolean) => {
    // 更新全局状态
    dispatch({
      type: "theme",
      payload: {
        isDark: isDark,
      },
    });

    // 保存到 localStorage
    setCache("theme", isDark ? "dark" : "light");

    // 动态更新 html 元素的类
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return { toggleTheme, isDark: state.isDark };
}
