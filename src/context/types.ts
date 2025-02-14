import type { LayoutSettings } from "@/layout/types";
import type { LayoutAction, LayoutState } from "@/layout/types";
import type { ThemeAction, ThemeState } from "@/theme/types";
type BaseState = {
  /** 是否移动设备 */
  isMobile: boolean;

  /** 布局设置 */
  layoutSettings: LayoutSettings;
};

interface BaseAction {
  type: "app";
  payload: Partial<BaseState>;
}

export type Action = BaseAction | ThemeAction | LayoutAction;

export type State = BaseState & ThemeState & LayoutState;
