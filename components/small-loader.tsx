import Image from "next/image";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface Iprops {
  imageWidth?: number;
  imageHeight?: number;
  isLoading: boolean;
  isTransparent?: boolean;
}

const SmallLoaderContainer = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};

  z-index: 1000 !important;

  transition: all 0.3s ease-in;

  &.loaded {
    opacity: 0;
    pointer-events: none;
  }

  &.transparent {
    background-color: transparent;
  }

  & > * {
    animation: turn-turn 2s infinite;
  }

  @keyframes turn-turn {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const SmallLoader: React.FC<Iprops> = ({
  imageWidth = 100,
  imageHeight = 100,
  isLoading,
  isTransparent = true,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaderEl = loaderRef.current;
    if (!loaderEl) return;

    if (isLoading) {
      loaderEl.classList.remove("loaded");
    } else {
      loaderEl.classList.add("loaded");
    }

    return () => {
      loaderEl.classList.remove("loaded");
    };
  }, [isLoading]);

  return (
    <SmallLoaderContainer
      ref={loaderRef}
      className={`${isTransparent ? "transparent" : ""}`}
    >
      <Image
        className="smallloaderLogo"
        src="/logo.svg"
        width={imageWidth}
        height={imageHeight}
        alt="smallLoader"
        priority
      />
    </SmallLoaderContainer>
  );
};

export default SmallLoader;
