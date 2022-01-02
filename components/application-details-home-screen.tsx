import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { IApplication } from "../config/types/dataTypes";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";

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
`;

const ApplicationImageAndLinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xl};
`;

const ApplicationImageContainer = styled.div`
  flex: 1;
  box-shadow: 0px 5px 10px 10px rgba(0, 0, 0, 0.1);
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
  }
`;

const ApplicationDetailsHomeScreen: FC<IProps> = ({
  application,
  isSectionVisible,
}) => {
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

  return (
    <ApplicationDetailsContainer className="applicationDetailsHomeScreen">
      <ApplicationImageAndLinksContainer className="appDetailSection">
        <ApplicationImageContainer>
          <Image
            height={270}
            width={480}
            src={application.image.url}
            alt={application.name}
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
      <ApplicationDescriptionContainer className="appDetailSection">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </ApplicationDescriptionContainer>
    </ApplicationDetailsContainer>
  );
};

export default ApplicationDetailsHomeScreen;
