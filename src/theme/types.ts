interface ThemeState {
    /** 是否暗黑模式 */
    isDark: boolean;
  }
  
  interface ThemeAction {
    type: "theme";
    payload: Partial<ThemeState>;
  }
  
  export type { ThemeState, ThemeAction };
  