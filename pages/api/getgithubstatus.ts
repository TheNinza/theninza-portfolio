import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { IGithubData } from "../../config/types/dataTypes";

// get interface from dummy data
interface IGitHubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: {
      sha: string;
      author: {
        email: string;
        name: string;
      };
      message: string;
      distinct: boolean;
      url: string;
    }[];
  };
  public: boolean;
  created_at: string;
}

interface IErrorResponse {
  error: string;
}

type ResponseData = IGithubData[];

interface IGetGithubStatus {
  (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | IErrorResponse>
  ): Promise<void>;
}

const transFormData = (data: IGitHubEvent[]): ResponseData => {
  const modifiedData = new Map<string, number>();

  data.forEach((event) => {
    // get date from event
    const date = new Date(event.created_at);

    // dateString is UNIX timestamp withoud time
    const dateString = date.toISOString().split("T")[0];

    // get number of events from map
    let numEvents = modifiedData.get(dateString);

    // if not found, set to 0
    if (!numEvents) {
      numEvents = 0;
    }

    // increment number of events
    numEvents++;

    // set number of events to map
    modifiedData.set(dateString, numEvents);
  });

  // check if last 10 days are present if any of them are not present, add them
  // and set number of events to 0

  const today = new Date();

  for (let i = 0; i < 10; i++) {
    // set date to today - i days
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);

    const dateString = date.toISOString().split("T")[0];

    if (!modifiedData.has(dateString)) {
      modifiedData.set(dateString, 0);
    }
  }

  // convert map to array
  const modifiedDataArray = Array.from(modifiedData);

  // sort array by date
  modifiedDataArray.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);

    return dateB.getTime() - dateA.getTime();
  });
  return modifiedDataArray.map(([date, numEvents]) => ({
    date,
    numEvents,
  }));
};

const getgithubstatus: IGetGithubStatus = async (req, res) => {
  try {
    const { data } = await axios.get<IGitHubEvent[]>(
      "https://api.github.com/users/theninza/events?per_page=100"
    );

    let response = transFormData(data).slice(0, 10);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default getgithubstatus;
