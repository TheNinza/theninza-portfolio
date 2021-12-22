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

  display: none;
`;

const CustomCursor: FC = () => {
  const cursorRef = useCallback((cursor: HTMLDivElement) => {
    if (cursor == null) return;

    window.addEventListener("mousemove", (e) => {
      if (cursor) {
        // if cursor is not within 5px of the edge of the screen, then don't show it
        if (
          e.clientX < 10 ||
          e.clientX > window.innerWidth - 10 ||
          e.clientY < 10 ||
          e.clientY > window.innerHeight - 10
        ) {
          cursor.style.display = "none";
        }

        // if cursor is in the viewport, show it
        else {
          cursor.style.display = "block";
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }
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

    window.addEventListener("touchstart", (e) => {
      if (cursor) {
        cursor.style.display = "block";
      }
    });

    window.addEventListener("touchend", (e) => {
      if (cursor) {
        cursor.style.display = "none";
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (cursor) {
        cursor.style.left = `${e.touches[0].clientX}px`;
        cursor.style.top = `${e.touches[0].clientY}px`;
      }
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
      window.removeEventListener("touchmove", () => {});
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchend", () => {});
    };
  }, []);

  return <CustomCursorContainer className="cursor" ref={cursorRef} />;
};

export default CustomCursor;
