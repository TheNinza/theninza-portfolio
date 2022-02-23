import { gql } from "graphql-request";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import APeekInLifeSection from "../components/sections/a-peek-in-life-section";
import ApplicationsSection from "../components/sections/applications-section";
import ContactSection from "../components/sections/contact-section";
import HeroSection from "../components/sections/hero-section";
import TechStackSection from "../components/sections/tech-stack-section";
import WorksSection from "../components/sections/works-section";
import { client } from "../config/graphql-request";
import type {
  IAchievement,
  IApplication,
  IResponsibility,
  IStack,
  IVolunteer,
} from "../config/types/dataTypes";

// types
type IInitialHomePageProps = {
  stacks: IStack[];
  applications: IApplication[];
  achievements: IAchievement[];
  volunteers: IVolunteer[];
  responsibilities: IResponsibility[];
};

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

const Home: NextPage = ({
  initialHomePageProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        {/* <!-- Primary Meta Tags --> */}
        <title>🙋🏻‍♂️ Nikhil Gupta</title>
        <meta name="title" content="🙋🏻‍♂️ Nikhil Gupta" />
        <meta
          name="keywords"
          content="Nikhil, FrontEnd, Developer, TheNinza, Ninza, Ninja, ninza, theninza, web, web developer, iiit"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Nikhil Gupta" />

        <meta
          name="description"
          content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theninza.me/" />
        <meta property="og:title" content="🙋🏻‍♂️ Nikhil Gupta" />
        <meta
          property="og:description"
          content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
        />
        <meta property="og:image" content="/metaImg.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://theninza.me/" />
        <meta property="twitter:title" content="🙋🏻‍♂️ Nikhil Gupta" />
        <meta
          property="twitter:description"
          content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
        />
        <meta property="twitter:image" content="/metaImg.png" />
      </Head>
      <Container ref={containerRef}>
        <HeroSection />
        <TechStackSection stacks={initialHomePageProps.stacks} />
        <ApplicationsSection applications={initialHomePageProps.applications} />
        <WorksSection
          achievements={initialHomePageProps.achievements}
          responsibilities={initialHomePageProps.responsibilities}
          volunteers={initialHomePageProps.volunteers}
        />
        <APeekInLifeSection />
        <ContactSection />
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
    query InitialData {
      stacks {
        id
        name
        image {
          url
          fileName
        }
      }
      applications {
        id
        name
        description
        image {
          url
          fileName
        }
        liveUrl
        sourceCodeUrl
        stacks {
          id
          name
          image {
            url
            fileName
          }
        }
      }
      achievements {
        id
        name
        description
        relevantLink
      }
      volunteers {
        id
        name
        description
        relevantLink
      }
      responsibilities {
        id
        name
        location
        description
        startDate
        endDate
        isOngoing
      }
    }
  `;

  const data = await client.request(query);

  const initialHomePageProps: IInitialHomePageProps = {
    stacks: data.stacks,
    applications: data.applications,
    achievements: data.achievements,
    volunteers: data.volunteers,
    responsibilities: data.responsibilities,
  };

  return {
    props: { initialHomePageProps },
  };
};
