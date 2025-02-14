import { useAppContext } from "@/hooks/useAppContext";
import type { LayoutState } from "@/layout/types";
import { getCache, setCache } from "@/utils/cache";
import { useCallback } from "react";

export function useLayoutSettins() {
  const { state, dispatch } = useAppContext();
  const updateLayout = useCallback(
    (field: keyof LayoutState, value: string) => {
      console.log(field, value);
      const layoutSetting = {
        ...state.layoutSettings, // 保留旧的 parameterConfig
        [field]: value, // 更新指定的 field
      };
      dispatch({
        type: "layout",
        payload: {
          layoutSettings: layoutSetting,
        },
      });
      setCache("parameterConfig", layoutSetting);
    },
    [dispatch, state, state.layoutSettings],
  );
  return { updateLayout, state };
}
