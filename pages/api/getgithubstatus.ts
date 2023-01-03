import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  IGithubData,
  IGithubGraphqlResponse,
} from "../../config/types/dataTypes";

const BEARER_TOKEN = process.env.GITHUB_BEARER_TOKEN;

const getgithubstatus = async (
  _req: NextApiRequest,
  res: NextApiResponse<IGithubData[] | { error: string }>
) => {
  const today = new Date().toISOString();
  const lastWeekToday = new Date(
    new Date().getTime() - 10 * 24 * 60 * 60 * 1000
  ).toISOString();

  const query = `
    query {
      user(login: "theninza") {
        contributionsCollection(from: "${lastWeekToday}", to: "${today}") {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post<IGithubGraphqlResponse>(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          Authorization: `bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const data =
      response.data.data.user.contributionsCollection.contributionCalendar.weeks
        .map((week) => week.contributionDays)
        .flat()
        .map((day) => ({
          date: day.date,
          numEvents: day.contributionCount,
        }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getgithubstatus;
