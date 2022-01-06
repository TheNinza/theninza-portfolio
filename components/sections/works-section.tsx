import styled from "styled-components";
import { SectionTitle } from "../../config/styled-components";
import {
  IAchievement,
  IVolunteer,
  IResponsibility,
} from "../../config/types/dataTypes";

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
  gap: ${({ theme }) => theme.space.xxl};
`;

const WorksColumns = styled.div`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
`;

const SubSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const SmallTitle = styled(SectionTitle)`
  font-size: 5rem;
  margin-left: unset;
  margin-right: unset;
  text-align: unset;
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
          </SubSection>
          <SubSection>
            <SmallTitle>
              I <span className="emphasisGreenText">Volunteer</span>
            </SmallTitle>
          </SubSection>
        </WorksColumns>
        <WorksColumns>
          <SubSection>
            <SmallTitle>
              My <span className="emphasisBlueText">Experience</span>
            </SmallTitle>
          </SubSection>
        </WorksColumns>
      </WorksFlexContainer>
    </WorksSectionContainer>
  );
};

export default WorksSection;
