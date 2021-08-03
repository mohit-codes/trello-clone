import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const BoardCard = ({ object, to }) => {
  return (
    <div>
      <Link className="" to={`/${to}/${object._id}`} state={{ object }}>
        <div className="p-2 w-60 h-32 mr-5 mt-6 border-2 border-black bg-blue-500  hover:shadow-lg cursor-pointer">
          {object.title}
        </div>
      </Link>
    </div>
  );
};
BoardCard.propTypes = {
  object: PropTypes.object,
  to: PropTypes.string,
};
