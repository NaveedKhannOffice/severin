// import { PulseLoader } from 'react-spinners';
// import './style.css';

// const CustomButton = ({
//   style,
//   type,
//   variant,
//   className,
//   disabled,
//   onClick,
//   text,
//   children,
//   loading,
// }) => {
//   return (
//     <div style={{ ...style }}>
//       <button
//         type={type}
//         className={`customButton ${variant} ${className} ${
//           disabled ? 'disabled' : ''
//         }`}
//         onClick={onClick}
//         disabled={disabled}
//       >
//         {loading ? (
//           <PulseLoader size={8} className="beechMein" style={{ height: 21 }} />
//         ) : (
//           text || children
//         )}
//       </button>
//     </div>
//   );
// };

// export default CustomButton;


import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const CustomButton = ({
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  loading = false, // loading state flag
  loadingText = "Loading…", // optional loading text
  text, // default text
  children,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      style={style}
      className={`btn btn-${variant} ${className}`}
      onClick={!loading ? onClick : null}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
         <span
         className="spinner-border spinner-border-sm me-2"
         role="status"
         aria-hidden="true"
       />
      )}
      <span>{loading ? loadingText : children || text}</span>
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default CustomButton;

