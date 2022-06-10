import * as React from "react";

function ColorMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" r="16" fill="#FFF7DC"></circle>
      <circle cx="10.667" cy="12" r="4" fill="#3191EA"></circle>
      <circle cx="21.333" cy="12" r="4" fill="#EE4153"></circle>
      <path fill="#FFAA5B" d="M16 16l4.62 8h-9.238l4.619-8z"></path>
    </svg>
  );
}

export default ColorMark;
