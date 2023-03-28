import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Blob, CardContainer, GlassBox } from "../config/styled-components";
import { ISpotifyData } from "../config/types/dataTypes";
import SmallLoader from "./small-loader";

type ISpotifyState = ISpotifyData | null;
interface IStyledSpotifyCard {
  readonly shouldScrollSongName: boolean;
  readonly shouldScrollArtistsNames: boolean;
}

const DEFAULT_SPOTIFY_DATA: ISpotifyData = {
  currentlyPlaying: true,
  spotifyData: {
    albumImage:
      "https://i.scdn.co/image/ab67616d0000b2733b524e973b13737390949a4f",
    songName: "tomorrow tonight",
    artistsNames: ["Loote"],
    previewUrl:
      "https://p.scdn.co/mp3-preview/7986df03af9d392bde2e3658dcf9232d359a7a05?cid=4b185668e20a45a7ab223bb96584e003",
  },
};

const SpotifyCardContainer = styled(CardContainer)`
  flex: 0.75;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex: 0.7;
  }
`;

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
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.space.xl};
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  justify-content: space-between;
  align-items: center;

  & > .audio-player {
    position: absolute;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
  }

  & > div {
    width: 100%;
  }

  & > .title {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    text-align: center;

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      gap: ${({ theme }) => theme.space.sm};
      width: 35%;
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
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

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      flex-direction: column;
      align-items: center;
    }

    & > .description {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.sm};
      flex: 1;
      overflow: hidden;

      @media only screen and (max-width: ${({ theme }) =>
          theme.breakpoints.lg}px) {
        align-items: center;
      }

      & > .song-name {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: ${({ theme }) => theme.fontWeights.medium};
        white-space: nowrap;
        width: fit-content;
        animation: ${({ shouldScrollSongName }) =>
          shouldScrollSongName
            ? `scrollText 8s linear infinite alternate`
            : "unset"};

        @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
          font-size: ${({ theme }) => theme.fontSizes.lg};
          white-space: unset;
          animation: unset;
          text-align: center;
        }
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

        @media only screen and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}px) {
          font-size: ${({ theme }) => theme.fontSizes.sm};
        }
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

    & > .logo-container {
      @media only screen and (max-width: ${({ theme }) =>
          theme.breakpoints.lg}px) {
        max-width: 35%;
      }
    }
  }
`;

const SpotifyCardComponent: React.FC = () => {
  const [spotifyState, setSpotifyState] = useState<ISpotifyState>(null);

  const [loading, setLoading] = useState(true);

  const [hasAudioPlayed, setHasAudioPlayed] = useState(false);

  const [shouldScrollSongName, setShouldScrollSongName] = useState(false);
  const [shouldScrollArtistName, setShouldScrollArtistName] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const spotifyCardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // hasAudioPlayed && window.umami("spotify-audio-play");
  }, [hasAudioPlayed]);

  // play audio on hover
  useEffect(() => {
    if (!spotifyState) return;

    const audio = audioRef.current;
    const spotifyCard = spotifyCardRef.current;

    let intervalIncreaseVol: NodeJS.Timeout;

    if (!audio || !spotifyCard) return;

    const playAudio = () => {
      audio.play();
      if (!hasAudioPlayed) {
        setHasAudioPlayed(true);
      }
    };

    const pauseAudio = () => {
      audio.pause();
    };

    const onMouseEnter = () => {
      if (intervalIncreaseVol) clearInterval(intervalIncreaseVol);
      audio.volume = 0;
      intervalIncreaseVol = setInterval(() => {
        if (audio.volume < 0.9) {
          audio.volume += 0.005;
        }
      }, 100);

      playAudio();
    };

    const onMouseLeave = () => {
      if (intervalIncreaseVol) clearInterval(intervalIncreaseVol);
      audio.volume = 0;
      pauseAudio();
    };

    const onClick = () => {
      if (audio.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    };

    spotifyCard.addEventListener("mouseenter", onMouseEnter);
    spotifyCard.addEventListener("mouseleave", onMouseLeave);
    spotifyCard.addEventListener("click", onClick);

    return () => {
      spotifyCard.removeEventListener("mouseenter", onMouseEnter);
      spotifyCard.removeEventListener("mouseleave", onMouseLeave);
      spotifyCard.removeEventListener("click", onClick);
      if (intervalIncreaseVol) clearInterval(intervalIncreaseVol);
    };
  }, [hasAudioPlayed, spotifyState]);

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
    <SpotifyCardContainer className="glassContainer">
      <SpotifyBlob1 />
      <SpotifyBlob2 />
      <SpotifyCard
        className="glassCard"
        shouldScrollArtistsNames={shouldScrollArtistName}
        shouldScrollSongName={shouldScrollSongName}
        ref={spotifyCardRef}
      >
        <SmallLoader isLoading={loading} isTransparent={true} />
        {spotifyState && (
          <>
            <audio
              className="audio-player"
              ref={audioRef}
              src={spotifyState.spotifyData.previewUrl}
              loop
            />
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
        )}
      </SpotifyCard>
    </SpotifyCardContainer>
  );
};

export default SpotifyCardComponent;
