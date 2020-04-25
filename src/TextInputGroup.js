import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={classnames("form-control form-control-md", {
          "is-invalid": error
        })}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
      />
      {error && <div className="invalid-feedback"> {error}</div>}
    </div>
  );
};
TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};
TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
