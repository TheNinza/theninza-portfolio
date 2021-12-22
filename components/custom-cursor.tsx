// create a typescript next js functional component named CustomCursor

import { FC, useCallback, useRef } from "react";
import styled from "styled-components";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";

const CustomCursorContainer = styled.div`
  width: ${({ theme }) => theme.space.xxl};
  height: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.textPrimary};
  z-index: 9999;
  mix-blend-mode: difference;

  transition: all 0.3s ease;
  transition-property: background-color, transform;
`;

const CustomCursor: FC = () => {
  const cursorRef = useCallback((cursor: HTMLDivElement) => {
    if (cursor == null) return;
    window.addEventListener("mousemove", (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    });

    window.addEventListener("mousedown", () => {
      if (cursor) {
        cursor.style.background = "transparent";
      }
    });

    window.addEventListener("mouseup", () => {
      if (cursor) {
        cursor.style.background = "#fff";
      }
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
    };
  }, []);

  return <CustomCursorContainer className="cursor" ref={cursorRef} />;
};

export default CustomCursor;
