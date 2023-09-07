import React from "react";
import PropTypes from "prop-types";
import Wrapper from "../assets/wrappers/ErrorMessage";
/* ErrorMessage component 
props:
  - message: changes the error message
*/
const ErrorMessage = ({ message }) => {
  return (
    <Wrapper>
      <span>{message}</span>
    </Wrapper>
  );
};

ErrorMessage.defaultProps = {
  message: "Required field",
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
