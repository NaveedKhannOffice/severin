import React from "react";
import Form from "react-bootstrap/Form";
import "./styles.css";
const SelectInput = ({
  name,
  id,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  required = false,
  placeholder,
  selectClass = "",
  labelClassName = "",
  error,
  touched = false,
  ...props
}) => {
  return (
    <>
      {/* Label */}
      {label && (
        <label className={`form-label ${labelClassName}`} htmlFor={id || name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* Select Dropdown */}
      <Form.Select
        name={name}
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${selectClass} ${touched && error ? "is-invalid" : ""}`}
        aria-invalid={touched && error ? true : false}
        {...props}
      >
        {/* Placeholder */}
        {placeholder && (
          <option value="">{placeholder || "Select an option"}</option>
        )}
        {options.map((opt) => (
          <option
            key={opt.value || opt}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.text || opt.label}
          </option>
        ))}
      </Form.Select>

      {/* Error Message */}
      {touched && error && (
        <div className="error-message text-danger fw-light ps-3 pt-2">
          {error}
        </div>
      )}
    </>
  );
};

export default SelectInput;

/* Call as Component

<Select
  label="version_type"
  name="version_type"
  value={values.version_type}
  onChange={(value) => {
    handleChange({
      target: { name: "version_type", value },
    });
    console.log(value);
  }}
  options={[
    { value: "electronics", text: "Electronics" },
    { value: "fashion", text: "Fashion" },
    { value: "books", text: "Books" },
  ]}
  mainLabel="Select a category"
  onBlur={handleBlur}
  error={errors.version_type}
  touched={touched.version_type} // Use Formik's touched state
/>
*/
