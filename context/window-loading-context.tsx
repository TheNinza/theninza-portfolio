import { createContext, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";

interface ContextProps {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const WindowLoadingContext = createContext<ContextProps>({
  isLoading: false,
  setLoading: () => {},
});

export const WindowLoadingProvider: FC = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <WindowLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </WindowLoadingContext.Provider>
  );
};
