// icons.tsx
// 11-June-2022
import * as React from "react";

// shuffle icon
export const ShuffleIcon = ({
  height = "24px",
  width = "24px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    clipRule="evenodd"
    fillRule="evenodd"
    {...props}
  >
    <path
      d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4.18689 3.47978C4.38215 3.67504 4.38215 3.99162 4.18689 4.18689C3.99162 4.38215 3.67504 4.38215 3.47978 4.18689L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447ZM9.29289 1H7.72222C7.44608 1 7.22222 0.776142 7.22222 0.5C7.22222 0.223858 7.44608 7.45058e-09 7.72222 7.45058e-09H10.5C10.7761 7.45058e-09 11 0.223858 11 0.5V3.27778C11 3.55392 10.7761 3.77778 10.5 3.77778C10.2239 3.77778 10 3.55392 10 3.27778V1.70711L0.853553 10.8536C0.658291 11.0488 0.341709 11.0488 0.146447 10.8536C-0.0488155 10.6583 -0.0488155 10.3417 0.146447 10.1464L9.29289 1ZM6.81311 6.81311C7.00838 6.61785 7.32496 6.61785 7.52022 6.81311L10 9.29289V7.72222C10 7.44608 10.2239 7.22222 10.5 7.22222C10.7761 7.22222 11 7.44608 11 7.72222V10.5C11 10.7761 10.7761 11 10.5 11H7.72222C7.44608 11 7.22222 10.7761 7.22222 10.5C7.22222 10.2239 7.44608 10 7.72222 10H9.29289L6.81311 7.52022C6.61785 7.32496 6.61785 7.00838 6.81311 6.81311Z"
      fill="black"
    />
  </svg>
);

// color icon
export const ListIcon = ({
  height = "24px",
  width = "24px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    clipRule="evenodd"
    fillRule="evenodd"
    {...props}
  >
    <path d="M4 1H1V4H4V1Z" fill="black" />
    <path d="M10 1H7V4H10V1Z" fill="black" />
    <path d="M10 7H7V10H10V7Z" fill="black" />
    <path d="M4 7H1V10H4V7Z" fill="black" />
  </svg>
);
