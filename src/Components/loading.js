import React from "react";
import PropTypes from "prop-types";

export const Loading = ({ spinnerColor }) => {
  return (
    <div className="flex justify-center w-60 h-32  mr-5 mt-6">
      <div
        className=" animate-spin mt-auto mb-auto border-t-4 w-10 h-10 rounded-full"
        style={{ borderColor: spinnerColor }}
      ></div>
    </div>
  );
};

Loading.propTypes = {
  spinnerColor: PropTypes.string,
};
Loading.defaultProps = {
  spinnerColor: "white",
};
