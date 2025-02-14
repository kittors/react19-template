import { appContext } from "@/context/appContext";
import { useContext } from "react";

export function useAppContext() {
  const context = useContext(appContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}
