import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Blob, CardContainer, GlassBox } from "../config/styled-components";
import { ISpotifyData } from "../config/types/dataTypes";

type ISpotifyState = ISpotifyData | null;
interface IStyledSpotifyCard {
  readonly shouldScrollSongName: boolean;
  readonly shouldScrollArtistsNames: boolean;
}

const DEFAULT_SPOTIFY_DATA: ISpotifyData = {
  currentlyPlaying: true,
  spotifyData: {
    albumImage:
      "https://i.scdn.co/image/ab67616d0000b2739dab9a51fd620a3d79d53e91",
    songName: "superstars",
    artistsNames: ["Christian French"],
  },
};

const SpotifyBlob1 = styled(Blob)`
  top: -5%;
  left: -5%;
  width: 35%;
  height: 35%;
  background: ${({ theme }) => theme.colors.green};
`;

const SpotifyBlob2 = styled(Blob)`
  bottom: -5%;
  right: -5%;
  width: 40%;
  height: 40%;
  background: ${({ theme }) => theme.colors.green};
`;

const SpotifyCard = styled(GlassBox)<IStyledSpotifyCard>`
  width: 100%;
  aspect-ratio: 346/500;
  padding: ${({ theme }) => theme.space.xl};
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 100%;
  }

  & > .title {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    text-align: center;
  }

  & > .album-cover-container {
    aspect-ratio: 1;
    overflow: hidden;
    position: relative;
  }

  & > .description-container-box {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.sm};

    & > .description {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.sm};
      flex: 1;
      overflow: hidden;

      & > .song-name {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: ${({ theme }) => theme.fontWeights.medium};
        white-space: nowrap;
        width: fit-content;
        animation: ${({ shouldScrollSongName }) =>
          shouldScrollSongName
            ? `scrollText 8s linear infinite alternate`
            : "unset"};
      }

      & > .artist-name {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSizes.md};
        white-space: nowrap;
        width: fit-content;
        animation: ${({ shouldScrollArtistsNames }) =>
          shouldScrollArtistsNames
            ? `scrollText 8s linear infinite alternate`
            : "unset"};
      }

      @keyframes scrollText {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    }
  }
`;

const SpotifyCardComponent: React.FC = () => {
  const [spotifyState, setSpotifyState] = useState<ISpotifyState>(null);

  const [loading, setLoading] = useState(true);

  const [shouldScrollSongName, setShouldScrollSongName] = useState(false);
  const [shouldScrollArtistName, setShouldScrollArtistName] = useState(false);

  useEffect(() => {
    fetchSpotifyData();
    let interval = setInterval(() => {
      fetchSpotifyData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // set auto horizontal scrolling for song name
  useEffect(() => {
    if (!spotifyState) return;

    // get width of description container
    const descriptionContainer = document.querySelector(
      ".description-container-box > .description"
    );
    const descriptionContainerWidth =
      descriptionContainer?.getBoundingClientRect().width;

    // get width of song name
    const songName = document.querySelector(".description > .song-name");
    const songNameWidth = songName?.getBoundingClientRect().width;

    // get width of artist name
    const artistName = document.querySelector(".description > .artist-name");
    const artistNameWidth = artistName?.getBoundingClientRect().width;

    if (!songNameWidth || !artistNameWidth || !descriptionContainerWidth)
      return;

    // if song name is wider than description container, set horizontal scrolling
    if (songNameWidth >= descriptionContainerWidth) {
      setShouldScrollSongName(true);
    } else {
      setShouldScrollSongName(false);
    }

    // if artist name is wider than description container, set horizontal scrolling
    if (artistNameWidth >= descriptionContainerWidth) {
      setShouldScrollArtistName(true);
    } else {
      setShouldScrollArtistName(false);
    }
  }, [spotifyState]);

  const fetchSpotifyData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/getspotifycurrentsong");
      setSpotifyState(data);
      setLoading(false);
    } catch (error) {
      setSpotifyState(DEFAULT_SPOTIFY_DATA);
      console.log(error);
    }
  };

  return (
    <CardContainer>
      <SpotifyBlob1 />
      <SpotifyBlob2 />
      <SpotifyCard
        shouldScrollArtistsNames={shouldScrollArtistName}
        shouldScrollSongName={shouldScrollSongName}
      >
        {loading && !spotifyState ? (
          <div>Loading...</div>
        ) : (
          spotifyState && (
            <>
              <div className="title">
                {spotifyState.currentlyPlaying
                  ? "Currently Vibing On"
                  : "Last Vibed On"}
              </div>
              <div className="album-cover-container">
                <Image
                  src={spotifyState.spotifyData.albumImage}
                  alt="album cover"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="description-container-box">
                <div className="description">
                  <div className="song-name">
                    {spotifyState.spotifyData.songName}
                  </div>
                  <div className="artist-name">
                    {spotifyState.spotifyData.artistsNames.join(", ")}
                  </div>
                </div>
                <div className="logo-container">
                  <Image
                    src="/spotify-logo.svg"
                    width={75}
                    height={75}
                    alt="spotify logo"
                  />
                </div>
              </div>
            </>
          )
        )}
      </SpotifyCard>
    </CardContainer>
  );
};

export default SpotifyCardComponent;
