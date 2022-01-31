import { GraphQLClient, gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface IGetResume {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const GRAPHCMS_AUTH_TOKEN = process.env.GRAPHCMS_AUTH_TOKEN;

// get resume data query
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

// increase download count query and publish
const updateDownloadsQuery = gql`
  mutation UpdateDownloads($id: ID!, $downloads: Int!) {
    updateResume(where: { id: $id }, data: { downloads: $downloads }) {
      id
      downloads
    }
    publishResume(where: { id: $id }) {
      id
    }
  }
`;

const getresume: IGetResume = async (_, res) => {
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

  const {
    resumes: [resume],
  } = await client.request(getResumeQuery);

  if (!resume) {
    res.status(500).json({
      error: "No resume found",
    });
    return;
  }

  const {
    id,
    resumeFile: { url: pdfUrl },
    downloads,
  } = resume;

  console.log("earlier downloads", downloads);

  const updateMutationData = await client.request(updateDownloadsQuery, {
    id,
    downloads: downloads + 1,
  });

  console.log(updateMutationData);

  const urlContent = await axios.get(pdfUrl, {
    responseType: "stream",
  });

  res.setHeader("Content-Type", "application/pdf");

  urlContent.data.pipe(res);

  return;
};

export default getresume;
