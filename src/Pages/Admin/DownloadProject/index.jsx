import React, { useCallback, useMemo, useState } from "react";
import { DashboardLayout } from "../../../Components/Layouts/AdminLayout/DashboardLayout";
import CustomButton from "../../../Components/Common/CustomButton";
import LoadingSpinner from "../../../Components/Common/Loader";
import { post } from "../../../Services/Api";
import "./style.css";

const DOWNLOAD_PROJECT_ROUTE = "/admin/downloads/project";
const URL_KEYS = ["download_url", "downloadUrl", "url", "link", "href", "file"];
const NESTED_KEYS = ["data", "result", "payload", "response"];

const extractUrlFromResponse = (response) => {
  const visited = new Set();

  const visit = (node) => {
    if (!node || typeof node !== "object") {
      return "";
    }
    if (visited.has(node)) {
      return "";
    }
    visited.add(node);

    for (const key of URL_KEYS) {
      const value = node[key];
      if (typeof value === "string" && value.trim().length > 0) {
        return value.trim();
      }
    }

    for (const key of NESTED_KEYS) {
      const nested = node[key];
      const extracted = visit(nested);
      if (extracted) {
        return extracted;
      }
    }

    if (Array.isArray(node)) {
      for (const item of node) {
        const extracted = visit(item);
        if (extracted) {
          return extracted;
        }
      }
    }

    return "";
  };

  return visit(response);
};

const DownloadProject = () => {
  const [preparing, setPreparing] = useState(false);
  const [status, setStatus] = useState(null);

  const statusMessage = useMemo(() => {
    if (!status) {
      return null;
    }
    const baseClass = "download-project__status";
    const modifier = status.type === "error" ? " download-project__status--error" : " download-project__status--success";
    return {
      className: `${baseClass}${modifier}`,
      text: status.text,
    };
  }, [status]);

  const handleDownload = useCallback(async () => {
    if (preparing) {
      return;
    }

    setStatus(null);
    setPreparing(true);

    try {
      const response = await post(DOWNLOAD_PROJECT_ROUTE, {});
      const downloadUrl = extractUrlFromResponse(response);

      if (downloadUrl) {
        window.open(downloadUrl, "_blank", "noopener,noreferrer");
        setStatus({ type: "success", text: "Download tab khul gaya hai. Agar download automatically start na ho to link ko manually open karein." });
      } else {
        const message =
          (typeof response?.message === "string" && response.message.trim())
            ? response.message.trim()
            : "Download link nahi mila. Thori dair baad dobara koshish karein.";
        setStatus({ type: "error", text: message });
      }
    } catch (error) {
      console.error("Download project request failed", error);
      setStatus({
        type: "error",
        text: "Download link generate karte waqt error aaya. Network ya server check karein.",
      });
    } finally {
      setPreparing(false);
    }
  }, [preparing]);

  return (
    <DashboardLayout pageTitle="Download Project">
      <div className="container-fluid py-4">
        <div className="download-project">
          <div className="dashCard download-project__card">
            <div className="download-project__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img" focusable="false">
                <title>Project folder</title>
                <path
                  d="M12 18h14l4 6h22a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"
                  fill="currentColor"
                  opacity="0.16"
                />
                <path
                  d="M12 18h14l4 6h22a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 36h40"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </div>

            <h2 className="mainTitle mb-2">Download Project</h2>
            <p className="text-muted mb-4">
              Latest build download karein. Button dabate hi hum backend se secure link generate karte hain.
            </p>

            <CustomButton
              type="button"
              variant="primary"
              className="px-5 download-project__button"
              onClick={handleDownload}
              loading={preparing}
              loadingText="Preparing..."
            >
              Download
            </CustomButton>

            {preparing && (
              <div className="download-project__progress" aria-live="polite">
                <LoadingSpinner />
                <p className="download-project__progress-text">
                  Download link ban raha hai... kripya thoda intezar karein.
                </p>
              </div>
            )}

            {statusMessage && (
              <div className={statusMessage.className} role="status">
                {statusMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DownloadProject;
