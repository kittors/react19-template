import type { ThemeAction, ThemeState } from "@/theme/types";
type BaseState = {
  /** 是否移动设备 */
  isMobile: boolean;
};

interface BaseAction {
  type: "app";
  payload: Partial<BaseState>;
}

export type Action = BaseAction | ThemeAction;

export type State = BaseState & ThemeState;
