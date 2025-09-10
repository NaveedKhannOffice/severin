import React from "react";
import "./style.css";

const ValidationSummary = ({ errors, touched }) => {
  const hasErrors =
    Object.keys(errors).length > 0 && Object.keys(touched).length > 0;

  if (!hasErrors) return null;

  return (
    <div className="validation-summary">
      <div className="validation-header">
        <h6>Please fix the following errors:</h6>
      </div>
      <ul className="validation-list">
        {Object.entries(errors).map(([field, error]) => {
          if (touched[field]) {
            return (
              <li key={field} className="validation-item">
                <span className="validation-icon">⚠️</span>
                <span className="validation-text">{error}</span>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ValidationSummary;
