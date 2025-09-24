import React, { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import UploadImages from "../../../Components/UploadImage/UploadImage";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";
import "./style.css";

const THEME_COLOR_SECTIONS = [
  {
    key: "brandPalette",
    title: "Brand Palette",
    description: "Primary brand colors that drive buttons, highlights, and immersive surfaces across the storefront.",
    fields: [
      {
        key: "primaryColor",
        label: "Primary Brand",
        cssVariables: ["--bs-primary", "--bs-primary-color"],
        fallback: "#BD7C66",
        helper: "Used for primary CTAs, badges, and highlight accents.",
      },
      {
        key: "secondaryColor",
        label: "Secondary",
        cssVariables: ["--bs-secondary", "--bs-secondary-color"],
        fallback: "#2B2B2B",
        helper: "Secondary accents and tab highlights.",
      },
      {
        key: "accentColor",
        label: "Accent",
        cssVariables: ["--yellowColor"],
        fallback: "#E5BB45",
        helper: "Badges, callouts, and subtle accent strokes.",
      },
      {
        key: "highlightColor",
        label: "Link / CTA",
        cssVariables: ["--blueColor"],
        fallback: "#1819FF",
        helper: "Inline links and tertiary CTAs.",
      },
    ],
  },
  {
    key: "surfaces",
    title: "Surfaces & Structure",
    description: "Base colors that control backgrounds, cards, and neutral layers.",
    fields: [
      {
        key: "surfaceColor",
        label: "Surface",
        cssVariables: ["--whiteColor"],
        fallback: "#FFFFFF",
        helper: "Card backgrounds and elevated surfaces.",
      },
      {
        key: "backgroundColor",
        label: "App Background",
        cssVariables: ["--lightWhiteColor"],
        fallback: "#F0F0F0",
        helper: "Global page background and section fills.",
      },
      {
        key: "mutedSurfaceColor",
        label: "Muted Surface",
        cssVariables: ["--lightGreyColor"],
        fallback: "#262626",
        helper: "Overlays, muted panels, and hover states.",
      },
      {
        key: "borderColor",
        label: "Default Border",
        cssVariables: ["--bs-border-color"],
        fallback: "#6C7275",
        helper: "Card outlines, dividers, and table borders.",
      },
      {
        key: "paginationBorderColor",
        label: "Pagination Border",
        cssVariables: ["--pagiBorderColor"],
        fallback: "#DCDCDC",
        helper: "Pagination and chip outlines.",
      },
    ],
  },
  {
    key: "typography",
    title: "Typography Colors",
    description: "Heading, body, and muted text colors applied throughout the experience.",
    fields: [
      {
        key: "headingColor",
        label: "Heading Text",
        cssVariables: ["--section-heading-color"],
        fallback: "#2B2B2B",
        helper: "Page titles and section headings.",
      },
      {
        key: "bodyTextColor",
        label: "Body Text",
        cssVariables: ["--lightblackColor"],
        fallback: "#333333",
        helper: "Paragraph copy and long-form content.",
      },
      {
        key: "baseTextColor",
        label: "Base Text",
        cssVariables: ["--blackColor"],
        fallback: "#000000",
        helper: "Critical text on light backgrounds.",
      },
      {
        key: "mutedTextColor",
        label: "Muted Text",
        cssVariables: ["--grayColor"],
        fallback: "#666666",
        helper: "Secondary labels and descriptive copy.",
      },
      {
        key: "subtleTextColor",
        label: "Subtle Text",
        cssVariables: ["--grayLightColor"],
        fallback: "#999999",
        helper: "Helper text, placeholders, and meta data.",
      },
    ],
  },
  {
    key: "forms",
    title: "Inputs & Controls",
    description: "Color tokens for form controls, focus states, and toggle accents.",
    fields: [
      {
        key: "inputBackground",
        label: "Input Background",
        cssVariables: ["--input-bg-color"],
        fallback: "#FFFFFF",
      },
      {
        key: "inputTextColor",
        label: "Input Text",
        cssVariables: ["--input-text-color"],
        fallback: "#6C7275",
      },
      {
        key: "inputLabelColor",
        label: "Input Label",
        cssVariables: ["--input-label-color"],
        fallback: "#6C7275",
      },
      {
        key: "inputBorderColor",
        label: "Input Border",
        cssVariables: ["--bs-input-border-color"],
        fallback: "#6C7275",
      },
      {
        key: "inputFocusBorderColor",
        label: "Input Focus",
        cssVariables: ["--bs-input-focus-border-color"],
        fallback: "#BD7C66",
      },
      {
        key: "navbarTogglerBorderColor",
        label: "Navbar Toggle",
        cssVariables: ["--navbar-toggler-border-color"],
        fallback: "#000000",
      },
    ],
  },
  {
    key: "buttons",
    title: "Buttons",
    description: "Primary button tokens with hover accents.",
    fields: [
      {
        key: "buttonPrimaryColor",
        label: "Primary Button",
        cssVariables: ["--bs-primary-btn"],
        fallback: "#BD7C66",
      },
      {
        key: "buttonPrimaryHover",
        label: "Primary Button Hover",
        cssVariables: ["--bs-primary-btn-hover"],
        fallback: "#6C7275",
      },
    ],
  },
  {
    key: "feedback",
    title: "Feedback States",
    description: "Semantic colors for success, danger, and informational messaging.",
    fields: [
      {
        key: "successColor",
        label: "Success",
        cssVariables: ["--greenColor"],
        fallback: "#42C900",
      },
      {
        key: "successDeepColor",
        label: "Success (Deep)",
        cssVariables: ["--darkGreen"],
        fallback: "#2C8109",
      },
      {
        key: "infoColor",
        label: "Info",
        cssVariables: ["--lightPrimaryColor"],
        fallback: "#80BDFF",
      },
      {
        key: "dangerColor",
        label: "Danger",
        cssVariables: ["--redColor"],
        fallback: "#D70000",
      },
    ],
  },
];

const COLOR_FIELDS = THEME_COLOR_SECTIONS.flatMap((section) => section.fields);
const COLOR_FIELD_KEYS = COLOR_FIELDS.map((field) => field.key);
const CSS_VARIABLE_BINDINGS = COLOR_FIELDS.reduce((acc, field) => {
  acc[field.key] = field.cssVariables || [];
  return acc;
}, {});

const DEFAULT_TEXT_VALUES = {
  brandName: "Severin",
  brandTagline: "",
  brandDescription: "",
};

const DEFAULT_THEME_STATE = COLOR_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.key]: field.fallback }),
  {
    ...DEFAULT_TEXT_VALUES,
    primaryLogo: [],
    secondaryLogo: [],
    favicon: [],
  }
);

