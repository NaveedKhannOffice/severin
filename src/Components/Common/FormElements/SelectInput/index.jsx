import React, { forwardRef } from 'react';
import Form from 'react-bootstrap/Form';
import ReactSelect from 'react-select';
import './styles.css';

const SelectInput = forwardRef(
  (
    {
      // Basic props
      name,
      id,
      label,
      value,
      onChange,
      onBlur,
      options = [],
      required = false,
      placeholder,

      // Styling props
      size = '',
      className = '',
      labelClassName = '',

      
      // Functionality props
      firstIsLabel = false,
      disabled = false,
      error,
      touched,

      // Switch between bootstrap/react-select
      useReactSelect = false,

      // React Select specific props
      isClearable = true,
      isSearchable = true,

      // Additional props
      defaultValue,
      ...props

    },
    ref
  ) => {

    /** -----------------------------
     * Bootstrap Select Handler
     * ----------------------------- */

    const handleBootstrapChange = (event) => {
      if (onChange) {
        const selectedValue = event.target.value;
        onChange(selectedValue);
      }
    };

    const bootstrapOptions = firstIsLabel
      ? [
          {
            value: "",
            label: options[0]?.label || placeholder,
            disabled: true,
          },
          ...options.slice(1),
        ]
      : options;

      /** -----------------------------
     * React Select Handler
     * ----------------------------- */
    const handleReactSelectChange = (selectedOption) => {
      if (onChange) {
        onChange(selectedOption ? selectedOption.value : "");
      }
    };

    const normalizedOptions = options.map((opt) =>
      typeof opt === "object"
        ? { value: String(opt.value), label: opt.label || opt.text || opt.value }
        : { value: String(opt), label: String(opt) }
    );

    const selectedOption =
      normalizedOptions.find((opt) => opt.value === String(value)) || null;
      
/*
    const handleSelectChange = (event) => {
      if (onChange) {
        // Extract the selected value from the event
        const selectedValue = event.target.value;

        // Support both direct value and event object
        if (typeof onChange === 'function') {
          // Pass the selected value directly instead of the event
          onChange(selectedValue);
        }
      }
    };
*/
    // Process options for firstIsLabel functionality
    /*
    const selectOptions = firstIsLabel
      ? [
          {
            value: '',
            label: options[0]?.label || placeholder,
            disabled: true,
          },
          ...options.slice(1),
        ]
      : options;
*/
/*
      // Find the selected option object from value
    const selectedOption =
    options.find((option) => option.value === value) || null;
*/

    return (
      <>
        {/* Label */}
        {label && (
          <label
            className={`form-label ${labelClassName}`}
            htmlFor={id || name}
          >
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}

        {/* Conditional Render: Bootstrap OR React Select */}
        {!useReactSelect ? (
          <Form.Select
            ref={ref}
            name={name}
            id={id || name}
            value={value ?? ""}
            defaultValue={defaultValue}
            onChange={handleBootstrapChange}
            onBlur={onBlur}
            size={size}
            disabled={disabled}
            className={`${className} ${touched && error ? "is-invalid" : ""}`}
            aria-invalid={touched && error ? true : false}
            {...props}
          >
            {placeholder && !firstIsLabel && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {bootstrapOptions.map((option, index) => {
              const optionValue =
                typeof option === "object" && option !== null
                  ? option.value ?? ""
                  : String(option);

              const optionLabel = option.text || option.label || option;
              const isDisabled = option.disabled || false;

              return (
                <option
                  key={`${name}-${index}`}
                  value={optionValue}
                  disabled={isDisabled}
                  className={
                    optionLabel?.toLowerCase().startsWith("add new")
                      ? "text-center secondary-color"
                      : ""
                  }
                >
                  {optionLabel}
                </option>
              );
            })}
          </Form.Select>
        ) : (
          <ReactSelect
            ref={ref}
            inputId={id || name}
            name={name}
            value={selectedOption}
            onChange={handleReactSelectChange}
            onBlur={onBlur}
            options={normalizedOptions}
            placeholder={placeholder || "Select..."}
            isDisabled={disabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            classNamePrefix="react-select"
            className={`${className} ${
              touched && error ? "is-invalid" : ""
            }`}
            {...props}
          />
        )}

        {/* Error */}
        {touched && error && (
          <div className="error-message text-danger fw-regular ps-3 pt-1">
            {error}
          </div>
        )}
        
      </>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;

// Backward-compatible wrapper used as `{ Select }` in legacy code
export const Select = ({
  labelclass,
  selectClass,
  wrapperClass,
  children,
  options,
  ...rest
}) => {
  const resolvedOptions = Array.isArray(options)
    ? options
    : Array.isArray(children)
    ? children
    : [];

  const mappedProps = {
    labelClassName: labelclass || rest.labelClassName,
    className: rest.className || selectClass,
    options: resolvedOptions,
    ...rest,
  };

  return (
    <div className={wrapperClass || ''}>
      <SelectInput {...mappedProps} />
    </div>
  );
};


/* Usage Examples
<SelectInput
  name="country"
  label="Country"
  options={[{ value: "pk", label: "Pakistan" }, { value: "in", label: "India" }]}
  value="pk"
  onChange={(val) => console.log(val)}
/>

<SelectInput
  useReactSelect
  name="city"
  label="City"
  options={[{ value: "karachi", label: "Karachi" }, { value: "lahore", label: "Lahore" }]}
  value="karachi"
  onChange={(val) => console.log(val)}
/>
*/

