import gsap from "gsap";
import Link from "next/link";
import { useCallback, useState } from "react";
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

  position: relative;

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
  gap: (${({ theme }) => theme.space.xxl});

  position: relative;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.xxl}px) {
    gap: 6rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    gap: 4rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    flex-direction: column;
    gap: 2rem;
    justify-content: start;
  }
`;

const WorksColumns = styled.div`
  height: 100%;
  width: calc(50vw- 6rem - 5rem);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
  width: calc(50% - (${({ theme }) => theme.space.xxl} / 2));

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.lg};
    width: unset;
  }
`;

const SubSection = styled.div`
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    min-height: 10vh;
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const SmallTitle = styled(SectionTitle)`
  font-size: 4.5vw;
  margin-left: unset;
  margin-right: unset;
  text-align: unset;
  opacity: 0;
  white-space: nowrap;
  & .smallTitleLetter {
    opacity: 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 3.2rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 2.5rem;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    text-align: center;
  }
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

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      font-size: 2.5rem;
    }
  }

  & .flexbox {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.lg}px) {
      &.experience {
        flex-direction: column;
      }
    }

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
  opacity: inherit;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 1.8rem;
    letter-spacing: calc(2.2rem * 0.2);
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 1.5rem;
    letter-spacing: calc(1.5rem * 0.3);
  }
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

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: 1rem;
  }
`;

const WorksSection: React.FC<IProps> = ({
  achievements,
  volunteers,
  responsibilities,
}) => {
  const [showCarousel, setShowCarousel] = useState<boolean>(false);

  const worksSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      ([section]) => {
        if (section.isIntersecting && section.boundingClientRect.y > 0) {
          const smallTitles = document.querySelectorAll(".smallTitle");
          smallTitles.forEach((smallTitle) => {
            const child = smallTitle.childNodes;

            const textOutSideSpan = child[0].nodeValue;
            const textInsideSpan = child[1].textContent;

            if (!textInsideSpan) return;
            if (!textOutSideSpan) return;

            const textOutSideSpanArray = textOutSideSpan.split("");
            const textInsideSpanArray = textInsideSpan.split("");

            const spansOutSide = textOutSideSpanArray.map((letter, index) => {
              const span = document.createElement("span");
              span.textContent = letter;
              span.classList.add("smallTitleletter");
              return span;
            });

            const outSideNode = document.createElement("span");
            // add the spans to the outSideNode
            spansOutSide.forEach((span) => outSideNode.appendChild(span));

            // remove textOutsideSpan
            smallTitle.replaceChild(outSideNode, child[0]);

            const spansInside = textInsideSpanArray.map((letter, index) => {
              const span = document.createElement("span");
              span.textContent = letter;
              span.classList.add("smallTitleletter");
              return span;
            });

            const insideNode = document.createElement("span");
            // add the spans to the insideNode
            spansInside.forEach((span) => insideNode.appendChild(span));

            // add the insideNode to the smallTitle child[1]
            child[1].replaceChild(insideNode, child[1].childNodes[0]);
          });

          // set opacity 1 after spans are created

          const smallTitleLetters =
            document.querySelectorAll(".smallTitleletter");

          smallTitleLetters.forEach((letter) => {
            const el = letter as HTMLElement;
            el.style.opacity = "0";
          });

          smallTitles.forEach((t) => {
            const el = t as HTMLElement;
            el.style.opacity = "1";
          });

          smallTitleLetters.forEach((smallTitleLetter) => {
            const letter = smallTitleLetter as HTMLElement;

            if (letter.textContent === " ") return;
            letter.style.display = "inline-block";

            const { left, top } = letter.getBoundingClientRect();

            const leftMargin = -left;
            const rightMargin = el.scrollWidth - leftMargin;

            const topMargin = top - el.getBoundingClientRect().top;
            const bottomMargin = el.scrollHeight - topMargin;

            let randomLeft = leftMargin + Math.random() * rightMargin;
            let randomTop = topMargin + Math.random() * bottomMargin;

            const tl = gsap.timeline({
              onComplete: () => {
                setShowCarousel(true);
              },
            });

            tl.to(letter, {
              duration: 0.1,
              x: randomLeft,
              y: randomTop,
            })
              .fromTo(
                letter,
                {
                  opacity: 0,
                  rotate: Math.random() * 720,
                },
                {
                  duration: 0.5,
                  opacity: 1,
                  delay: Math.random() * 2,
                }
              )
              .to(letter, {
                x: 0,
                y: 0,
                rotate: 0,
                duration: Math.random() * 1 + 0.5,
              });
          });

          // analytics
          // window.umami("section-visit-works");

          observer.disconnect();
        }
      },
      {
        threshold: window.innerWidth > 800 ? 0.7 : 0.1,
      }
    );

    observer.observe(el);
  }, []);

  return (
    <WorksSectionContainer ref={worksSectionRef}>
      <WorksFlexContainer>
        <WorksColumns>
          <SubSection>
            <SmallTitle className="smallTitle">
              My <span className="emphasisRedText">Achievements</span>
            </SmallTitle>
            <CarouselComponent showCarousel={showCarousel}>
              {achievements.map((achievement) => (
                <SubSectionBody key={achievement.id}>
                  <div className="flexbox">
                    <SpacedSubSectionTitle>
                      🏆{achievement.name}
                    </SpacedSubSectionTitle>
                    <span className="link">
                      <Link href={achievement.relevantLink} passHref>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`umami--click--external_${achievement.name
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        >
                          🔗
                        </a>
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
            <SmallTitle className="smallTitle">
              I <span className="emphasisGreenText">Volunteer</span>
            </SmallTitle>
            <CarouselComponent showCarousel={showCarousel}>
              {volunteers.map((volunteer) => (
                <SubSectionBody key={volunteer.id}>
                  <div className="flexbox">
                    <SpacedSubSectionTitle>
                      ☮️{volunteer.name}
                    </SpacedSubSectionTitle>
                    <span className="link">
                      <Link href={volunteer.relevantLink} passHref>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`umami--click--external_${volunteer.name
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                        >
                          🔗
                        </a>
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
            <SmallTitle className="smallTitle">
              My <span className="emphasisBlueText">Experience</span>
            </SmallTitle>
            <CarouselComponent showCarousel={showCarousel}>
              {responsibilities.map((responsibility) => (
                <SubSectionBody key={responsibility.id}>
                  <SpacedSubSectionTitle>
                    🧑🏻‍💻{responsibility.name}
                  </SpacedSubSectionTitle>
                  <div>
                    <div className="flexbox experience">
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