const isHexColor = (value = "") =>
  /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value.trim());

const isRgbColor = (value = "") => /^rgba?\(/i.test(value.trim());

const normalizeColorValue = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (isRgbColor(trimmed)) {
    const matches = trimmed.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!matches) return trimmed;
    const [, r, g, b] = matches;
    const toHex = (component) =>
      Math.max(0, Math.min(255, Number(component)))
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  if (isHexColor(trimmed)) {
    return trimmed.toUpperCase();
  }
  if (trimmed.toLowerCase() === "transparent") {
    return "transparent";
  }
  return trimmed;
};

const isValidColorValue = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return (
    trimmed.toLowerCase() === "transparent" ||
    isHexColor(trimmed) ||
    isRgbColor(trimmed)
  );
};

const transformLegacySettings = (legacy) => {
  if (!legacy || typeof legacy !== "object") return {};
  const mapped = {};
  if (legacy.title) mapped.brandName = legacy.title;
  if (Array.isArray(legacy.logo)) mapped.primaryLogo = legacy.logo;
  if (legacy.primaryColor) mapped.primaryColor = normalizeColorValue(legacy.primaryColor);
  if (legacy.buttonColor) mapped.buttonPrimaryColor = normalizeColorValue(legacy.buttonColor);
  if (legacy.themeColor) mapped.highlightColor = normalizeColorValue(legacy.themeColor);
  return mapped;
};

