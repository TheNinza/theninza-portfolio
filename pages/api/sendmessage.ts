import { gql, GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

interface ISendMessage {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

const NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const GRAPHCMS_AUTH_TOKEN = process.env.GRAPHCMS_AUTH_TOKEN;

const sendMessageQuery = gql`
  mutation sendMessage($email: String!, $message: String!) {
    createMessage(data: { email: $email, message: $message }) {
      id
    }
  }
`;

const sendMessage: ISendMessage = async (req, res) => {
  // get data from body
  const { email, message } = req.body;

  // check if all data is present
  if (!email || !message) {
    res.status(400).json({
      error: "Missing data",
    });
    return;
  }

  // check if message is longer than 500 characters
  if (message.length > 500) {
    res.status(400).json({
      error: "Message is too long",
    });
    return;
  }

  // check if environment variables are set
  if (!NEXT_PUBLIC_GRAPHQL_ENDPOINT || !GRAPHCMS_AUTH_TOKEN) {
    res.status(500).json({
      error: "Something went wrong",
    });
    return;
  }

  // create graphql client
  const client = new GraphQLClient(NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${GRAPHCMS_AUTH_TOKEN}`,
    },
  });

  try {
    // send message
    const {
      createMessage: { id },
    } = await client.request(sendMessageQuery, {
      email,
      message,
    });

    // send response
    res.status(200).json({
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export default sendMessage;
