import { createContext, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";

interface ContextProps {
  cursorElement: HTMLDivElement | null;
  setCursorElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
}

export const CursorContext = createContext<ContextProps>({
  cursorElement: null,
  setCursorElement: () => {},
});

export const CursorProvider: FC = ({ children }) => {
  const [cursorElement, setCursorElement] = useState<HTMLDivElement | null>(
    null
  );

  return (
    <CursorContext.Provider value={{ cursorElement, setCursorElement }}>
      {children}
    </CursorContext.Provider>
  );
};
