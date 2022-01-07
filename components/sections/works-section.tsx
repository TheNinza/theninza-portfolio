import Link from "next/link";
import styled from "styled-components";
import { SectionTitle } from "../../config/styled-components";
import {
  IAchievement,
  IVolunteer,
  IResponsibility,
} from "../../config/types/dataTypes";
import CarouselComponent from "../carousel";

interface IProps {
  achievements: IAchievement[];
  volunteers: IVolunteer[];
  responsibilities: IResponsibility[];
}

const WorksSectionContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  overflow-y: hidden;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  gap: 5rem;

  border-top: 1px solid grey;

  /* center the container */
  margin: 0 auto;

  /* !TODO: remove before production */
  & * {
    opacity: 1 !important;
  }

  @media only screen and (max-width: 1560px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: 640px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const WorksFlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10rem;
`;

const WorksColumns = styled.div`
  height: 100%;
  width: calc(50vw- 6rem - 5rem);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
`;

const SubSection = styled.div`
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
`;

const SmallTitle = styled(SectionTitle)`
  font-size: 5rem;
  margin-left: unset;
  margin-right: unset;
  text-align: unset;
`;

const SubSectionBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: 2.5rem;
  & .link {
    display: inline-block;
    font-size: 3rem;
    transform: translateY(-1rem);
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  & .flexbox {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;

    & * {
      width: fit-content;
    }
  }
`;

const SpacedSubSectionTitle = styled(SectionTitle)`
  font-size: 2.2rem;
  letter-spacing: calc(2.2rem * 0.3);
  margin-left: unset;
  margin-right: unset;
  text-align: unset;
`;

const SubSectionDescription = styled.p`
  width: 100%;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const WorksSection: React.FC<IProps> = ({
  achievements,
  volunteers,
  responsibilities,
}) => {
  return (
    <WorksSectionContainer>
      <WorksFlexContainer>
        <WorksColumns>
          <SubSection>
            <SmallTitle>
              My <span className="emphasisRedText">Achievements</span>
            </SmallTitle>
            <CarouselComponent>
              {achievements.map((achievement) => (
                <SubSectionBody key={achievement.id}>
                  <div className="flexbox">
                    <SpacedSubSectionTitle>
                      🏆{achievement.name}
                    </SpacedSubSectionTitle>
                    <span className="link">
                      <Link
                        href={achievement.relevantLink}
                        as={achievement.relevantLink}
                        passHref
                      >
                        <a>🔗</a>
                      </Link>
                    </span>
                  </div>
                  {achievement.description.split("\n").map((paragraph, i) => (
                    <SubSectionDescription key={i}>
                      {paragraph}
                    </SubSectionDescription>
                  ))}
                </SubSectionBody>
              ))}
            </CarouselComponent>
          </SubSection>
          <SubSection>
            <SmallTitle>
              I <span className="emphasisGreenText">Volunteer</span>
            </SmallTitle>
            <CarouselComponent>
              {volunteers.map((volunteer) => (
                <SubSectionBody key={volunteer.id}>
                  <div className="flexbox">
                    <SpacedSubSectionTitle>
                      ☮️{volunteer.name}
                    </SpacedSubSectionTitle>
                    <span className="link">
                      <Link
                        href={volunteer.relevantLink}
                        as={volunteer.relevantLink}
                        passHref
                      >
                        <a>🔗</a>
                      </Link>
                    </span>
                  </div>
                  {volunteer.description.split("\n").map((paragraph, i) => (
                    <SubSectionDescription key={i}>
                      {paragraph}
                    </SubSectionDescription>
                  ))}
                </SubSectionBody>
              ))}
            </CarouselComponent>
          </SubSection>
        </WorksColumns>
        <WorksColumns>
          <SubSection>
            <SmallTitle>
              My <span className="emphasisBlueText">Experience</span>
            </SmallTitle>
            <CarouselComponent>
              {responsibilities.map((responsibility) => (
                <SubSectionBody key={responsibility.id}>
                  <SpacedSubSectionTitle>
                    🧑🏻‍💻{responsibility.name}
                  </SpacedSubSectionTitle>
                  <div>
                    <div className="flexbox">
                      <SubSectionDescription>
                        🗓{" "}
                        {`${
                          new Date(responsibility.startDate)
                            .toString()
                            .split(" ")[1]
                        } ${new Date(
                          responsibility.startDate
                        ).getFullYear()}`}{" "}
                        -{" "}
                        {responsibility.isOngoing
                          ? "Ongoing"
                          : `${
                              new Date(responsibility.endDate)
                                .toString()
                                .split(" ")[1]
                            } ${new Date(
                              responsibility.endDate
                            ).getFullYear()}`}
                      </SubSectionDescription>
                      <SubSectionDescription>
                        📍 {responsibility.location}
                      </SubSectionDescription>
                    </div>
                  </div>
                  {responsibility.description
                    .split("\n")
                    .map((paragraph, i) => (
                      <SubSectionDescription key={i}>
                        {paragraph}
                      </SubSectionDescription>
                    ))}
                </SubSectionBody>
              ))}
            </CarouselComponent>
          </SubSection>
        </WorksColumns>
      </WorksFlexContainer>
    </WorksSectionContainer>
  );
};

export default WorksSection;
