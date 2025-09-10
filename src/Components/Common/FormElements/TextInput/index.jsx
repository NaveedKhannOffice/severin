import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './styles.css';

const TextInput = ({
  id,
  type = 'text',
  value = '',
  className,
  placeholder,
  label,
  labelClassName = 'mb-2',
  disabled,
  readOnly = false,
  required,
  rows,
  name,
  onChange,
  onBlur,
  autoComplete,
  error,
  touched,
  inputIcon,
  iconPosition = 'left',
  inline = false,
  // Phone input specific props
  phoneCountry = 'US',
  phoneInternational = true,
  phoneDefaultCountry = 'US',
  ...rest
}) => {
  const [passwordShow, setPasswordShow] = React.useState(true);

  const handlePasswordToggle = () => setPasswordShow((prev) => !prev);

  const handleResetTime = (e) => {
    e.preventDefault();
    if (onChange) {
      const event = {
        target: {
          name: name || id,
          value: '',
        },
      };
      onChange(event);
    }
  };

  // Handle phone input change
  const handlePhoneChange = (phoneValue) => {
    if (onChange) {
      const event = {
        target: {
          name: name || id,
          value: phoneValue || '',
        },
      };
      onChange(event);
    }
  };

  // Handle phone input blur
  const handlePhoneBlur = () => {
    if (onBlur) {
      const event = {
        target: {
          name: name || id,
          value: value,
        },
      };
      onBlur(event);
    }
  };

  const inputProps = {
    id,
    name,
    autoComplete,
    onChange: onChange || (() => {}),
    onBlur,
    disabled,
    readOnly,
    placeholder,
    value: value !== undefined ? value : '',
    className: `form-control ${className || ''} ${
      inputIcon ? `has-icon-${iconPosition}` : ''
    } ${error || touched ? 'is-invalid' : ''}`,
    type: type === 'password' ? (passwordShow ? 'password' : 'text') : type,
    'aria-invalid': !!error,
    ...(type === 'textarea' ? { rows } : {}),
    ...rest,
  };

  const labelText = label && (
    <label
      className={`form-label ${labelClassName || ''}`}
      htmlFor={id || name}
    >
      {label}
      {required && <span className="text-danger">*</span>}
    </label>
  );

  // Phone Input Element
  const phoneInputElement = type === 'tel' && (
    <PhoneInput
      id={id}
      name={name}
      value={value}
      onChange={handlePhoneChange}
      onBlur={handlePhoneBlur}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      country={phoneCountry}
      international={phoneInternational}
      defaultCountry={phoneDefaultCountry}
      className={`form-control phone-input ${className || ''} ${
        inputIcon ? `has-icon-${iconPosition}` : ''
      } ${error ? 'is-invalid' : ''}`}
      {...rest}
    />
  );

  // Regular Input Element
  const inputElement =
    type === 'textarea' ? (
      <textarea {...inputProps} />
    ) : (
      <input {...inputProps} />
    );

  const iconElement =
    inputIcon &&
    (typeof inputIcon === 'function' ? (
      React.createElement(inputIcon, {
        className: `input-icon icon-${iconPosition}`,
      })
    ) : (
      <FontAwesomeIcon
        className={`input-icon icon-${iconPosition}`}
        icon={inputIcon}
      />
    ));

  const passwordToggleButton = type === 'password' && (
    <button
      type="button"
      className="btn view-btn show-btn-1 position-absolute"
      onClick={handlePasswordToggle}
    >
      <FontAwesomeIcon icon={passwordShow ? faEyeSlash : faEye} />
    </button>
  );

  const resetTimeButton = type === 'time' && value && (
    <button
      type="button"
      className="reset-time-btn position-absolute"
      onClick={handleResetTime}
    >
      ×
    </button>
  );

  const wrapperClass =
    type === 'password' ? 'passField-wrap' : 'inputField-wrap';

  const dateOrTimePlaceholder =
    (type === 'date' || type === 'time') &&
    placeholder &&
    (!value ? (
      <span className={`${type}-placeholder`}>{placeholder}</span>
    ) : (
      <span className="selected-value">{value}</span>
    ));

  const inlineForm = (
    <div className="d-flex align-items-center inline-form">
      {labelText}
      <div className={`${wrapperClass} position-relative`}>
        {iconPosition === 'left' && iconElement}
        {type === 'tel' ? phoneInputElement : inputElement}
        {dateOrTimePlaceholder}
        {iconPosition === 'right' && iconElement}
        {passwordToggleButton}
        {resetTimeButton}
      </div>
    </div>
  );

  return (
    <>
      {inline ? (
        inlineForm
      ) : (
        <>
          {labelText}
          <div className={`${wrapperClass} position-relative`}>
            {iconPosition === 'left' && iconElement}
            {type === 'tel' ? phoneInputElement : inputElement}
            {dateOrTimePlaceholder}
            {iconPosition === 'right' && iconElement}
            {passwordToggleButton}
            {resetTimeButton}
          </div>
        </>
      )}
      {error && touched && (
        <div className="error-message text-danger fw-regular ps-3 pt-1">
          {error}
        </div>
      )}
    </>
  );
};

export default TextInput;
