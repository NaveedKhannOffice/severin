import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import UploadImages from "../../../Components/UploadImage/UploadImage";
import TextInput from "../../../Components/Common/FormElements/TextInput";
import CustomButton from "../../../Components/Common/CustomButton";

const defaultTheme = {
  title: "",
  logo: [],
  primaryColor: "#1A8C1A",
  buttonColor: "#1819ff",
  themeColor: "#0d6efd",
};

const ThemeSettings = () => {
  const [form, setForm] = useState(defaultTheme);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("themeSettings"));
      if (saved && typeof saved === "object") setForm({ ...defaultTheme, ...saved });
    } catch (e) {}
  }, []);

  const applyTheme = (cfg) => {
    const root = document.documentElement;
    if (!root) return;
    if (cfg.primaryColor) root.style.setProperty("--primary-color", cfg.primaryColor);
    if (cfg.buttonColor) root.style.setProperty("--button-color", cfg.buttonColor);
    if (cfg.themeColor) root.style.setProperty("--theme-color", cfg.themeColor);
  };

  useEffect(() => {
    applyTheme(form);
  }, [form.primaryColor, form.buttonColor, form.themeColor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      localStorage.setItem("themeSettings", JSON.stringify(form));
      applyTheme(form);
      alert("Theme settings saved");
    } catch (err) {
      console.error("Theme save failed", err);
      alert("Failed to save theme settings");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Theme Settings">
      <div className="container-fluid">
        <div className="my-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <h2 className="mainTitle mb-0">Theme Settings</h2>
        </div>
        <div className="dashCard">
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-6 col-lg-4">
              <TextInput
                label="Title"
                labelclass="mainLabel"
                type="text"
                placeholder="Enter site title"
                inputclass="mainInput"
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="mainLabel">Primary Color</label>
              <input
                type="color"
                className="form-control form-control-color w-100"
                value={form.primaryColor}
                onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))}
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="mainLabel">Button Color</label>
              <input
                type="color"
                className="form-control form-control-color w-100"
                value={form.buttonColor}
                onChange={(e) => setForm((f) => ({ ...f, buttonColor: e.target.value }))}
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="mainLabel">Theme Color</label>
              <input
                type="color"
                className="form-control form-control-color w-100"
                value={form.themeColor}
                onChange={(e) => setForm((f) => ({ ...f, themeColor: e.target.value }))}
              />
            </div>

            <div className="col-12 mt-3">
              <UploadImages
                label="Logo"
                images={form.logo}
                numberOfFiles={1}
                showNumberOfImagesText={false}
                onChange={(imgs) => setForm((f) => ({ ...f, logo: imgs }))}
              />
            </div>

            <div className="col-12 mt-3">
              <CustomButton
                variant="primary"
                className="px-5"
                text="Save Settings"
                pendingText="Saving..."
                isPending={submitting}
                type="submit"
                disabled={submitting}
              />
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ThemeSettings;

