import * as React from "react";

function Flag() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
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
}

export default Flag;
