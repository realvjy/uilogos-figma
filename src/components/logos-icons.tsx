// logos.tsx
// 11-June-2022
import * as React from "react";

// ColorType icon
export const ColorTypeIcon = ({
  height = "32px",
  width = "32px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#FFE6E8"></circle>
    <path
      fill="#EE4153"
      d="M13.179 21.333h-2.511l3.826-12h3.02l3.82 12h-2.51l-2.777-9.257h-.087l-2.781 9.257zm-.157-4.716h5.931v1.98h-5.931v-1.98z"
    ></path>
  </svg>
);

// ColorMark icon
export const ColorMarkIcon = ({
  height = "32px",
  width = "32px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    clipRule="evenodd"
    fillRule="evenodd"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#FFF7DC"></circle>
    <circle cx="10.667" cy="12" r="4" fill="#3191EA"></circle>
    <circle cx="21.333" cy="12" r="4" fill="#EE4153"></circle>
    <path fill="#FFAA5B" d="M16 16l4.62 8h-9.238l4.619-8z"></path>
  </svg>
);

// BlackType icon
export const BlackTypeIcon = ({
  height = "32px",
  width = "32px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#EEE"></circle>
    <path
      fill="#242424"
      d="M13.179 21.333h-2.511l3.826-12h3.02l3.82 12h-2.51l-2.777-9.257h-.087l-2.781 9.257zm-.157-4.716h5.931v1.98h-5.931v-1.98z"
    ></path>
  </svg>
);

// BlackMark icon
export const BlackMarkIcon = ({
  height = "32px",
  width = "32px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    clipRule="evenodd"
    fillRule="evenodd"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#414149"></circle>
    <path
      fill="#fff"
      d="M14.667 12a4 4 0 11-8 0 4 4 0 018 0zm10.666 0a4 4 0 11-8 0 4 4 0 018 0zM20.62 24L16 16l-4.618 8h9.238z"
    ></path>
  </svg>
);

// BlackMark icon
export const FlagIcon = ({
  height = "32px",
  width = "32px",
  secondaryColor,
  ...props
}: React.SVGProps<SVGSVGElement> & { secondaryColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 32 32"
    clipRule="evenodd"
    fillRule="evenodd"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#FFECDC"></circle>
    <path
      fill="#FC644F"
      d="M21.5 16.467l3.766 5.1c-2.833.933-9.366.733-11.9-.567v-9.067c2.5 1.3 9.067 1.534 11.9.567L21.5 16.467z"
    ></path>
    <path
      fill="#A52330"
      d="M13.366 20.967l2.034-1-1.5-4.534-.534.767v4.767z"
    ></path>
    <path
      fill="#CF4351"
      d="M10.6 9.467V18.5s2.367-.633 4.767 1.433v-9c-2.4-2.1-4.766-1.466-4.766-1.466z"
    ></path>
    <path
      fill="#345368"
      d="M10.333 8c-.5 0-.933.4-.933.9v14.183a.917.917 0 101.833 0V8.9c0-.5-.4-.9-.9-.9z"
    ></path>
  </svg>
);
