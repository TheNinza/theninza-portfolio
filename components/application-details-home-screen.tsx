import Image from "next/image";
import Link from "next/link";
import { FC, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { IApplication } from "../config/types/dataTypes";

interface IProps {
  application: IApplication;
}

const ApplicationDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
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

  & .tech-icon {
    position: relative;
    transition: all 0.3s ease-in;

    &:hover {
      transform: scale(0.9) rotate(-5deg);
    }
    &:active {
      transform: scale(0.9) rotate(0);
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
`;

const ApplicationDetailsHomeScreen: FC<IProps> = ({ application }) => {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useLayoutEffect(() => {
    const paragraphs = application.description.split("\n");
    setParagraphs(paragraphs);
  }, [application.description]);

  return (
    <ApplicationDetailsContainer>
      <ApplicationImageAndLinksContainer>
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
            <a rel="noopener noreferrer" target="_blank">
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
            <a rel="noopener noreferrer" target="_blank">
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
      <ApplicationTechStackContainer>
        {application.stacks.map((stack) => (
          <Image
            key={stack.id}
            height={50}
            width={50}
            src={stack.image.url}
            alt={stack.name}
            objectFit="contain"
            className="tech-icon"
          />
        ))}
      </ApplicationTechStackContainer>
      <ApplicationDescriptionContainer>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </ApplicationDescriptionContainer>
    </ApplicationDetailsContainer>
  );
};

export default ApplicationDetailsHomeScreen;
