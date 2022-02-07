import gsap from "gsap";
import { useCallback, useRef } from "react";
import styled from "styled-components";
import { SectionTitle } from "../../config/styled-components";
import FormContainerComponent from "../contact-form";

const ContactSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  overflow: hidden;

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

const ThankyouText = styled.div`
  font-size: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  letter-spacing: ${({ theme }) => theme.space.sm};
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
`;

const MainContentContainer = styled.div`
  margin: auto;
  margin-top: ${({ theme }) => theme.space.xxl};
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: fit-content;
`;

const ContactSectionTitle = styled(SectionTitle)`
  opacity: 1;
  position: relative;
  width: fit-content;
  overflow: hidden;
  letter-spacing: ${({ theme }) => theme.space.md};

  span.textFragment {
    span {
      opacity: 0;
      transform: translateY(75px);
      display: inline-block;
      transition: all 0.5s ease;

      &.space {
        display: unset;
      }
    }
  }

  & > span.underline {
    position: relative;

    & > span.line {
      position: absolute;
      top: calc(50% - 5px);
      left: 0;
      width: 0;
      height: 5px;
      opacity: 1 !important;
    }

    &.lightred > span.line {
      background: ${({ theme }) => theme.colors.lightRed};
    }

    &.green > span.line {
      background: ${({ theme }) => theme.colors.green};
    }
    &.blue > span.line {
      background: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  justify-content: space-between;
`;

const ContactSection: React.FC = () => {
  const gsapTimelineRef = useRef<gsap.core.Timeline>(
    gsap.timeline({
      paused: true,
    })
  );

  const thankyouTextRef = useRef<HTMLDivElement>(null);
  const contactSectionTitleRef = useRef<HTMLDivElement>(null);
  const contactSectionSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const tl = gsapTimelineRef.current;
    if (!tl) return;

    const thankyouTextEl = thankyouTextRef.current;
    if (!thankyouTextEl) return;

    const contactSectionTitleEl = contactSectionTitleRef.current;
    if (!contactSectionTitleEl) return;

    // animate thank you text
    tl.fromTo(
      thankyouTextEl,
      {
        opacity: 0,
        y: "0%",
        x: "-50%",
      },
      {
        y: "-50%",
        x: "-50%",
        duration: 1,
        opacity: 1,
        ease: "power2.easeIn",
      }
    ).to(thankyouTextEl, {
      duration: 1.5,
      opacity: 0,
      letterSpacing: "1.2rem",
      ease: "power2.easeOut",
      delay: 0.4,
    });

    const textFragments =
      contactSectionTitleEl.querySelectorAll("span.textFragment");
    if (!textFragments) return;

    // animate texts

    textFragments.forEach((span) => {
      const fragment = span as HTMLSpanElement;

      const textContent = fragment.textContent;
      if (!textContent) return;

      fragment.style.opacity = "1";

      const textContentArray = textContent.split("");

      fragment.textContent = "";

      textContentArray.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;

        if (letter === " ") {
          span.classList.add("space");
        }
        tl.add(
          gsap.to(span, {
            duration: 0.1,
            opacity: 1,
            y: 0,
            ease: "power2.easeIn",
          })
        );
        fragment.appendChild(span);
      });

      // create the line span
      const lineSpan = document.createElement("span");
      lineSpan.classList.add("line");
      fragment.appendChild(lineSpan);
    });

    // animate underline

    const underlines = contactSectionTitleEl.querySelectorAll(
      "span.underline > span.line"
    );
    if (!underlines) return;

    tl.fromTo(
      underlines,
      {
        width: 0,
      },
      {
        duration: 0.5,
        width: "100%",
        ease: "power2.easeIn",
        stagger: 0.4,
      }
    );

    const observer = new IntersectionObserver(
      ([section]) => {
        if (section.isIntersecting) {
          observer.disconnect();
          tl.play();
        }
      },
      {
        threshold: 0.9,
      }
    );

    observer.observe(el);
  }, []);

  return (
    <ContactSectionContainer ref={contactSectionSectionRef}>
      {/* welcome to section text */}
      <ThankyouText ref={thankyouTextRef}>
        Thank you for making it this far!
      </ThankyouText>

      {/* main content */}
      <MainContentContainer>
        <ContactSectionTitle ref={contactSectionTitleRef}>
          <span className="textFragment">Let&apos;s</span>{" "}
          <span className="textFragment underline lightred">Get</span>{" "}
          <span className="textFragment underline green">In</span>{" "}
          <span className="textFragment underline blue">Touch</span>
        </ContactSectionTitle>

        {/* FlexContainer */}
        <FlexContainer>
          {/* form */}
          <FormContainerComponent />
          {/* socials */}
        </FlexContainer>
      </MainContentContainer>
    </ContactSectionContainer>
  );
};

export default ContactSection;
