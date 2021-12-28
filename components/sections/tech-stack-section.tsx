import { FC, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import gsap from "gsap";
import { SectionTitle as TechSectionTitle } from "../../config/styled-components";

interface IStack {
  id: string;
  name: string;
  image: {
    url: string;
    fileName: string;
  };
}

interface IStyledTechImageContainer {
  readonly name: string;
}

const stacks: IStack[] = [
  {
    id: "ckvtrai140jab0b76jka1wf4w",
    name: "Gatsby",
    image: {
      url: "https://media.graphcms.com/hlt78bGjSbOyzC78c8Gm",
      fileName: "logo-gatsby.svg",
    },
  },
  {
    id: "ckvtrbcw80ipe0a32oan9wsp8",
    name: "Github",
    image: {
      url: "https://media.graphcms.com/riA5ZRihTmOAQ3BUEXMb",
      fileName: "logo-github.svg",
    },
  },
  {
    id: "ckvtrbogw0glr0b4212tba1k2",
    name: "Redux",
    image: {
      url: "https://media.graphcms.com/zA9gBxOGRpy366vwWTOT",
      fileName: "logo-redux.svg",
    },
  },
  {
    id: "ckvtrc1l40gm20a8407hpi0wn",
    name: "Scss",
    image: {
      url: "https://media.graphcms.com/oNlTDn0Ra6P50Pe9kzLt",
      fileName: "logo-scss.svg",
    },
  },
  {
    id: "ckvtrcik80go60a841q4ryrlz",
    name: "Docker",
    image: {
      url: "https://media.graphcms.com/ELDgJx2bT6uvFD4QtYKC",
      fileName: "logo-docker.svg",
    },
  },
  {
    id: "ckvtrcr1s0iu10a32l6mpvh3u",
    name: "Next",
    image: {
      url: "https://media.graphcms.com/FzVTatbwRL6L1kEBsYB1",
      fileName: "logo-nextjs.svg",
    },
  },
  {
    id: "ckvtrczjc0jkf0b76q9iuik56",
    name: "React",
    image: {
      url: "https://media.graphcms.com/22xHBglkRfuWzSqbHuue",
      fileName: "logo-react.svg",
    },
  },
  {
    id: "ckvtrdac80gw80a84g8781ou8",
    name: "MaterialUI",
    image: {
      url: "https://media.graphcms.com/r4OpfMxTNek9UmyVPllg",
      fileName: "logo-materialui.svg",
    },
  },
  {
    id: "ckvtrdwps0h0g0b420e8sk15t",
    name: "MongoDB",
    image: {
      url: "https://media.graphcms.com/JJAeeKlTTwntDHAnFTwb",
      fileName: "logo-mongodb.svg",
    },
  },
  {
    id: "ckvtre5z40j6b0a32kgtk1e7s",
    name: "GraphQL",
    image: {
      url: "https://media.graphcms.com/qdLt6cjqThSzj46Uvz4l",
      fileName: "logo-graphql.svg",
    },
  },
  {
    id: "ckvtreohs0h7p0a84qtipco7c",
    name: "ReduxSaga",
    image: {
      url: "https://media.graphcms.com/2iMBPmdR6CVHW1BzQqjF",
      fileName: "logo-redux-saga.svg",
    },
  },
  {
    id: "ckvtreyiw0ha90a84j17p6agx",
    name: "Strapi",
    image: {
      url: "https://media.graphcms.com/Lt3228KLShmH4GvySceP",
      fileName: "logo-strapi.svg",
    },
  },
  {
    id: "ckvtrf5gw0k2s0b76hxksuyc6",
    name: "Stripe",
    image: {
      url: "https://media.graphcms.com/1s5SxjZQ8WNuBkwT0yVW",
      fileName: "logo-stripe.svg",
    },
  },
  {
    id: "ckvtrfsm80hdq0b42k6kt54hv",
    name: "Firebase",
    image: {
      url: "https://media.graphcms.com/eUbgCOIQ1GTV8LZniLcK",
      fileName: "logo-firebase.svg",
    },
  },
  {
    id: "ckvtrgp0w0hhv0b42ed0uk3cb",
    name: "TypeScript",
    image: {
      url: "https://media.graphcms.com/sBslm5pIRghDt2NsRRgh",
      fileName: "logo-typescript.svg",
    },
  },
  {
    id: "ckvtrgzts0hiw0b42pgvv2fsx",
    name: "Node",
    image: {
      url: "https://media.graphcms.com/Ko8JB2fgQIi07RKwym6A",
      fileName: "logo-nodejs.svg",
    },
  },
  {
    id: "ckvtrh7jk0hk00a84ob68nuhh",
    name: "Git",
    image: {
      url: "https://media.graphcms.com/rovJT4yTHWfojYnE9HlQ",
      fileName: "logo-git.svg",
    },
  },
  {
    id: "ckvtrhehk0kck0b76ejgopg10",
    name: "WebRTC",
    image: {
      url: "https://media.graphcms.com/30uNILFTnunZIgVCjp2A",
      fileName: "logo-webrtc.svg",
    },
  },
];

const TechStackSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  overflow-y: hidden;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};

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

const AllTechContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xxl};
  align-items: flex-start;
  justify-content: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    gap: ${({ theme }) => theme.space.xl};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: ${({ theme }) => theme.space.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${({ theme }) => theme.space.md};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    gap: ${({ theme }) => theme.space.sm};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    gap: ${({ theme }) => theme.space.xs};
  }
`;

const TechImageContainer = styled.div<IStyledTechImageContainer>`
  position: relative;
  height: 12vh;
  width: fit-content;
  margin: 1rem 0;
  opacity: 0;

  transition: all 0.3s ease-out;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    margin: 0 1rem;
    height: 10vh;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: 8vh;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 7vh;
  }

  &::after {
    content: ${({ name }) => `"${name}"`};
    position: absolute;
    bottom: -2rem;
    left: 0;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.lightRed};
    border-radius: 5px;
    opacity: 0;
    transition: all 0.3s ease-out;
    transform: translate(-50%, -50%) scale(1);
  }

  &:hover {
    transform: scale(0.9) translateY(-10px) rotate(5deg) !important;

    &::after {
      opacity: 1;
      transform: translate(0, -10px) scale(1.2);
    }
  }

  & * {
    min-height: unset !important;
    max-height: unset !important;
    min-width: unset !important;
    max-width: unset !important;
  }

  & span {
    height: 100% !important;
    position: static !important;
  }

  & img {
    position: static !important;
    height: 100% !important;
    width: unset !important;
  }
`;

const TechStackSection: FC = () => {
  const techStackSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([section]) => {
        if (section.isIntersecting) {
          const techImages = el.querySelectorAll(".techImage");

          gsap.fromTo(
            ".techSectionTitle",
            {
              opacity: 0,
              y: "4rem",
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            }
          );

          techImages.forEach((techImage) => {
            // generate a random left and top position for the image depending on the el size

            let randomLeft = Math.floor(Math.random() * el.offsetWidth);
            let randomTop = Math.floor(Math.random() * el.offsetHeight);

            const randomPositiveOrNegative1 = Math.random() < 0.5 ? -1 : 1;
            randomLeft *= randomPositiveOrNegative1;

            const randomPositiveOrNegative2 = Math.random() < 0.5 ? -1 : 1;
            randomTop *= randomPositiveOrNegative2;

            const tl = gsap.timeline();

            tl.to(techImage, {
              duration: 0.1,
              x: randomLeft,
              y: randomTop,
            })
              .fromTo(
                techImage,
                {
                  opacity: 0,
                  scale: 0.8,
                },
                {
                  duration: 0.5,
                  opacity: 1,
                  scale: 1.2,
                  ease: "power3.inOut",
                  delay: Math.random() * 2,
                }
              )
              .to(techImage, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "power3.inOut",
                delay: Math.random() * 1,
              })
              .to(techImage, {
                scale: 1,
                duration: 0.5,
                ease: "power3.inOut",
                delay: Math.random() * 0.5,
              });
          });
        } else {
          const techImages = el.querySelectorAll(".techImage");

          gsap.fromTo(
            ".techSectionTitle",
            {
              opacity: 1,
              y: 0,
            },
            {
              opacity: 0,
              y: "4rem",
              duration: 0.5,
              ease: "power3.out",
            }
          );

          techImages.forEach((techImage) => {
            let randomLeft = Math.floor(Math.random() * el.offsetWidth);
            let randomTop = Math.floor(Math.random() * el.offsetHeight);

            const randomPositiveOrNegative1 = Math.random() < 0.5 ? -1 : 1;
            randomLeft *= randomPositiveOrNegative1;

            const randomPositiveOrNegative2 = Math.random() < 0.5 ? -1 : 1;
            randomTop *= randomPositiveOrNegative2;

            gsap.to(techImage, {
              duration: 0.5,
              opacity: 0,
              scale: 0.8,
              x: randomLeft,
              y: randomTop,
              ease: "power3.inOut",
            });
          });
        }
      },
      {
        threshold: 0.7,
      }
    );

    observer.observe(el);
  }, []);

  return (
    <TechStackSectionContainer ref={techStackSectionRef}>
      <TechSectionTitle className="techSectionTitle">
        I know <span className="emphasisRedText">Technologies</span>
      </TechSectionTitle>
      <AllTechContainer>
        {stacks.map((stack) => (
          <TechImageContainer
            className="techImage"
            key={stack.id}
            name={stack.name}
          >
            <Image
              src={stack.image.url}
              alt={stack.name}
              layout="fill"
              priority={true}
            />
          </TechImageContainer>
        ))}
      </AllTechContainer>
    </TechStackSectionContainer>
  );
};

export default TechStackSection;
