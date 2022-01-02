import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { IApplication } from "../../config/types/dataTypes";
import { SectionTitle as ApplicationsSectionTitle } from "../../config/styled-components";
import gsap from "gsap";
import ApplicationDetailsHomeScreen from "../application-details-home-screen";

interface IProps {
  applications: IApplication[];
}

interface IApplicationName {
  readonly isSelected: boolean;
}

// styles
const ApplicationsSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  overflow-y: hidden;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  gap: 5rem;

  border-top: 1px solid grey;

  /* center the container */
  margin: 0 auto;

  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const AllApplicationsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.space.xxl};
  justify-content: space-between;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${({ theme }) => theme.space.md};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    gap: ${({ theme }) => theme.space.sm};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    gap: ${({ theme }) => theme.space.xs};
  }
`;

const ApplicationNameContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.space.md};
`;

const ApplicationPreviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ApplicationName = styled.h3<IApplicationName>`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textPrimary : "transparent"};

  font-size: ${({ isSelected }) => (isSelected ? "3.5rem" : "2.5rem")};
  letter-spacing: ${({ isSelected }) => (isSelected ? "0.3rem" : "0.2rem")};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  -webkit-text-stroke: 1px
    ${({ theme, isSelected }) =>
      !isSelected ? theme.colors.textSecondary : "transparent"};

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
  transition: all 0.3s
    ${({ isSelected }) => (isSelected ? "ease-in" : "ease-out")};

  cursor: pointer;

  &:hover {
    background-position: 200% 0;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(1);
  }
`;

const ApplicationsSection: FC<IProps> = ({ applications }) => {
  const [selectedApplication, setSelectedApplication] = useState<number>(0);

  const applicationsSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([section]) => {
        if (section.isIntersecting && section.boundingClientRect.y > 0) {
          gsap.fromTo(
            ".applicationSectionTitle",
            {
              opacity: 0,
              y: "4rem",
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            }
          );

          observer.disconnect();
        }
      },
      {
        threshold: 0.7,
      }
    );

    observer.observe(el);
  }, []);

  return (
    <ApplicationsSectionContainer ref={applicationsSectionRef}>
      <ApplicationsSectionTitle className="applicationSectionTitle">
        I build <span className="emphasisGreenText">Applications</span>
      </ApplicationsSectionTitle>
      <AllApplicationsContainer>
        <ApplicationNameContainer>
          {applications.map((application, idx) => (
            <ApplicationName
              isSelected={selectedApplication === idx}
              key={application.id}
              onClick={() => setSelectedApplication(idx)}
            >
              {application.name}
            </ApplicationName>
          ))}
        </ApplicationNameContainer>{" "}
        <ApplicationPreviewContainer>
          <ApplicationDetailsHomeScreen
            application={applications[selectedApplication]}
          />
        </ApplicationPreviewContainer>
      </AllApplicationsContainer>
    </ApplicationsSectionContainer>
  );
};

export default ApplicationsSection;
