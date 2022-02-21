import { InputHTMLAttributes, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

interface BasicProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type IProps = BasicProps & InputHTMLAttributes<HTMLInputElement>;

const ShrinkLabel = css`
  transform: translate(0, calc(-100% - 5px));
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;

  & > svg {
    position: absolute;
    top: 0;
    display: block;
    & > .string {
      stroke: ${({ theme }) => theme.colors.textSecondary};
      fill: none;
    }
  }
`;

const InputField = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent !important;
  color: ${({ theme }) => theme.colors.textPrimary} !important;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding-bottom: ${({ theme }) => theme.space.sm};

  &:active,
  &:focus {
    outline: none;
  }

  &:focus {
    & + label {
      ${ShrinkLabel}
    }

    &[type="email"] {
      & + label {
        color: ${({ theme }) => theme.colors.green};
        & + svg {
          & > .string {
            stroke: ${({ theme }) => theme.colors.green};
          }
        }
      }
    }

    &[type="text"] {
      & + label {
        color: ${({ theme }) => theme.colors.blue};
        & + svg {
          & > .string {
            stroke: ${({ theme }) => theme.colors.blue};
          }
        }
      }
    }
  }
`;

const InputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  &.shrink {
    ${ShrinkLabel}
  }
`;

const InteractiveTextInput: React.FC<IProps> = ({
  name,
  label,
  type,
  value,
  onChange,
  ...otherInputProps
}) => {
  const { width } = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!width) return;

    const container = containerRef.current;
    if (!container) return;

    const input = container.querySelector("input");
    if (!input) return;

    const inputHeight = input.offsetHeight;
    const inputWidth = input.offsetWidth;

    const svg = svgRef.current;
    if (!svg) return;

    // set svg width and height
    svg.setAttribute("viewBox", `0 0 ${inputWidth} ${2 * inputHeight}`);
    svg.setAttribute("width", `${inputWidth}`);
    svg.setAttribute("height", `${2 * inputHeight}`);

    // draw the initial line
    const path = pathRef.current;
    if (!path) return;

    path.setAttribute(
      "d",
      `M 0 ${inputHeight} q ${inputWidth / 2} 0 ${inputWidth} 0`
    );

    // setting up height of the container to accommodate the svg
    container.style.height = `${2 * inputHeight}px`;

    // setting up manual focus coz svg is on the top layer
    // focus the input when the container is clicked and vice versa
    window.addEventListener("click", (e) => {
      if (e.target === container || e.target === svg || e.target === input) {
        input.focus();
        if (vibrateAnimationFrame) {
          cancelAnimationFrame(vibrateAnimationFrame);
          vibrateAnimationFrame = null;
        }

        if (dragAnimationFrame) {
          cancelAnimationFrame(dragAnimationFrame);
          dragAnimationFrame = null;
        }
        let offset =
          e.clientY - svg.getBoundingClientRect().top - MAX_AMPLITUDE;
        offset = offset > MAX_AMPLITUDE ? MAX_AMPLITUDE : offset;
        offset = offset < -MAX_AMPLITUDE ? -MAX_AMPLITUDE : offset;

        initialPhase = Math.asin(offset / MAX_AMPLITUDE);

        lastTime = 0;
        vibrateAnimate();
      } else {
        input.blur();
      }
    });

    const MAX_AMPLITUDE = inputHeight;

    let dragAnimationFrame: number | null = null;
    let vibrateAnimationFrame: number | null = null;

    const relativeMousePos = {
      x: 0,
      y: 0,
    };

    // store relative mouse positions
    svg.addEventListener("mousemove", (e) => {
      relativeMousePos.x = e.clientX - svg.getBoundingClientRect().left;
      relativeMousePos.y =
        e.clientY - svg.getBoundingClientRect().top - MAX_AMPLITUDE;
    });

    // trigger animation when mouse leaves the svg
    svg.addEventListener("mouseleave", (e) => {
      // cancel any existing animation frames
      if (dragAnimationFrame) {
        cancelAnimationFrame(dragAnimationFrame);
        dragAnimationFrame = null;
      }

      if (vibrateAnimationFrame) {
        cancelAnimationFrame(vibrateAnimationFrame);
        vibrateAnimationFrame = null;
      }

      // calculate the initial phase
      let offset = e.clientY - svg.getBoundingClientRect().top - MAX_AMPLITUDE;
      offset = offset > MAX_AMPLITUDE ? MAX_AMPLITUDE : offset;
      offset = offset < -MAX_AMPLITUDE ? -MAX_AMPLITUDE : offset;

      initialPhase = Math.asin(offset / MAX_AMPLITUDE);

      amplitude = Math.abs(offset);
      lastTime = 0;
      vibrateAnimate();
    });

    // start drag as soon as the mouse touches the string
    path.addEventListener("mouseenter", () => {
      // if there is no drag animation frame, start one
      if (!dragAnimationFrame) {
        dragAnimate();
        if (vibrateAnimationFrame) {
          cancelAnimationFrame(vibrateAnimationFrame);
        }
      }
    });

    // function to draw a new path
    function createNewPath(height: number) {
      const newPath = `M 0 ${inputHeight} q ${
        inputWidth / 2
      } ${height} ${inputWidth} 0`;
      path?.setAttribute("d", newPath);
    }

    // funciton to animate the string while dragging
    function dragAnimate() {
      createNewPath(relativeMousePos.y);
      dragAnimationFrame = requestAnimationFrame(dragAnimate);
    }

    // default values
    let initialPhase = 0;
    let frequency = 3; // number of oscillations per second
    let amplitude = MAX_AMPLITUDE; // the amplitude of the oscillation
    let lastTime = 0; // the time in seconds since the animation started

    // the requestAnimationFrame runs 60 times per second when called recursively
    // so we need to scale the lastTime by 60 in the function at line 75

    // c'mon jee physics (damped harmonic oscillator) y = A K sin(ωt + ɸ)

    function vibrateAnimate() {
      const phase = 2 * Math.PI * frequency * (lastTime / 60) + initialPhase;
      const dampningConstant = Math.exp(-lastTime / 65); // damping constant K
      const y = amplitude * dampningConstant * Math.sin(phase);
      createNewPath(y);
      lastTime++;
      vibrateAnimationFrame = requestAnimationFrame(vibrateAnimate);

      // when the amplitude is small enough, stop the animation
      if (dampningConstant < 0.01) {
        cancelAnimationFrame(vibrateAnimationFrame);
        vibrateAnimationFrame = null;

        createNewPath(0);
      }
    }

    return () => {
      window.removeEventListener("click", () => {});
      svg.removeEventListener("mousemove", () => {});
      svg.removeEventListener("mouseleave", () => {});
      path.removeEventListener("mouseenter", () => {});
      if (dragAnimationFrame) cancelAnimationFrame(dragAnimationFrame);
      if (vibrateAnimationFrame) cancelAnimationFrame(vibrateAnimationFrame);
      createNewPath(0);
    };
  }, [width]);

  return (
    <InputContainer ref={containerRef}>
      <InputField
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...otherInputProps}
      />
      <InputLabel className={value.length ? "shrink" : ""} htmlFor={name}>
        {label}
      </InputLabel>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path ref={pathRef} strokeWidth="1" className="string" />
      </svg>
    </InputContainer>
  );
};

export default InteractiveTextInput;
