import gsap from "gsap";
import Image from "next/image";
import { useContext, useRef } from "react";
import styled from "styled-components";
import { WindowLoadingContext } from "../context/window-loading-context";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";

const HeroLoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};

  z-index: 1000 !important;
`;

const HeroLoader = () => {
  const { setLoading } = useContext(WindowLoadingContext);

  const gsapTimeLineRef = useRef(
    gsap.timeline({
      paused: true,
      onComplete: () => {
        setLoading(false);
      },
    })
  );

  useIsomorphicLayoutEffect(() => {
    gsapTimeLineRef.current
      .fromTo(
        ".loaderLogo",
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
        }
      )
      .to(".loaderLogo", {
        duration: 1,
        rotate: 720,
        scale: 0,
        ease: "power4.out",
      })
      .to(".heroContainer", {
        duration: 1,
        y: "-100vh",
      });

    window.addEventListener("load", () => {
      gsapTimeLineRef.current.play();
    });

    return () => {
      window.removeEventListener("load", () => {
        console.log("removed");
      });
    };
  }, []);

  return (
    <HeroLoaderContainer className="heroContainer">
      <Image
        className="loaderLogo"
        src="/logo.svg"
        width={500}
        height={500}
        alt="logo"
        priority
      />
    </HeroLoaderContainer>
  );
};

export default HeroLoader;
