import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

const ContactSectionContainer = styled.div`
  height: 100vh;
  width: 100%;

  overflow: hidden;

  /* align items to center of the container */
  display: flex;
  flex-direction: column;
  gap: 2rem;

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
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  letter-spacing: ${({ theme }) => theme.space.sm};
  opacity: 0;
  pointer-events: none;

  span {
    opacity: 0;
    transform: translateY(75px);
    display: inline-block;
    transition: all 0.5s ease;

    &.space {
      display: unset;
    }
  }
`;

const ContactSection: React.FC = () => {
  const gsapTimelineRef = useRef<gsap.core.Timeline>(
    gsap.timeline({
      paused: true,
    })
  );

  const thankyouTextRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const tl = gsapTimelineRef.current;
    if (!tl) return;

    const textContent = el.textContent;
    if (!textContent) return;

    el.style.opacity = "1";

    const textContentArray = textContent.split("");

    el.textContent = "";

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
      el.appendChild(span);
    });

    tl.add(
      gsap.fromTo(
        el,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          letterSpacing: "50px",
          delay: 0.5,
        }
      )
    );
  }, []);

  const contactSectionSectionRef = useCallback((el: HTMLDivElement) => {
    if (!el) return;

    const tl = gsapTimelineRef.current;
    if (!tl) return;

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
    </ContactSectionContainer>
  );
};

export default ContactSection;
