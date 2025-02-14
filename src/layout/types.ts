interface BaseCom {
  isShow: boolean;
}

interface Navigation extends BaseCom {
  height: string;
}

export interface LayoutSettings {
  navigation: Navigation;
}

export type LayoutState = {
  layoutSettings: LayoutSettings;
};

export interface LayoutAction {
  type: "layout";
  payload: Partial<LayoutState>;
}
