import React from "react";

const CloseIcon = () => {
  return (
    <>
      {/* <span className="sr-only">Close menu</span> */}
      <svg
        style={{ width: "30px", height: "30px" }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </>
  );
};

export default CloseIcon;
