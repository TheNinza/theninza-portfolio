import gsap from "gsap";
import { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import useIsomorphicLayoutEffect from "../hooks/use-isomorphic-layout-effect";

interface IProps {
  children: React.ReactChild[];
  showCarousel: boolean;
}

interface ICarouselProps {
  isAdditionalInfo: boolean;
}

const CarouselContainer = styled.div<ICarouselProps>`
  width: 100%;
  opacity: 0;
  transform-origin: top;

  & * {
    text-align: left;
  }

  & .dot {
    opacity: 0.3 !important;

    &.selected {
      opacity: 1 !important;
    }
  }
`;

const CarouselComponent: React.FC<IProps> = ({ children, showCarousel }) => {
  const isAdditionalFeaturesRequired = children.length > 1;

  const carauselRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (showCarousel && carauselRef.current) {
      gsap.fromTo(
        carauselRef.current,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 2,
        }
      );
    }
  }, [showCarousel]);

  return (
    <CarouselContainer
      className="carouselContainer"
      isAdditionalInfo={isAdditionalFeaturesRequired}
      ref={carauselRef}
    >
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={isAdditionalFeaturesRequired}
        autoPlay={isAdditionalFeaturesRequired}
        interval={5000}
        infiniteLoop={isAdditionalFeaturesRequired}
        showThumbs={false}
      >
        {children}
      </Carousel>
    </CarouselContainer>
  );
};

export default CarouselComponent;
