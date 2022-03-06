// create a typescript next js functional component named CustomCursor

import { FC, useContext, useRef } from "react";
import styled from "styled-components";
import { CursorContext } from "../context/cursor-context";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";

const CustomCursorContainer = styled.div`
  width: ${({ theme }) => theme.space.xxl};
  height: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 50%;

  position: fixed;
  transform: translate(-50%, -50%);
  transform-origin: 0% 0%;

  pointer-events: none;

  background-color: ${({ theme }) => theme.colors.textPrimary};
  mix-blend-mode: difference;

  z-index: 9999;

  transition: all 0.3s ease;
  transition-property: background-color, transform;

  display: none;
`;

const CustomCursor: FC = () => {
  const { setCursorElement } = useContext(CursorContext);

  const cursorRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    // hide cursor on mobile

    if (window.innerWidth < 768) {
      cursor.style.display = "none";
      return;
    }

    let onMouseMove = (e: MouseEvent) => {
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
    };

    let onMouseDown = () => {
      if (cursor) {
        cursor.style.background = "transparent";
      }
    };

    let onMouseUp = () => {
      if (cursor) {
        cursor.style.background = "#fff";
      }
    };

    setCursorElement(cursor);
    window.addEventListener("mousemove", onMouseMove);

    window.addEventListener("mousedown", onMouseDown);

    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return <CustomCursorContainer className="cursor" ref={cursorRef} />;
};

export default CustomCursor;
