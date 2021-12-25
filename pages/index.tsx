import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import HeroSection from "../components/sections/hero-section";
import TechStackSection from "../components/sections/tech-stack-section";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowWidth = window.innerWidth;

    const skewConfigs = {
      ease: 0.1,
      current: 0,
      prevous: 0,
      rounded: 0,
    };

    const skewScrolling = () => {
      if (!windowWidth || !containerRef.current) return;

      skewConfigs.current = window.scrollY;
      skewConfigs.prevous +=
        (skewConfigs.current - skewConfigs.prevous) * skewConfigs.ease;

      skewConfigs.rounded = Math.round(skewConfigs.prevous * 100) / 100;

      // variables
      const difference = skewConfigs.current - skewConfigs.rounded;
      const acceleration = difference / windowWidth;
      const velocity = +acceleration;
      const skew = velocity * 7.5;

      containerRef.current.style.transform = `skewY(${skew}deg)`;

      requestAnimationFrame(skewScrolling);
    };
    requestAnimationFrame(skewScrolling);
  }, []);

  return (
    <>
      <Head>
        <title>🙋🏻‍♂️ Nikhil Gupta</title>
      </Head>
      <Container ref={containerRef}>
        <HeroSection />
        <TechStackSection />
      </Container>
    </>
  );
};

export default Home;
