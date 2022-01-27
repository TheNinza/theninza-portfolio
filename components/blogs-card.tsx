import styled from "styled-components";
import { Blob, CardContainer, GlassBox } from "../config/styled-components";

const BlogCardContainer = styled(CardContainer)`
  flex: 0.4;
`;

const BlogBlob1 = styled(Blob)`
  bottom: -10%;
  left: -5%;
  width: 22%;
  height: 65%;
  background: ${({ theme }) => theme.colors.green};
`;
const BlogBlob2 = styled(Blob)`
  top: -10%;
  right: -5%;
  width: 22%;
  height: 75%;
  background: rgb(170, 140, 254);
`;

const BlogCard = styled(GlassBox)`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.space.lg};
  z-index: 1;

  display: flex;
  justify-content: center;

  position: relative;

  & > .title {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: 0.15rem;
    text-align: center;
  }

  & > .description {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};

    @media only screen and (max-width: ${({ theme }) =>
        theme.breakpoints.sm}px) {
      fontsize: ${({ theme }) => theme.fontSizes.xl};
      letter-spacing: 0.5rem;
    }
  }
`;

const BlogCardComponent: React.FC<{}> = () => {
  return (
    <BlogCardContainer className="glassContainer">
      <BlogBlob1 />
      <BlogBlob2 />
      <BlogCard className="glassCard">
        <div className="title">My Recent Blogs</div>
        <div className="description">Coming Soon</div>
      </BlogCard>
    </BlogCardContainer>
  );
};

export default BlogCardComponent;
