import gsap from "gsap";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { SectionTitle } from "../../config/styled-components";
import BlogCardComponent from "../blogs-card";
import GithubCardComponent from "../github-card";
import SpotifyCardComponent from "../spotify-card";
import TwitchCardComponent from "../twitch-card";

const APeekInLifeSectionContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  gap: 2rem;

  border-top: 1px solid grey;

  /* center the container */
  margin: 0 auto;

  position: relative;

  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const APeekInLifeSectionTitle = styled(SectionTitle)`
  font-size: 4.5vw;
  margin-left: unset;
  margin-right: unset;
  text-align: unset;
  opacity: 1;
  white-space: nowrap;
  letter-spacing: 0.2rem;
  opacity: 0;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 3.2rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 2rem;
  }
`;

const SectionFlexContainer = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
  flex: 1;
  padding-bottom: ${({ theme }) => theme.space.md};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.sm};
  }

  & .glassContainer {
    opacity: 0;
  }
`;

const CoolSection = styled.div`
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.xl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.sm};
    width: 45%;
  }
`;

const ProfessionalSection = styled(CoolSection)`
  width: unset;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.xl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.sm};
  }
`;

const APeekInLifeSection: React.FC = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const aPeekInLifeSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([section]) => {
        if (section.isIntersecting && section.boundingClientRect.y > 0) {
          setIsSectionVisible(true);
          observer.disconnect();

          gsap.fromTo(
            ".aPeekInLifeSectionTitle",
            {
              opacity: 0,
              y: "4rem",
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.easeIn",
            }
          );

          const glassContainers = document.querySelectorAll(".glassContainer");

          // set intersection observer for each glass container
          glassContainers.forEach((glassContainer) => {
            const glassContainerObserver = new IntersectionObserver(
              ([glass]) => {
                if (glass.isIntersecting) {
                  glassContainerObserver.disconnect();
                  gsap.fromTo(
                    glass.target,
                    {
                      opacity: 0,
                      y: "4rem",
                    },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.5,
                      ease: "power3.easeIn",
                      delay: Math.random() * 1.5,
                    }
                  );
                }
              },
              {
                threshold: 0.7,
              }
            );

            glassContainerObserver.observe(glassContainer);
          });

          // analytics
          // window.umami("section-visit-peek-in-life");
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(el);
  }, []);

  return (
    <APeekInLifeSectionContainer ref={aPeekInLifeSectionRef}>
      <APeekInLifeSectionTitle className="aPeekInLifeSectionTitle">
        A <span className="emphasisGreenText">peek</span> in my{" "}
        <span className="emphasisRedText">Life</span>{" "}
      </APeekInLifeSectionTitle>
      {isSectionVisible && (
        <SectionFlexContainer>
          <CoolSection>
            {/* spotify */}
            <SpotifyCardComponent />

            {/* twitch */}
            <TwitchCardComponent />
          </CoolSection>
          <ProfessionalSection>
            {/* Github */}
            <GithubCardComponent />

            {/* Blogs */}
            <BlogCardComponent />
          </ProfessionalSection>
        </SectionFlexContainer>
      )}
    </APeekInLifeSectionContainer>
  );
};

export default APeekInLifeSection;
