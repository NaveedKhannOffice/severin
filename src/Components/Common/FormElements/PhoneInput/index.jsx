import React, { useState } from "react";
import "./style.css";

const PhoneInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
}) => {
  const [displayValue, setDisplayValue] = useState(value || "");

  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, "");

    // Limit to 10 digits
    const limitedDigits = digits.slice(0, 10);

    // Format as (XXX) XXX-XXXX
    if (limitedDigits.length === 0) return "";
    if (limitedDigits.length <= 3) return `(${limitedDigits}`;
    if (limitedDigits.length <= 6)
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
      3,
      6
    )}-${limitedDigits.slice(6)}`;
  };

  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setDisplayValue(formatted);

    // Extract digits for the actual value
    const digits = formatted.replace(/\D/g, "");

    // Create a synthetic event with the digits value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: name || id,
        value: digits,
      },
    };

    onChange(syntheticEvent);
  };

  const handleBlur = (e) => {
    setDisplayValue(formatPhoneNumber(e.target.value));
    onBlur(e);
  };

  return (
    <div className="phone-input-container">
      <input
        id={id}
        name={name || id}
        type="tel"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || "(XXX) XXX-XXXX"}
        required={required}
        className={`phone-input ${error ? "is-invalid" : ""}`}
        maxLength={14} // (XXX) XXX-XXXX = 14 characters
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default PhoneInput;
