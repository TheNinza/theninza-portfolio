import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { IApplication } from "../config/types/dataTypes";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";
import ParticleCanvas from "./particle-canvas";

interface IProps {
  application: IApplication;
  isSectionVisible: boolean;
  isImageLoaded: boolean;
  setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
}

interface ApplicationDetailsContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const ApplicationDetailsContainer = styled.div<ApplicationDetailsContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  align-items: center;
  position: relative;

  & > .appDetailSection {
    opacity: 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const ApplicationImageAndLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const ApplicationImageContainer = styled.div`
  flex: 1;
  box-shadow: 0px 5px 10px 10px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    & * {
      max-height: 20vh !important;
      aspect-ratio: 16/9 !important;
    }
  }
`;

const ApplicationLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  justify-content: center;
  align-items: center;

  & .link-icon {
    transition: all 0.3s ease-in;
    &:hover {
      transform: scale(0.9) rotate(-5deg);
    }
    &:active {
      transform: scale(0.9) rotate(0);
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    gap: ${({ theme }) => theme.space.lg};

    & span {
      width: ${({ theme }) => theme.space.xl} !important;
      height: ${({ theme }) => theme.space.xl} !important;
    }
  }

  & .link-icon-a {
    position: relative;

    &:first-child::after {
      content: "Live";
    }
    &:last-child::after {
      content: "Source";
    }

    &::after {
      display: block;

      opacity: 0;
      transform-origin: center;
      transition: all 0.2s ease-in;

      position: absolute;
      bottom: 0;
      left: 50%;
      transform: scaleY(0) translate(-50%, 80%);
    }

    &:hover::after {
      transform: scaleY(1) translate(-50%, 80%);
      opacity: 1;
    }
  }
`;

const ApplicationTechStackContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
  transition: all 0.3s ease-in;

  & .tech-icon {
    position: relative;
    transition: all 0.3s ease-in;
    opacity: 0;
    z-index: -100;
    &:hover {
      transform: scale(0.9) rotate(-5deg) !important;
    }
    &:active {
      transform: scale(0.9) rotate(0) !important;
    }
  }

  &:hover {
    gap: ${({ theme }) => theme.space.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    & span {
      width: ${({ theme }) => theme.space.xl} !important;
      height: ${({ theme }) => theme.space.xl} !important;
    }
  }
`;

const ApplicationDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  & p {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease-in;
    &:last-child {
      margin-bottom: 2rem;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.space.lg};
  }
`;

const ApplicationDetailsHomeScreen: FC<IProps> = ({
  application,
  isSectionVisible,
  isImageLoaded,
  setIsImageLoaded,
}) => {
  const appDescRef = useRef<HTMLDivElement>(null);

  const paragraphs = application.description.split("\n");

  useIsomorphicLayoutEffect(() => {
    if (isSectionVisible) {
      const tl = gsap.timeline();

      tl.fromTo(
        ".appDetailSection",
        {
          opacity: 0,
          x: "100%",
          scale: 1,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.inOut",
        }
      )
        .fromTo(
          ".tech-icon",
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.inOut",
          }
        )
        .fromTo(
          ".link-icon-a",
          {
            opacity: 0,
            y: -150,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.5,
            ease: "power3.inOut",
          },
          "-=1"
        )
        .then(() => {
          // analytics
          // window.umami(
          //   `view-application-${application.name
          //     .toLowerCase()
          //     .replace(/ /g, "-")}`
          // );
        });
    }
  }, [isSectionVisible, application]);

  // // manually handling height of description container
  // useIsomorphicLayoutEffect(() => {}, [width, height]);

  return (
    <ApplicationDetailsContainer className="applicationDetailsHomeScreen">
      <ApplicationImageAndLinksContainer className="appDetailSection">
        <ApplicationImageContainer>
          <ParticleCanvas
            isImageLoaded={isImageLoaded}
            setIsImageLoaded={setIsImageLoaded}
            image={application.image.url}
          />
        </ApplicationImageContainer>

        <ApplicationLinksContainer>
          <Link href={application.liveUrl} passHref>
            <a
              className="link-icon-a"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                className="link-icon"
                height={50}
                width={50}
                src="/live-icon.svg"
                alt="Live"
                objectFit="contain"
              />
            </a>
          </Link>
          <Link href={application.sourceCodeUrl} passHref>
            <a
              className="link-icon-a"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                className="link-icon"
                height={50}
                width={50}
                src="/github-icon.svg"
                alt="Github"
                objectFit="contain"
              />
            </a>
          </Link>
        </ApplicationLinksContainer>
      </ApplicationImageAndLinksContainer>
      <ApplicationTechStackContainer className="appDetailSection">
        {application.stacks.map((stack) => (
          <div key={stack.id} className="tech-icon">
            <Image
              height={50}
              width={50}
              src={stack.image.url}
              alt={stack.name}
              objectFit="contain"
            />
          </div>
        ))}
      </ApplicationTechStackContainer>
      <ApplicationDescriptionContainer
        ref={appDescRef}
        className="appDetailSection"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </ApplicationDescriptionContainer>
    </ApplicationDetailsContainer>
  );
};

export default ApplicationDetailsHomeScreen;
