import React from "react";

import "./styles/loader-button.css";

export const Loader = function Loader() {
  return (
    <div className="loader__container">
      <div className="spinner-border loader" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
