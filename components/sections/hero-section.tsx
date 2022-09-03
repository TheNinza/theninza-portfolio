import gsap from "gsap";
import Image from "next/image";
import { FC, MouseEventHandler, useContext, useRef } from "react";
import styled from "styled-components";
import { CursorContext } from "../../context/cursor-context";
import { WindowLoadingContext } from "../../context/window-loading-context";
import useIsomorphicLayoutEffect from "../../hooks/use-isomorphic-layout-effect";

// styled-components

const HeroSectionContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform-origin: top;

  /* center the container */
  margin: 0 auto;
  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const BigHeading = styled.h1`
  font-size: 7vw;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  opacity: 0;

  & .letterHeading {
    display: inline-block;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.1) translateY(-10px) rotate(5deg);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 6.9vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 10vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 12vw;
  }
`;

const HeadingAnimatedWrapper = styled.div`
  position: relative;
  width: fit-content;

  & > .banner {
    position: absolute;
    top: 0;
    width: 10px;
    height: 100%;
    pointer-events: none;

    &.lightRedBanner {
      background-color: ${({ theme }) => theme.colors.lightRed};
    }

    &.greenBanner {
      background-color: ${({ theme }) => theme.colors.green};
    }

    &.blueBanner {
      background-color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const OutlinedBigHeading = styled(BigHeading)`
  color: transparent;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.textPrimary};
  margin-top: 5rem;
  text-transform: uppercase;
  background-image: linear-gradient(
    to right,
    transparent 0%,
    transparent 29%,
    transparent 67%,
    white 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  transition: background-position 0.3s ease-in;

  &:hover {
    background-position: 200% 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-top: 3rem;
  }
`;

const HiddenCatContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  transition: all 0.3s ease-in;
  opacity: 0;
  pointer-events: none;
  animation: infiniteBounce 1s linear infinite alternate;

  @keyframes infiniteBounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(10px);
    }
  }

  &::before {
    content: "Keep Scrolling Please!";
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-transform: uppercase;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.lightRed};
    z-index: 10;
  }
`;

const HeroSection: FC = () => {
  const { isLoading } = useContext(WindowLoadingContext);
  const { cursorElement } = useContext(CursorContext);

  const gsapTimeLineRef = useRef(gsap.timeline());

  const heroImageContainerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      gsapTimeLineRef.current
        .to(".banner", {
          duration: 1,
          width: "100%",
          ease: "power4.out",
        })
        .to(".banner", {
          duration: 1,
          width: "0%",
          right: 0,
          ease: "power4.out",
        })
        .fromTo(
          ".heroHeading",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          },
          "-=1"
        );
    }
  }, [isLoading]);

  const handleHover: MouseEventHandler<HTMLHeadingElement> = (e) => {
    if (cursorElement) {
      cursorElement.style.transform = "scale(2) translate(-50%, -50%)";
    }

    // handling the outlined banner
    const target = e.target as Element;

    if (
      target.classList.contains("outlined") &&
      heroImageContainerRef.current
    ) {
      heroImageContainerRef.current.style.opacity = "1";
    }
  };

  const handleHoverOut: MouseEventHandler<HTMLHeadingElement> = (e) => {
    if (cursorElement) {
      cursorElement.style.transform = "scale(1) translate(-50%, -50%)";
    }

    // handling the outlined banner
    const target = e.target as Element;

    if (
      target.classList.contains("outlined") &&
      heroImageContainerRef.current
    ) {
      heroImageContainerRef.current.style.opacity = "0";
    }
  };

  return (
    <HeroSectionContainer>
      <HeadingAnimatedWrapper>
        <BigHeading
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          className="heroHeading"
        >
          <span className="letterHeading">H</span>
          <span className="letterHeading">i</span>
          <span className="letterHeading">,</span>
          <span> </span>
          <span className="letterHeading">I</span>
          <span className="letterHeading">&apos;</span>
          <span className="letterHeading">m</span>
          <span> </span>
          <span className="letterHeading">N</span>
          <span className="letterHeading">i</span>
          <span className="letterHeading">k</span>
          <span className="letterHeading">h</span>
          <span className="letterHeading">i</span>
          <span className="letterHeading">l</span>
          <span className="letterHeading">.</span>
        </BigHeading>
        <div className="lightRedBanner banner"></div>
      </HeadingAnimatedWrapper>
      <HeadingAnimatedWrapper>
        <BigHeading
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          className="heroHeading"
        >
          <span className="letterHeading">I</span>
          <span className="letterHeading">&apos;</span>
          <span className="letterHeading">m</span>
          <span> </span>
          <span className="letterHeading">a</span>
          <span> </span>
          <span className="letterHeading">f</span>
          <span className="letterHeading">u</span>
          <span className="letterHeading">l</span>
          <span className="letterHeading">l</span>
          <span> </span>
          <span className="letterHeading">s</span>
          <span className="letterHeading">t</span>
          <span className="letterHeading">a</span>
          <span className="letterHeading">c</span>
          <span className="letterHeading">k</span>
          <span> </span>
          <span className="letterHeading">d</span>
          <span className="letterHeading">e</span>
          <span className="letterHeading">v</span>
          <span className="letterHeading">e</span>
          <span className="letterHeading">l</span>
          <span className="letterHeading">o</span>
          <span className="letterHeading">p</span>
          <span className="letterHeading">e</span>
          <span className="letterHeading">r</span>
          <span className="letterHeading">.</span>
        </BigHeading>
        <div className="greenBanner banner"></div>
      </HeadingAnimatedWrapper>
      <HeadingAnimatedWrapper>
        <OutlinedBigHeading
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          className="heroHeading outlined"
        >
          &ldquo;That&apos;s it??&rdquo;
        </OutlinedBigHeading>
        <div className="blueBanner banner"></div>
      </HeadingAnimatedWrapper>
      <HiddenCatContainer ref={heroImageContainerRef}>
        <Image
          src="/cat-hero-section.webp"
          alt="Cat"
          className="cat"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverOut}
          width={500}
          height={375}
        />
      </HiddenCatContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