const getCssVariableDefaults = () => {
  if (typeof window === "undefined") return {};
  const root = document.documentElement;
  if (!root) return {};
  const computed = window.getComputedStyle(root);
  return COLOR_FIELDS.reduce((acc, field) => {
    const cssVarNames = field.cssVariables || [];
    for (const cssVar of cssVarNames) {
      const rawValue = computed.getPropertyValue(cssVar);
      if (rawValue) {
        const normalized = normalizeColorValue(rawValue);
        if (normalized) {
          acc[field.key] = normalized;
          break;
        }
      }
    }
    return acc;
  }, {});
};

const pickSerializableImages = (list) =>
  Array.isArray(list) ? list.filter((item) => typeof item === "string") : [];

const ThemeSettings = () => {
  const [form, setForm] = useState(DEFAULT_THEME_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const cssDefaults = getCssVariableDefaults();
    let saved = {};
    try {
      const raw = localStorage.getItem("themeSettings");
      if (raw) {
        saved = JSON.parse(raw) || {};
      }
    } catch (error) {
      console.error("Failed to parse saved theme settings", error);
    }

    setForm((prev) => {
      const next = { ...prev, ...cssDefaults, ...saved, ...transformLegacySettings(saved) };
      if (Array.isArray(saved.primaryLogo)) next.primaryLogo = saved.primaryLogo;
      if (Array.isArray(saved.secondaryLogo)) next.secondaryLogo = saved.secondaryLogo;
      if (Array.isArray(saved.favicon)) next.favicon = saved.favicon;
      return next;
    });
  }, []);

  const applyTheme = useCallback((themeConfig) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (!root) return;

    COLOR_FIELD_KEYS.forEach((fieldKey) => {
      const cssVars = CSS_VARIABLE_BINDINGS[fieldKey];
      const value = themeConfig[fieldKey];
      if (!cssVars || cssVars.length === 0 || !isValidColorValue(value)) return;
      cssVars.forEach((cssVar) => {
        root.style.setProperty(cssVar, value.trim());
      });
    });
  }, []);

  useEffect(() => {
    applyTheme(form);
  }, [form, applyTheme]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (key, value) => {
    const normalized = normalizeColorValue(value);
    setForm((prev) => ({ ...prev, [key]: normalized }));
  };

  const handleImageChange = (key, images) => {
    setForm((prev) => ({ ...prev, [key]: images }));
  };

  const handleReset = () => {
    setForm(DEFAULT_THEME_STATE);
    setStatusMessage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const serializable = {
        ...form,
        primaryLogo: pickSerializableImages(form.primaryLogo),
        secondaryLogo: pickSerializableImages(form.secondaryLogo),
        favicon: pickSerializableImages(form.favicon),
      };

      localStorage.setItem("themeSettings", JSON.stringify(serializable));
      applyTheme(form);
      setStatusMessage({ type: "success", text: "Theme settings saved locally. API integration will replace this flow." });
    } catch (error) {
      console.error("Theme settings save failed", error);
      setStatusMessage({ type: "error", text: "Unable to persist theme settings locally." });
    } finally {
      setSubmitting(false);
    }
  };

  const colorValueForPicker = useCallback(
    (key, fallback) => {
      const value = form[key];
      if (isHexColor(value)) return value;
      if (isHexColor(fallback)) return fallback;
      return "#000000";
    },
    [form]
  );

  const renderColorField = (field) => {
    const value = form[field.key] ?? field.fallback;
    const safePickerValue = colorValueForPicker(field.key, field.fallback);

    return (
      <div key={field.key} className="theme-settings__swatch">
        <div className="theme-settings__swatch-header">
          <span className="theme-settings__swatch-chip" style={{ backgroundColor: isValidColorValue(value) ? value : field.fallback }} />
          <div>
            <label className="theme-settings__swatch-label" htmlFor={field.key}>
              {field.label}
            </label>
            {field.cssVariables && field.cssVariables.length > 0 && (
              <span className="theme-settings__css-var">{field.cssVariables.join(", ")}</span>
            )}
          </div>
        </div>
        <div className="theme-settings__swatch-inputs">
          <input
            type="color"
            id={`${field.key}-picker`}
            className="theme-settings__color-picker"
            value={safePickerValue}
            onChange={(event) => handleColorChange(field.key, event.target.value)}
          />
          <input
            id={field.key}
            name={field.key}
            type="text"
            className="form-control theme-settings__color-text"
            value={value}
            onChange={(event) => handleColorChange(field.key, event.target.value)}
            placeholder="#000000"
          />
        </div>
        {field.helper && <small className="theme-settings__helper">{field.helper}</small>}
      </div>
    );
  };

  return (
    <DashboardLayout pageTitle="Theme Settings">
      <div className="container-fluid theme-settings">
        <form onSubmit={handleSubmit}>
          <div className="theme-settings__header">
            <div>
              <h2 className="mainTitle mb-1">Theme Settings</h2>
              <p className="text-muted mb-0">
                Configure brand identity, color tokens, and UI accents. Logo uploads are held client-side until API integration is ready.
              </p>
            </div>
            <div className="theme-settings__actions">
              <CustomButton
                type="button"
                variant="outline-secondary"
                className="px-4"
                onClick={handleReset}
                disabled={submitting}
              >
                Reset to Defaults
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                className="px-4"
                loading={submitting}
                loadingText="Saving..."
              >
                Save Theme
              </CustomButton>
            </div>
          </div>

          {statusMessage && (
            <div
              className={`theme-settings__alert ${statusMessage.type === "error" ? "theme-settings__alert--error" : "theme-settings__alert--success"}`}
            >
              {statusMessage.text}
            </div>
          )}

          <section className="dashCard theme-settings__section">
            <header className="theme-settings__section-header">
              <h3>Brand Identity</h3>
              <p>Core brand properties shared with the storefront and customer emails.</p>
            </header>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <TextInput
                  id="brandName"
                  name="brandName"
                  label="Brand Name"
                  labelclass="mainLabel"
                  placeholder="Enter brand name"
                  inputclass="mainInput"
                  value={form.brandName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <TextInput
                  id="brandTagline"
                  name="brandTagline"
                  label="Tagline"
                  labelclass="mainLabel"
                  placeholder="Optional brand tagline"
                  inputclass="mainInput"
                  value={form.brandTagline}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <TextInput
                  id="brandDescription"
                  name="brandDescription"
                  label="Short Description"
                  labelclass="mainLabel"
                  placeholder="One or two sentences about the brand"
                  inputclass="mainInput"
                  type="textarea"
                  rows={3}
                  value={form.brandDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <UploadImages
                  label="Primary Logo"
                  images={form.primaryLogo}
                  numberOfFiles={1}
                  showNumberOfImagesText={false}
                  previewHeight={120}
                  onChange={(images) => handleImageChange("primaryLogo", images)}
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <UploadImages
                  label="Secondary / Inverted Logo"
                  images={form.secondaryLogo}
                  numberOfFiles={1}
                  showNumberOfImagesText={false}
                  previewHeight={120}
                  onChange={(images) => handleImageChange("secondaryLogo", images)}
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <UploadImages
                  label="Favicon"
                  images={form.favicon}
                  numberOfFiles={1}
                  showNumberOfImagesText={false}
                  previewHeight={80}
                  onChange={(images) => handleImageChange("favicon", images)}
                />
              </div>
            </div>
          </section>

          {THEME_COLOR_SECTIONS.map((section) => (
            <section key={section.key} className="dashCard theme-settings__section">
              <header className="theme-settings__section-header">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </header>
              <div className="theme-settings__swatch-grid">
                {section.fields.map((field) => renderColorField(field))}
              </div>
            </section>
          ))}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ThemeSettings;
