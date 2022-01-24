import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { SectionTitle } from "../../config/styled-components";
import SpotifyCardComponent from "../spotify-card";

const APeekInLifeSectionContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  overflow-y: hidden;

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
  /* & .smallTitleLetter {
    opacity: 0;
  } */

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 3.2rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    text-align: center;
  }
`;

const SectionFlexContainer = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.space.xl};
`;

const CoolSection = styled.div`
  width: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.xl};
`;

const ProfessionalSection = styled(CoolSection)`
  width: unset;
  flex: 1;
`;

const APeekInLifeSection: React.FC = () => {
  const [spotifyState, setSpotifyState] = useState({
    loading: true,
    error: null,
    data: {
      currentlyPlaying: true,
      spotifyData: {
        albumImage:
          "https://i.scdn.co/image/ab67616d0000b2739dab9a51fd620a3d79d53e91",
        songName: "superstars",
        artistsNames: ["Christian French"],
      },
    },
  });

  return (
    <APeekInLifeSectionContainer>
      <APeekInLifeSectionTitle>
        A <span className="emphasisGreenText">peek</span> in my{" "}
        <span className="emphasisRedText">Life</span>{" "}
      </APeekInLifeSectionTitle>
      <SectionFlexContainer>
        <CoolSection>
          {/* spotify */}
          <SpotifyCardComponent />

          {/* twitch */}
        </CoolSection>
        <ProfessionalSection>
          {/* Github */}
          {/* Blogs */}
        </ProfessionalSection>
      </SectionFlexContainer>
    </APeekInLifeSectionContainer>
  );
};

export default APeekInLifeSection;
