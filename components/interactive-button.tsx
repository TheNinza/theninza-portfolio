import gsap from "gsap";
import { ButtonHTMLAttributes, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

interface IProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  buttonText: string;
  endIconUrl?: string;
  endIconHoverUrl?: string;
}

interface IButtonProps {
  buttonText: string;
  endIconUrl?: string;
  endIconHoverUrl?: string;
}

const SuccessAndErrorAfterPsuedo = css`
  content: "";
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: unset;
  border: unset;
`;

const LoadingCss = css`
  cursor: not-allowed;
  pointer-events: none;
  border-color: white;
  border-width: 2px;

  &::after {
    content: "";
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.textSecondary};
    border-top-color: ${({ theme }) => theme.colors.green};
    border-right-color: ${({ theme }) => theme.colors.blue};
    border-bottom-color: ${({ theme }) => theme.colors.lightRed};
    animation: spin 1s linear infinite;
  }

  &::before {
    display: none;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorCss = css`
  cursor: not-allowed;
  pointer-events: none;
  border-color: transparent;
  animation: bounce 2s ease-in-out;
  animation-delay: 0.7s;

  &::after {
    ${SuccessAndErrorAfterPsuedo}
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYiIGhlaWdodD0iNDYiIHZpZXdCb3g9IjAgMCA0NiA0NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjMiIGN5PSIyMyIgcj0iMjIiIHN0cm9rZT0iI0ZFOEM4QyIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxsaW5lIHgxPSIxNS42MTY1IiB5MT0iMjMuNjYyNCIgeDI9IjMwLjI3OTEiIHkyPSI4Ljk5OTkxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8bGluZSB4MT0iMTYuNDE0MiIgeTE9IjkiIHgyPSIzMS4wNzY4IiB5Mj0iMjMuNjYyNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEzIDM0Ljk5OTNDMjEgMzEuMDAwNCAyNyAzMSAzNCAzNC45OTkyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K");
  }
  &::before {
    display: none;
  }
`;

const SuccessCss = css`
  cursor: not-allowed;
  pointer-events: none;
  border-color: transparent;
  overflow: auto;
  position: relative;
  animation: bounce 2s ease-in-out;
  animation-delay: 0.7s;
  &::after {
    ${SuccessAndErrorAfterPsuedo}
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYiIGhlaWdodD0iNDYiIHZpZXdCb3g9IjAgMCA0NiA0NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjMiIGN5PSIyMyIgcj0iMjIiIHN0cm9rZT0iIzFFQ0I4OSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik05IDE4QzEyLjgwOTUgMTQuMDAwMiAxNS42NjY3IDEzLjk5OTggMTkgMTcuOTk5OSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTI3IDE4QzMwLjgwOTUgMTQuMDAwMiAzMy42NjY3IDEzLjk5OTggMzcgMTcuOTk5OSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTEzIDMzLjAwMDFDMjAuNSAzOC45OTk1IDI2IDM5LjAwMDMgMzMgMzMuMDAwMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPGNpcmNsZSBjeD0iOC41IiBjeT0iMjUuNSIgcj0iMy41IiBmaWxsPSIjRkU4QzhDIiBmaWxsLW9wYWNpdHk9IjAuMzciLz4KPGNpcmNsZSBjeD0iMzcuNSIgY3k9IjI1LjUiIHI9IjMuNSIgZmlsbD0iI0ZFOEM4QyIgZmlsbC1vcGFjaXR5PSIwLjM3Ii8+Cjwvc3ZnPgo=");
  }

  &::before {
    display: none;
  }
`;

const Button = styled.button<IButtonProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 0.5rem;
  white-space: nowrap;

  &::after {
    content: ${({ buttonText }) => `"${buttonText}"`};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    transition: all 0.3s ease;
    animation: fadeIn 1s ease;
  }

  /* Controlling EndIcon */
  ${({ endIconUrl, endIconHoverUrl }) =>
    endIconUrl
      ? css`
          &::before {
            content: "";
            background-image: url("${endIconUrl}");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            height: 1.25rem;
            width: 1.25rem;
            animation: fadeIn 1s ease;
            transition: all 0.3s ease;
          }

          &:hover {
            transform: scale(1.05);
            border-color: ${({ theme }) => theme.colors.textPrimary};
            color: ${({ theme }) => theme.colors.textPrimary};

            &::before {
              transform: scale(1.2);
              background-image: url("${endIconHoverUrl}");
            }
          }
        `
      : css`
          &:hover {
            transform: scale(1.05);
            border-color: ${({ theme }) => theme.colors.textPrimary};
            color: ${({ theme }) => theme.colors.textPrimary};
          }
        `}

  &:active {
    transform: scale(1);
  }

  &.loading {
    ${LoadingCss}
  }

  &.error {
    ${ErrorCss}
  }

  &.success {
    ${SuccessCss}
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scaleX(1.5);
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    15% {
      transform: translateY(1rem);
    }
    32% {
      transform: translateY(-0.85rem);
    }
    49% {
      transform: translateY(0.5rem);
    }
    66% {
      transform: translateY(-0.3rem);
    }
    85% {
      transform: translateY(0.2rem);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const InteractiveButton: React.FC<
  IProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  isLoading,
  isError,
  isSuccess,
  buttonText,
  endIconUrl = "",
  endIconHoverUrl = "",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const endIconHoverUrlFinal = endIconHoverUrl ? endIconHoverUrl : endIconUrl;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    if (!isLoading && !isError && !isSuccess) {
      button.classList.remove("loading");
      button.classList.remove("error");
      button.classList.remove("success");

      const iconWidth = endIconUrl.length ? 2.5 : 0;
      const width = buttonText.length + iconWidth + 2;
      gsap.to(button, {
        duration: 0.3,
        ease: "power3.inOut",
        borderRadius: "0.4rem",
        width: `${width}rem`,
        height: "3rem",
        padding: "0 1rem",
      });
      return;
    }

    if (isLoading) {
      button.classList.add("loading");
      button.classList.remove("error");
      button.classList.remove("success");
      gsap.to(button, {
        duration: 0.5,
        ease: "power3.inOut",
        borderRadius: "50%",
        width: "2.5rem",
        height: "2.5rem",
        padding: "0",
      });
    } else if (isError) {
      button.classList.add("error");
      button.classList.remove("loading");
      button.classList.remove("success");

      gsap.to(button, {
        duration: 0.5,
        ease: "power3.inOut",
        borderRadius: "50%",
        width: "3rem",
        height: "3rem",
        padding: "0",
      });
    } else if (isSuccess) {
      button.classList.add("success");
      button.classList.remove("loading");
      button.classList.remove("error");
      gsap.to(button, {
        duration: 0.5,
        ease: "power3.inOut",
        borderRadius: "50%",
        width: "3rem",
        height: "3rem",
        padding: "0 ",
      });
    }
  }, [isLoading, isError, isSuccess, endIconUrl.length, buttonText.length]);

  return (
    <Button
      buttonText={buttonText}
      endIconUrl={endIconUrl}
      endIconHoverUrl={endIconHoverUrlFinal}
      ref={buttonRef}
      {...props}
    />
  );
};

export default InteractiveButton;
