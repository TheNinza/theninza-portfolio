import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Blob, CardContainer, GlassBox } from "../config/styled-components";

const TwitchCardContainer = styled(CardContainer)`
  flex: 0.25;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex: 0.4;
  }
`;

const TwitchBlob = styled(Blob)`
  bottom: 18%;
  left: -5%;
  width: 25%;
  height: 35%;
  background: ${({ theme }) => theme.colors.lightRed};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`;

const TwitchCard = styled(GlassBox)`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.space.lg};
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.lg};

  position: relative;

  & > .twitch-logo-absolute-wrapper {
    position: absolute;
    top: ${({ theme }) => theme.space.lg};
    right: ${({ theme }) => theme.space.lg};
    height: calc(100% - ${({ theme }) => theme.space.lg} * 2);

    z-index: -1;
    opacity: 0.9;

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.sm}px) {
      top: 50%;
      right: 50%;
      transform: translate(60%, -50%);
    }

    & > .twitch-logo-container {
      height: 100%;
      aspect-ratio: 137/145;
      position: relative;

      @media only screen and (max-width: ${({ theme }) =>
          theme.breakpoints.sm}px) {
        width: 80%;
        aspect-ratio: 1;
      }
    }
  }

  & > .title {
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      font-size: 1.5rem;
      margin-top: ${({ theme }) => theme.space.lg};
    }
  }

  & > .description {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      font-size: 1rem;
    }
  }
`;

const TwitchCardComponent: React.FC<{}> = () => {
  return (
    <TwitchCardContainer className="glassContainer">
      <TwitchBlob />
      <Link href="https://twitch.tv/theninza" passHref>
        <a target="_blank" rel="noopener noreferrer">
          <TwitchCard className="glassCard">
            <div className="twitch-logo-absolute-wrapper">
              <div className="twitch-logo-container">
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/twitch-logo.svg"
                  alt="Twitch logo"
                />
              </div>
            </div>
            <div className="title">I like gaming and streaming</div>
            <div className="description">Streams Valorant</div>
          </TwitchCard>
        </a>
      </Link>
    </TwitchCardContainer>
  );
};

export default TwitchCardComponent;
