import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

const BigHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Image src="/vercel.svg" alt="Vercel Logo" width={300} height={300} />
        <BigHeading>Hello World!</BigHeading>
      </div>
    </>
  );
};

export default Home;
