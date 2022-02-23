import { gql } from "graphql-request";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import MetaTags from "../components/metatags";
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
      <MetaTags />
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
