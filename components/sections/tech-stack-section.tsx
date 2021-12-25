import { FC } from "react";
import styled from "styled-components";

const TechStackSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;

  border-top: 1px solid grey;

  /* center the container */
  margin: 0 auto;

  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const TechSectionTitle = styled.h2`
  font-size: 7vw;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-left: auto;
  margin-right: auto;
  /* 
  & .letterHeading {
    display: inline-block;
    transition: all 0.3s ease-out;

    &:hover {
      transform: scale(1.1) translateY(-10px) rotate(5deg);
    }
  } */

  .emphasisRedText {
    color: ${({ theme }) => theme.colors.lightRed};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 6.9vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 10vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 12vw;
  }
`;

const TechStackSection: FC = () => {
  return (
    <TechStackSectionContainer>
      <TechSectionTitle>
        I know <span className="emphasisRedText">Technologies</span>
      </TechSectionTitle>
    </TechStackSectionContainer>
  );
};

export default TechStackSection;
