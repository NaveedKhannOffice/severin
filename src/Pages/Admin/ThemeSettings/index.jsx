import React, { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import UploadImages from "../../../Components/UploadImage/UploadImage";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";
import LoadingSpinner from "../../../Components/Common/Loader";
import { getDetails, post } from "../../../Services/Api";
import {
  THEME_COLOR_SECTIONS,
  DEFAULT_THEME_STATE,
  mergeThemeState as composeThemeState,
  normalizeColorValue,
  normalizeImageList,
  mapApiDataToForm,
  prepareThemePayload,
  applyThemeToRoot,
  isHexColor,
  isValidColorValue,
  THEME_SETTINGS_ROUTE,
} from "../../../Config/themeSettings";
import { useThemeSettings } from "../../../Context/ThemeContext";
import "./style.css";

const ThemeSettings = () => {
  const [form, setForm] = useState(DEFAULT_THEME_STATE);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const { updateTheme } = useThemeSettings();

  const fetchThemeSettings = useCallback(
    async (withLoader = true) => {
      if (withLoader) {
        setLoading(true);
      }
      try {
        const response = await getDetails(THEME_SETTINGS_ROUTE);
        const payload =
          response?.data?.themeSettings ||
          response?.data?.data ||
          response?.data ||
          response ||
          {};
        const mapped = mapApiDataToForm(payload);
        const merged = composeThemeState(mapped);
        setForm(merged);
        updateTheme(merged);
        setStatusMessage((prev) => (prev?.type === "error" ? null : prev));
      } catch (error) {
        console.error("Failed to fetch theme settings", error);
        const defaults = composeThemeState({});
        setForm(defaults);
        updateTheme(defaults);
        setStatusMessage({
          type: "error",
          text: "Unable to load theme settings from the server. Default theme applied.",
        });
      } finally {
        if (withLoader) {
          setLoading(false);
        }
      }
    },
    [composeThemeState, updateTheme]
  );

  useEffect(() => {
    fetchThemeSettings();
  }, [fetchThemeSettings]);

  useEffect(() => {
    applyThemeToRoot(form);
  }, [form]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (key, value) => {
    const normalized = normalizeColorValue(value);
    setForm((prev) => ({ ...prev, [key]: normalized }));
  };

  const handleImageChange = (key, images) => {
    const normalized = normalizeImageList(images);
    setForm((prev) => ({ ...prev, [key]: normalized }));
  };

  const handleReset = () => {
    const defaults = composeThemeState({}, { includeCssDefaults: true });
    setForm(defaults);
    setStatusMessage(null);
    updateTheme(defaults);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const payload = prepareThemePayload(form);
      const response = await post(THEME_SETTINGS_ROUTE, payload);

      if (response?.status) {
        await fetchThemeSettings(false);
        setStatusMessage({
          type: "success",
          text: response?.message || "Theme settings updated successfully.",
        });
      } else {
        const message = response?.message || "Unable to update theme settings right now.";
        setStatusMessage({ type: "error", text: message });
      }
    } catch (error) {
      console.error("Theme settings update failed", error);
      setStatusMessage({
        type: "error",
        text: "Failed to save theme settings. Default theme remains in place.",
      });
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

  if (loading) {
    return (
      <DashboardLayout pageTitle="Theme Settings">
        <div className="container-fluid py-5">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

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
                Configure brand identity, color tokens, and UI accents. Saved changes update the storefront instantly.
              </p>
            </div>
            <div className="theme-settings__actions">
              <CustomButton
                type="button"
                variant="outline-secondary"
                className="px-4"
                onClick={handleReset}
                disabled={submitting || loading}
              >
                Reset to Defaults
              </CustomButton>
              <CustomButton
                type="submit"
                variant="primary"
                className="px-4"
                loading={submitting}
                loadingText="Saving..."
                disabled={loading && !submitting}
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
