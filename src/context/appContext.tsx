import { getCache } from "@/utils/cache";
import {
  type Dispatch,
  type ReactNode,
  createContext,
  useReducer,
} from "react";
import { useEffect } from "react";
import type { Action, State } from "./types";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "app":
      return { ...state, ...action.payload };
    case "theme":
      return { ...state, ...action.payload };
    default:
      throw new Error(`Unknown action type: ${(action as Action).type}`);
  }
};

const initialState: State = {
  isMobile: window.innerWidth < 768, // 初始化 isMobile 状态
  isDark: getCache("theme") === "dark", // 从 localStorage 读取主题状态
};

interface AppContext {
  state: State;
  dispatch: Dispatch<Action>;
}

const Context = createContext<AppContext>({
  state: { ...initialState },
  dispatch: () => {
    console.warn("It has not been initialized yet");
  },
});

function AppContext({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // 监听窗口大小变化，更新 isMobile 状态
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: "app",
        payload: { isMobile: window.innerWidth < 768 },
      });
    };

    // 初始化时设置 isMobile
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default AppContext;

export { Context as appContext };
