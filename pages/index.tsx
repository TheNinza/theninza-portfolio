import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const BigHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

// a responsive container for the page
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-left: ${({ theme }) => theme.space.xxl};
  padding-right: ${({ theme }) => theme.space.xxl};
  padding-top: ${({ theme }) => theme.space.xl};
  padding-bottom: ${({ theme }) => theme.space.xl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.space.lg};
    padding-right: ${({ theme }) => theme.space.lg};
    padding-top: ${({ theme }) => theme.space.xl};
    padding-bottom: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.space.md};
    padding-right: ${({ theme }) => theme.space.md};
    padding-top: ${({ theme }) => theme.space.xl};
    padding-bottom: ${({ theme }) => theme.space.xl};
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>🙋🏻‍♂️ Nikhil Gupta</title>
      </Head>
      <Container>
        <BigHeading>Hey, I am Nikhil</BigHeading>
        <BigHeading>I am a Full Stack Developer</BigHeading>
      </Container>
    </>
  );
};

export default Home;
