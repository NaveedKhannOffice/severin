import { useLocation } from "react-router-dom";
import {
  getBreadcrumbConfig,
  getBreadcrumbIcon,
  getBreadcrumbLabel,
} from "../../Config/breadcrumbConfig";

export const useBreadcrumbs = (customPaths = null) => {
  const location = useLocation();

  // If custom paths are provided, use them
  if (customPaths) {
    return customPaths;
  }

  // Try to get predefined config first
  const configPaths = getBreadcrumbConfig(location.pathname);
  if (configPaths) {
    return configPaths;
  }

  // Auto-generate breadcrumbs from current path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const generatedPaths = [];

  // Always start with Home
  generatedPaths.push(["Home", "/"]);

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    const label = getBreadcrumbLabel(segment);

    if (isLast) {
      generatedPaths.push([label]); // No link for current page
    } else {
      generatedPaths.push([label, currentPath]);
    }
  });

  return generatedPaths;
};

export const useBreadcrumbIcon = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Get icon for the main section (first segment)
  if (pathSegments.length > 0) {
    return getBreadcrumbIcon(pathSegments[0]);
  }

  return null;
};
