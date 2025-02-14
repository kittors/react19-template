import { useAppContext } from "@/hooks/useAppContext"; // 引入全局状态

/**
 * 用于管理全局状态的自定义 Hook
 */
export function useAppHooks() {
  const { state, dispatch } = useAppContext();

  // 手动更新 isMobile 状态的函数
  const setIsMobile = (isMobile: boolean) => {
    dispatch({
      type: "app",
      payload: { isMobile },
    });
  };

  return {
    isMobile: state.isMobile,
    setIsMobile,
  };
}
