// components/editor/FormatContext.ts
import { createContext, useContext } from "react";

export interface FormatState {
  isBold: boolean;
  isItalic: boolean;
}

interface FormatContextValue {
  triggerFormat: (type: "bold" | "italic") => void;
  registerFormatter: (fn: (type: "bold" | "italic") => void) => void;
  formatState: FormatState;
  reportFormatState: (state: FormatState) => void;
}

export const FormatContext = createContext<FormatContextValue>({
  triggerFormat: () => {},
  registerFormatter: () => {},
  formatState: { isBold: false, isItalic: false },
  reportFormatState: () => {},
});

export const useFormatContext = () => useContext(FormatContext);
