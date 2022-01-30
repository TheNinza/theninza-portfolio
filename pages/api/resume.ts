import { GraphQLClient, gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

interface IGetResume {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const getresume: IGetResume = async (req, res) => {
  if (!NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    res.status(500).json({
      error: "No GraphQL Endpoint",
    });
    return;
  }

  const client = new GraphQLClient(NEXT_PUBLIC_GRAPHQL_ENDPOINT);

  const getResumeQuery = gql`
    query GetResume {
      resumes {
        id
        resumeFile {
          id
          url
        }
        downloads
      }
    }
  `;

  const data = await client.request(getResumeQuery);

  const url = data.resumes[0].resumeFile.url;

  res.redirect(url);
};

export default getresume;
