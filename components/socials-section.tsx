import axios from "axios";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import InteractiveButton from "./interactive-button";

const SocialsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: 4rem;
  }
`;

const SocialIconLinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
  width: 100%;
  align-items: flex-end;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.lg};
  }
`;

const SocialTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  letter-spacing: 0.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const SocialIconLinkContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: ${({ theme }) => theme.space.sm};
  }
`;

const SocialIconLink = styled.a`
  position: relative;
  height: 2.5rem;
  transition: all 0.5s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.2);
    margin-right: 1rem;

    & path {
      stroke-dashoffset: 0;
    }

    & .svgIconName {
      transform: translateY(-50%) scale(10/12); /* resetting font size by scaling down */
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 2rem;
  }
`;

const SocialIconSvg = styled.svg`
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  path {
    stroke: ${({ theme }) => theme.colors.textPrimary};
    stroke-width: 2;
    stroke-dasharray: 800;
    stroke-dashoffset: 800;
    transition: all 2s linear;
  }
`;

const SocialIconSvgName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.5s ease;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const DownloadResumeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
  width: 100%;
  align-items: flex-end;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    align-items: flex-start;
  }
`;

const SocialsContainerComponent: React.FC = () => {
  const [downloadState, setDownloadState] = useState({
    isDownloading: false,
    isDownloaded: false,
    isError: false,
  });
  const { width } = useWindowSize();

  useEffect(() => {
    if (width && width < 450) return;

    const socialLinks = document.querySelectorAll(".contactSectionSocialLink");

    if (!socialLinks.length) return;

    socialLinks.forEach((el) => {
      const socialLink = el as HTMLElement;
      const svgElement = socialLink.querySelector("svg");
      const svgIconName = socialLink.querySelector(
        ".svgIconName"
      ) as HTMLElement;

      if (!svgElement || !svgIconName) return;

      const svgElWidgh = svgElement.getBoundingClientRect().width;
      socialLink.style.width = `${svgElWidgh}px`;
      svgIconName.style.right = `-110%`;
      svgIconName.style.opacity = "0";

      const svgIconNameWidth = svgIconName.getBoundingClientRect().width;

      const newWidth = svgElWidgh + svgIconNameWidth;

      socialLink.addEventListener("mouseenter", () => {
        socialLink.style.width = `${newWidth}px`;
        svgIconName.style.right = `0`;
        svgIconName.style.opacity = "1";
        window.umami(
          `social-link-hover-${socialLink.textContent?.toLowerCase()}`
        );
      });

      socialLink.addEventListener("mouseleave", () => {
        socialLink.style.width = `${svgElWidgh}px`;
        svgIconName.style.right = `-100%`;
        svgIconName.style.opacity = "0";
      });
    });

    return () => {
      socialLinks.forEach((el) => {
        const socialLink = el as HTMLElement;
        const svgElement = socialLink.querySelector("svg");
        const svgIconName = socialLink.querySelector(
          ".svgIconName"
        ) as HTMLElement;

        if (!svgElement || !svgIconName) return;

        socialLink.removeEventListener("mouseenter", () => {});

        socialLink.removeEventListener("mouseleave", () => {});
      });
    };
  }, [width]);

  const handleDownloadResume: MouseEventHandler<HTMLAnchorElement> = async (
    e
  ) => {
    e.preventDefault();
    setDownloadState({
      ...downloadState,
      isDownloading: true,
    });

    setTimeout(async () => {
      const { data } = await axios.get("/api/resume", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "NikhilResume.pdf");
      link.click();

      setDownloadState({
        ...downloadState,
        isDownloading: false,
        isDownloaded: true,
      });
      setTimeout(() => {
        setDownloadState({
          ...downloadState,
          isDownloaded: false,
        });
      }, 3000);
    }, 2000);
  };

  return (
    <SocialsContainer>
      <SocialIconLinksSection>
        <SocialTitle>Find me on different platforms</SocialTitle>
        <SocialIconLinkContainer>
          {socials.map(({ SvgEl, name, url }) => (
            <Link href={url} passHref key={name}>
              <SocialIconLink
                className={`contactSectionSocialLink umami--click--external-${name.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgEl />
                <SocialIconSvgName className="svgIconName">
                  {width && width > 400 && name}
                </SocialIconSvgName>
              </SocialIconLink>
            </Link>
          ))}
        </SocialIconLinkContainer>
      </SocialIconLinksSection>
      <DownloadResumeSection>
        <Link href="/api/resume" passHref>
          <a
            className="contactSectionDownloadResume"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadResume}
          >
            <InteractiveButton
              buttonText="Download my resume"
              isError={downloadState.isError}
              isLoading={downloadState.isDownloading}
              isSuccess={downloadState.isDownloaded}
              endIconUrl="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCA1MiAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQyLjY2NTYgMTYuODQzNEM0MS42MTY4IDguNDg0MjkgMzQuNTQ0IDIgMjYgMkMxOS4zODU2IDIgMTMuNjQgNS45MSAxMS4wMTY4IDEyLjA3NjFDNS44NjE2IDEzLjYzNzcgMiAxOC41NjI5IDIgMjMuODU3MUMyIDMwLjMwOTkgNy4wMTM2IDM1LjU1MDcgMTMuMjk5MiAzNS45Mjk2VjM2SDQwLjM3NlYzNS45OTI3TDQwLjQgMzZDNDUuNjk0NCAzNiA1MCAzMS42NDMxIDUwIDI2LjI4NTdDNDkuOTk3MiAyNC4xMDg1IDQ5LjI3MzEgMjEuOTk1MiA0Ny45NDM1IDIwLjI4MzVDNDYuNjEzOSAxOC41NzE4IDQ0Ljc1NTYgMTcuMzYwNiA0Mi42NjU2IDE2Ljg0MzRWMTYuODQzNFpNMTYuNCAxOUgyMy42VjExLjcxNDNIMjguNFYxOUgzNS42TDI2IDMxLjE0MjlMMTYuNCAxOVoiIHN0cm9rZT0iI0I0QjRCNCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="
              endIconHoverUrl="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCA1MiAzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQyLjY2NTYgMTYuODQzNEM0MS42MTY4IDguNDg0MjkgMzQuNTQ0IDIgMjYgMkMxOS4zODU2IDIgMTMuNjQgNS45MSAxMS4wMTY4IDEyLjA3NjFDNS44NjE2IDEzLjYzNzcgMiAxOC41NjI5IDIgMjMuODU3MUMyIDMwLjMwOTkgNy4wMTM2IDM1LjU1MDcgMTMuMjk5MiAzNS45Mjk2VjM2SDQwLjM3NlYzNS45OTI3TDQwLjQgMzZDNDUuNjk0NCAzNiA1MCAzMS42NDMxIDUwIDI2LjI4NTdDNDkuOTk3MiAyNC4xMDg1IDQ5LjI3MzEgMjEuOTk1MiA0Ny45NDM1IDIwLjI4MzVDNDYuNjEzOSAxOC41NzE4IDQ0Ljc1NTYgMTcuMzYwNiA0Mi42NjU2IDE2Ljg0MzRWMTYuODQzNFpNMTYuNCAxOUgyMy42VjExLjcxNDNIMjguNFYxOUgzNS42TDI2IDMxLjE0MjlMMTYuNCAxOVoiIHN0cm9rZT0idXJsKCNwYWludDBfbGluZWFyXzM2MV8yKSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8zNjFfMiIgeDE9IjI2IiB5MT0iMiIgeDI9IjI2IiB5Mj0iMzYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZFOEM4QyIvPgo8c3RvcCBvZmZzZXQ9IjAuNTQxNjY3IiBzdG9wLWNvbG9yPSIjNkNDMDRBIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzYxREFGQiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
              iconAspectRatio={48 / 34}
            />
          </a>
        </Link>
      </DownloadResumeSection>
    </SocialsContainer>
  );
};

export default SocialsContainerComponent;

const socials = [
  {
    SvgEl: () => (
      <SocialIconSvg
        width="56"
        height="54"
        viewBox="0 0 56 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.6829 0C12.3881 0 0 12.3881 0 27.6829C0 39.9326 7.92424 50.2791 18.9282 53.9471C20.3124 54.1893 20.8314 53.3589 20.8314 52.6322C20.8314 51.9747 20.7968 49.7947 20.7968 47.4762C13.8415 48.7566 12.0421 45.7806 11.4884 44.2235C11.177 43.4276 9.82744 40.9707 8.65092 40.3133C7.68202 39.7942 6.29787 38.5139 8.61631 38.4793C10.7963 38.4447 12.3535 40.4863 12.8726 41.3168C15.364 45.5038 19.3435 44.3273 20.9352 43.6006C21.1774 41.8012 21.9041 40.5901 22.7 39.898C16.5406 39.206 10.1043 36.8183 10.1043 26.2296C10.1043 23.2191 11.177 20.7276 12.9418 18.7898C12.6649 18.0977 11.696 15.2602 13.2186 11.4538C13.2186 11.4538 15.537 10.7271 20.8314 14.2913C23.046 13.6684 25.3991 13.357 27.7521 13.357C30.1052 13.357 32.4582 13.6684 34.6729 14.2913C39.9672 10.6925 42.2857 11.4538 42.2857 11.4538C43.8083 15.2602 42.8393 18.0977 42.5625 18.7898C44.3273 20.7276 45.4 23.1845 45.4 26.2296C45.4 36.8529 38.9291 39.206 32.7697 39.898C33.7732 40.7631 34.6383 42.4241 34.6383 45.0194C34.6383 48.722 34.6037 51.6979 34.6037 52.6322C34.6037 53.3589 35.1227 54.2239 36.5069 53.9471C42.0023 52.0917 46.7777 48.5597 50.1607 43.8483C53.5438 39.1369 55.3642 33.4832 55.3659 27.6829C55.3659 12.3881 42.9778 0 27.6829 0Z"
          fill="#B4B4B4"
        />
      </SocialIconSvg>
    ),
    name: "Github",
    url: "https://github.com/theninza",
  },
  {
    SvgEl: () => (
      <SocialIconSvg
        width="55"
        height="54"
        viewBox="0 0 55 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.365876 4.51146C0.365876 3.31495 0.841188 2.16744 1.68725 1.32138C2.53331 0.475318 3.68082 6.0144e-06 4.87733 6.0144e-06H49.8495C50.4425 -0.00096243 51.0298 0.115033 51.5779 0.341351C52.1259 0.56767 52.624 0.899866 53.0435 1.31892C53.463 1.73798 53.7957 2.23566 54.0226 2.78348C54.2496 3.33131 54.3662 3.9185 54.3659 4.51146V49.4836C54.3665 50.0767 54.2502 50.6641 54.0236 51.2122C53.797 51.7603 53.4646 52.2583 53.0454 52.6778C52.6261 53.0972 52.1283 53.4299 51.5803 53.6568C51.0323 53.8837 50.445 54.0003 49.852 54H4.87733C4.28467 54 3.69782 53.8832 3.1503 53.6564C2.60279 53.4295 2.10534 53.0969 1.68638 52.6778C1.26742 52.2586 0.935163 51.7609 0.708585 51.2133C0.482008 50.6657 0.365553 50.0787 0.365876 49.4861V4.51146ZM21.7401 20.5887H29.0521V24.2607C30.1076 22.1498 32.8076 20.25 36.865 20.25C44.6434 20.25 46.4868 24.4546 46.4868 32.1693V46.4596H38.6151V33.9267C38.6151 29.5331 37.5596 27.054 34.8792 27.054C31.1606 27.054 29.6142 29.727 29.6142 33.9267V46.4596H21.7401V20.5887ZM8.24006 46.1234H16.1142V20.25H8.24006V46.1209V46.1234ZM17.2409 11.8113C17.2557 12.4855 17.1358 13.1558 16.888 13.783C16.6403 14.4103 16.2697 14.9817 15.7982 15.4637C15.3266 15.9458 14.7635 16.3288 14.1419 16.5903C13.5203 16.8518 12.8527 16.9865 12.1784 16.9865C11.504 16.9865 10.8364 16.8518 10.2148 16.5903C9.59325 16.3288 9.03015 15.9458 8.55858 15.4637C8.08701 14.9817 7.71649 14.4103 7.46874 13.783C7.221 13.1558 7.10103 12.4855 7.11588 11.8113C7.14502 10.4879 7.69118 9.22858 8.63741 8.30296C9.58364 7.37734 10.8547 6.85903 12.1784 6.85903C13.5021 6.85903 14.7731 7.37734 15.7193 8.30296C16.6656 9.22858 17.2117 10.4879 17.2409 11.8113V11.8113Z"
          fill="#B4B4B4"
        />
      </SocialIconSvg>
    ),
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theninza/",
  },
  {
    SvgEl: () => (
      <SocialIconSvg
        width="72"
        height="54"
        viewBox="0 0 72 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60.2561 1.78568L55.6752 5.36445L36.1709 19.8585L16.6666 5.2213L12.0857 1.64252C11.0066 0.749782 9.68921 0.193264 8.29685 0.0419176C6.90449 -0.109429 5.49832 0.151048 4.25255 0.791076C3.00678 1.43111 1.97615 2.42256 1.28836 3.64261C0.60057 4.86266 0.285834 6.25769 0.383146 7.65487V49.1329C0.383146 50.4237 0.895932 51.6617 1.8087 52.5745C2.72146 53.4872 3.95944 54 5.25028 54H16.6666V26.3719L36.1709 41.0091L55.6752 26.3719V54H67.0915C68.3824 54 69.6203 53.4872 70.5331 52.5745C71.4459 51.6617 71.9586 50.4237 71.9586 49.1329V7.65487C72.0258 6.26974 71.6892 4.89493 70.9897 3.69754C70.2902 2.50015 69.2579 1.53175 68.0183 0.910058C66.7787 0.288368 65.3852 0.0401615 64.0072 0.195608C62.6292 0.351054 61.326 0.903459 60.2561 1.78568V1.78568Z"
          fill="#B4B4B4"
        />
      </SocialIconSvg>
    ),
    name: "Gmail",
    url: "mailto:niks.a3198@gmail.com",
  },
  {
    SvgEl: () => (
      <SocialIconSvg
        width="55"
        height="54"
        viewBox="0 0 55 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.9603 17.9962C23.0025 17.9962 18.9565 22.0422 18.9565 27C18.9565 31.9578 23.0025 36.0038 27.9603 36.0038C32.9182 36.0038 36.9642 31.9578 36.9642 27C36.9642 22.0422 32.9182 17.9962 27.9603 17.9962ZM54.9651 27C54.9651 23.2715 54.9989 19.5767 54.7895 15.855C54.5801 11.532 53.5939 7.69546 50.4328 4.53432C47.2649 1.36643 43.4351 0.387019 39.1121 0.177628C35.3836 -0.0317638 31.6889 0.00200911 27.9671 0.00200911C24.2386 0.00200911 20.5438 -0.0317638 16.8221 0.177628C12.4992 0.387019 8.66256 1.37319 5.50142 4.53432C2.33353 7.70221 1.35412 11.532 1.14473 15.855C0.935338 19.5835 0.969111 23.2782 0.969111 27C0.969111 30.7218 0.935338 34.4233 1.14473 38.145C1.35412 42.468 2.34029 46.3045 5.50142 49.4657C8.66931 52.6336 12.4992 53.613 16.8221 53.8224C20.5506 54.0318 24.2453 53.998 27.9671 53.998C31.6956 53.998 35.3904 54.0318 39.1121 53.8224C43.4351 53.613 47.2716 52.6268 50.4328 49.4657C53.6007 46.2978 54.5801 42.468 54.7895 38.145C55.0056 34.4233 54.9651 30.7285 54.9651 27ZM27.9603 40.8536C20.2939 40.8536 14.1067 34.6664 14.1067 27C14.1067 19.3336 20.2939 13.1464 27.9603 13.1464C35.6268 13.1464 41.814 19.3336 41.814 27C41.814 34.6664 35.6268 40.8536 27.9603 40.8536ZM42.3813 15.8144C40.5914 15.8144 39.1459 14.369 39.1459 12.579C39.1459 10.789 40.5914 9.34357 42.3813 9.34357C44.1713 9.34357 45.6168 10.789 45.6168 12.579C45.6173 13.004 45.534 13.425 45.3716 13.8178C45.2092 14.2106 44.9709 14.5675 44.6703 14.868C44.3698 15.1685 44.0129 15.4068 43.6201 15.5692C43.2273 15.7317 42.8064 15.815 42.3813 15.8144Z"
          fill="#B4B4B4"
        />
      </SocialIconSvg>
    ),
    name: "Instagram",
    url: "https://www.instagram.com/nik_gupta._/",
  },
];
