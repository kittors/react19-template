import { useEffect, useRef } from "react";

/**
 * 用于跟踪组件是否已挂载的自定义 Hook
 * @returns 返回一个布尔值，表示组件是否已挂载
 */
export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true; // 组件挂载时设置为 true
    return () => {
      isMounted.current = false; // 组件卸载时设置为 false
    };
  }, []);

  return isMounted.current; // 直接返回布尔值
}
