import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { theme } from "../config/styled-components";
import { IApplication } from "../config/types/dataTypes";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";
import useWindowSize from "../hooks/useWindowSize";
import ParticleCanvas from "./particle-canvas";

interface IProps {
  application: IApplication;
  isSectionVisible: boolean;
}

const ApplicationDetailsContainer = styled.div`
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
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  & p {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease-in;
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
}) => {
  const { width, height } = useWindowSize();
  const theme = useTheme();
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
          duration: 0.8,
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
            duration: 0.8,
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
            duration: 1,
            stagger: 0.5,
            ease: "power3.inOut",
          },
          "-=1.5"
        );
    }
  }, [isSectionVisible, application]);

  // manually handling height of description container
  useIsomorphicLayoutEffect(() => {
    if (appDescRef.current && width && height) {
      if (width < theme.breakpoints.xl) {
        // set overflow y of appDescRef to scroll
        appDescRef.current.style.overflowY = "scroll";
        const appDescHeight =
          height - appDescRef.current.getBoundingClientRect().top;

        if (appDescHeight < appDescRef.current.getBoundingClientRect().height) {
          appDescRef.current.style.height = `${appDescHeight - 10}px`;
          appDescRef.current.style.boxShadow =
            "inset 0px 0px 10px 10px rgba(0, 0, 0, 0.1)";
        } else {
          appDescRef.current.style.height = "auto";
          appDescRef.current.style.boxShadow = "none";
        }
      } else {
        appDescRef.current.style.height = "auto";
        appDescRef.current.style.overflowY = "hidden";
      }
    }
  }, [width, height]);

  return (
    <ApplicationDetailsContainer className="applicationDetailsHomeScreen">
      <ApplicationImageAndLinksContainer className="appDetailSection">
        <ApplicationImageContainer>
          <ParticleCanvas image={application.image.url} />
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
