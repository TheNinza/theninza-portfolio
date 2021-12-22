import { WindowLoadingProvider } from "./window-loading-context";
import { CursorProvider } from "./cursor-context";
import { FC } from "react";

const RootContextProvider: FC = ({ children }) => {
  return (
    <WindowLoadingProvider>
      <CursorProvider>{children}</CursorProvider>
    </WindowLoadingProvider>
  );
};

export default RootContextProvider;
