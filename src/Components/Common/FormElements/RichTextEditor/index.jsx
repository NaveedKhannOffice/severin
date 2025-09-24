import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "blockquote", "code-block"],
  ["clean"],
];

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "blockquote",
  "code-block",
];

const RichTextEditor = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder = "Start typing...",
  required = false,
  helperText,
  error,
  readOnly = false,
}) => {
  const handleChange = (content) => {
    if (onChange) onChange(content);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <div className={`rich-text-field ${error ? "has-error" : ""}`}>
      {label && (
        <label className="mainLabel" htmlFor={id}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className={`quillWrapper ${readOnly ? "is-readonly" : ""}`}>
        <ReactQuill
          id={id}
          theme="snow"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          modules={{ toolbar: TOOLBAR_OPTIONS }}
          formats={FORMATS}
          readOnly={readOnly}
        />
      </div>
      {helperText && !error && <small className="helper-text">{helperText}</small>}
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default RichTextEditor;
