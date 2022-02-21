import Link from "next/link";
import styled from "styled-components";

const FooterComponent = styled.footer`
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);

  & * {
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.1rem;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterComponent>
      <div className="container">
        made with ❤️ by{" "}
        <Link href="https://linkedin.com/in/theninza" passHref>
          <a target="_blank" rel="noopener noreferrer">
            Nikhil Gupta
          </a>
        </Link>
      </div>
    </FooterComponent>
  );
};

export default Footer;
