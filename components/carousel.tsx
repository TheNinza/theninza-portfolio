import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

interface IProps {
  children: React.ReactChild[];
}

interface ICarouselProps {
  isAdditionalInfo: boolean;
}

const CarouselContainer = styled.div<ICarouselProps>`
  width: 100%;

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

const CarouselComponent: React.FC<IProps> = ({ children }) => {
  const isAdditionalFeaturesRequired = children.length > 1;

  return (
    <CarouselContainer isAdditionalInfo={isAdditionalFeaturesRequired}>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={isAdditionalFeaturesRequired}
        autoPlay={isAdditionalFeaturesRequired}
        interval={5000}
        infiniteLoop={isAdditionalFeaturesRequired}
      >
        {children}
      </Carousel>
    </CarouselContainer>
  );
};

export default CarouselComponent;
