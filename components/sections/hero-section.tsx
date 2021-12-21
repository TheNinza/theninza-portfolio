import gsap from "gsap";
import { useContext } from "react";
import styled from "styled-components";
import { WindowLoadingContext } from "../../context/windowLoadingContext";
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

  opacity: 0;
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

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        ".container",
        {
          duration: 1,
          opacity: 0,
          y: -100,
        },
        {
          duration: 1,
          opacity: 1,
          y: 0,
          scaleY: 1,
          ease: "power1.out",
        }
      );
    }
  }, [isLoading]);

  return (
    <HeroSectionContainer className="container">
      <BigHeading>Hi, I&apos;m Nikhil.</BigHeading>
      <BigHeading>I&apos;m a full stack developer.</BigHeading>
      <OutlinedBigHeading>&ldquo;That&apos;s it??&rdquo;</OutlinedBigHeading>
    </HeroSectionContainer>
  );
};

export default HeroSection;
