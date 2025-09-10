import React from "react";
import "./style.css";

const PasswordStrength = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { score, label: "Weak", color: "#ff4444" };
    if (score <= 3) return { score, label: "Fair", color: "#ff8800" };
    if (score <= 4) return { score, label: "Good", color: "#ffbb33" };
    return { score, label: "Strong", color: "#00C851" };
  };

  const strength = getPasswordStrength(password);
  const checks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /\d/.test(password) },
    {
      label: "One special character",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div
          className="strength-fill"
          style={{
            width: `${(strength.score / 5) * 100}%`,
            backgroundColor: strength.color,
          }}
        />
      </div>
      <div className="strength-label" style={{ color: strength.color }}>
        Password Strength: {strength.label}
      </div>
      <div className="password-requirements">
        {checks.map((check, index) => (
          <div
            key={index}
            className={`requirement ${check.met ? "met" : "unmet"}`}
          >
            <span className="requirement-icon">{check.met ? "✓" : "○"}</span>
            <span className="requirement-text">{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
