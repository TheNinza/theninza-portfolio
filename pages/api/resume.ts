import { GraphQLClient, gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface IGetResume {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const GRAPHCMS_AUTH_TOKEN = process.env.GRAPHCMS_AUTH_TOKEN;

const getresume: IGetResume = async (req, res) => {
  if (!NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    res.status(500).json({
      error: "No GraphQL Endpoint",
    });
    return;
  }

  const client = new GraphQLClient(NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${GRAPHCMS_AUTH_TOKEN}`,
    },
  });

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

  const pdfUrl = data.resumes[0].resumeFile.url;

  const urlContent = await axios.get(pdfUrl, {
    responseType: "stream",
  });

  res.setHeader("Content-Type", "application/pdf");

  urlContent.data.pipe(res);

  return;
};

export default getresume;
