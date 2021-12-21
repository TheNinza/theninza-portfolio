import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import HeroSection from "../components/sections/hero-section";

// a responsive container for the page
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-left: ${({ theme }) => theme.space.xxl};
  padding-right: ${({ theme }) => theme.space.xxl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: ${({ theme }) => theme.space.lg};
    padding-right: ${({ theme }) => theme.space.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-left: ${({ theme }) => theme.space.md};
    padding-right: ${({ theme }) => theme.space.md};
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>🙋🏻‍♂️ Nikhil Gupta</title>
      </Head>
      <Container>
        <HeroSection />
      </Container>
    </>
  );
};

export default Home;
