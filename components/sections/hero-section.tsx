import styled from "styled-components";

// styled-components

const HeroSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* center the container */
  margin: 0 auto;
  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const BigHeading = styled.h1`
  font-size: 7vw;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  @media only screen and (max-width: 1050px) {
    font-size: 5rem;
  }
  @media only screen and (max-width: 640px) {
    font-size: 4rem;
  }
  @media only screen and (max-width: 510px) {
    font-size: 3rem;
  }
`;

const OutlinedBigHeading = styled(BigHeading)`
  color: transparent;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.textPrimary};
  margin-top: 5rem;
`;

const HeroSection = () => {
  return (
    <HeroSectionContainer>
      <BigHeading>Hi, I&apos;m Nikhil.</BigHeading>
      <BigHeading>I&apos;m a full stack developer.</BigHeading>
      <OutlinedBigHeading>&ldquo;That&apos;s it??&rdquo;</OutlinedBigHeading>
    </HeroSectionContainer>
  );
};

export default HeroSection;
