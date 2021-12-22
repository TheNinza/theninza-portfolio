import gsap from "gsap";
import { useContext, useRef } from "react";
import styled from "styled-components";
import { WindowLoadingContext } from "../../context/window-loading-context";
import useIsomorphicLayoutEffect from "../../hooks/use-isomorphic-layout-effect";

// styled-components

const HeroSectionContainer = styled.div`
  min-height: 100vh;
  width: 100%;

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

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-top: 3rem;
  }
`;

const HeroSection = () => {
  const { isLoading } = useContext(WindowLoadingContext);

  const gsapTimeLineRef = useRef(gsap.timeline());

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

  return (
    <HeroSectionContainer>
      <HeadingAnimatedWrapper>
        <BigHeading className="heroHeading">Hi, I&apos;m Nikhil.</BigHeading>
        <div className="lightRedBanner banner"></div>
      </HeadingAnimatedWrapper>
      <HeadingAnimatedWrapper>
        <BigHeading className="heroHeading">
          I&apos;m a full stack developer.
        </BigHeading>
        <div className="greenBanner banner"></div>
      </HeadingAnimatedWrapper>
      <HeadingAnimatedWrapper>
        <OutlinedBigHeading className="heroHeading">
          &ldquo;That&apos;s it??&rdquo;
        </OutlinedBigHeading>
        <div className="blueBanner banner"></div>
      </HeadingAnimatedWrapper>
    </HeroSectionContainer>
  );
};

export default HeroSection;
