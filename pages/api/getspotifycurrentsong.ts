import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { AxiosError } from "axios";
import { ISpotifyData } from "../../config/types/dataTypes";

interface IErrorResponse {
  error: string;
}

interface IGetSpotifyCurrentSong {
  (
    req: NextApiRequest,
    res: NextApiResponse<ISpotifyData | IErrorResponse>
  ): Promise<void>;
}

const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const getRefreshedAccessToken = async () => {
  if (!refreshToken) {
    throw new Error(
      "SPOTIFY_REFRESH_TOKEN is not defined. Visit /api/login/getAuthorization from a web browser to get a new token."
    );
  }

  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", refreshToken);

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    formData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    }
  );

  return data;
};

const getCurrentSongDataAndStatus = async (accessToken: string) => {
  let data, status;

  try {
    const { data: axiosData, status: axiosStatus } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing?market=IN&additional_types=track",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    data = axiosData;
    status = axiosStatus;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      data = undefined;
      status = axiosError.response.status;
    } else {
      throw axiosError;
    }
  }

  return { data, status };
};

const getLastPlayingSongAndStatus = async (accessToken: string) => {
  let data, status;

  try {
    const { data: axiosData, status: axiosStatus } = await axios.get(
      `https://api.spotify.com/v1/me/player/recently-played?limit=1&market=IN`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    data = axiosData;
    status = axiosStatus;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      data = undefined;
      status = axiosError.response.status;
    } else {
      throw axiosError;
    }
  }

  return { data, status };
};

const transformData = (data: any) => {
  if (!data) {
    return undefined;
  }
  const {
    album: { images },
    name,
    artists,
    preview_url,
  } = data;
  // get at max 2 artists
  const artistsNames: string[] = artists
    .slice(0, 2)
    .map((artist: any) => artist.name);
  return {
    albumImage: images[0].url,
    songName: name,
    artistsNames,
    previewUrl: preview_url,
  };
};

const getSpotifyCurrentSong: IGetSpotifyCurrentSong = async (req, res) => {
  try {
    let { access_token } = req.cookies;

    if (!access_token) {
      const { access_token: newAccessToken } = await getRefreshedAccessToken();
      access_token = newAccessToken;

      res.setHeader("Set-Cookie", [
        `access_token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}`,
      ]);

      console.log("New access token:", access_token);
    }

    // getting currently playing song

    let spotifyData;

    const { data, status } = await getCurrentSongDataAndStatus(access_token);

    spotifyData = transformData(data?.item);

    // if access token is expired, get a new one

    if (status === 401) {
      const { access_token: newAccessToken } = await getRefreshedAccessToken();
      access_token = newAccessToken;

      res.setHeader("Set-Cookie", [
        `access_token=${access_token}; path=/; max-age=${60 * 60}`,
      ]);

      console.log("New access token:", access_token);

      // try again

      const { data, status } = await getCurrentSongDataAndStatus(access_token);

      if (status === 401) {
        throw new Error("Could not get a new access token.");
      }

      spotifyData = transformData(data?.item);
    }

    if (spotifyData) {
      return res.status(200).json({
        currentlyPlaying: true,
        spotifyData,
      });
    }

    // getting last played song

    const { data: data2, status: status2 } = await getLastPlayingSongAndStatus(
      access_token
    );

    spotifyData = transformData(data2?.items[0]?.track);

    if (status2 === 401) {
      const { access_token: newAccessToken } = await getRefreshedAccessToken();
      access_token = newAccessToken;

      res.setHeader("Set-Cookie", [
        `access_token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}`,
      ]);

      console.log("New access token:", access_token);

      // try again

      const { data: data2, status: status2 } =
        await getLastPlayingSongAndStatus(access_token);

      if (status2 === 401) {
        throw new Error("Could not get a new access token.");
      }

      spotifyData = transformData(data2?.items[0]?.track);
    }

    if (!spotifyData) {
      throw new Error("Could not get data from Spotify.");
    }

    res.status(200).json({
      currentlyPlaying: false,
      spotifyData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getSpotifyCurrentSong;
