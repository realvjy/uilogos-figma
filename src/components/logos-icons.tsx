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

// Brand Logo icon
export const BrandIcon = ({
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
    <circle cx="16" cy="16" r="16" fill="#F5F5F5" />
    <path
      d="M22.8514 16.1575C22.8514 15.6966 22.8106 15.2591 22.7406 14.8333H16.1489V17.4641H19.9231C19.7539 18.3275 19.2581 19.0566 18.5231 19.5525V21.3025H20.7748C22.0931 20.0833 22.8514 18.2866 22.8514 16.1575Z"
      fill="#4285F4"
    />
    <path
      d="M16.1489 23C18.0389 23 19.6197 22.37 20.7747 21.3025L18.523 19.5525C17.893 19.9725 17.0939 20.2291 16.1489 20.2291C14.323 20.2291 12.7772 18.9983 12.223 17.3358H9.90137V19.1383C11.0505 21.425 13.413 23 16.1489 23Z"
      fill="#34A853"
    />
    <path
      d="M12.2231 17.3359C12.0773 16.9159 12.0014 16.4667 12.0014 16C12.0014 15.5334 12.0831 15.0842 12.2231 14.6642V12.8617H9.90143C9.42309 13.8067 9.14893 14.8684 9.14893 16C9.14893 17.1317 9.42309 18.1934 9.90143 19.1384L12.2231 17.3359Z"
      fill="#FBBC05"
    />
    <path
      d="M16.1489 11.7708C17.1814 11.7708 18.103 12.1267 18.8322 12.8208L20.8272 10.8258C19.6197 9.69417 18.0389 9 16.1489 9C13.413 9 11.0505 10.575 9.90137 12.8617L12.223 14.6642C12.7772 13.0017 14.323 11.7708 16.1489 11.7708Z"
      fill="#EA4335"
    />
  </svg>
);
