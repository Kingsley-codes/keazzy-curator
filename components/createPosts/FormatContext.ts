// components/editor/FormatContext.ts
import { createContext, useContext } from "react";

interface FormatContextValue {
  triggerFormat: (marker: string) => void;
  registerFormatter: (fn: (marker: string) => void) => void;
}

export const FormatContext = createContext<FormatContextValue>({
  triggerFormat: () => {},
  registerFormatter: () => {},
});

export const useFormatContext = () => useContext(FormatContext);
