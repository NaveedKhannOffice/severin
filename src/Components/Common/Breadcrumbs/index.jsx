import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Breadcrumbs = ({
  paths,
  className = "mt-3 mt-lg-4",
  showHome = true,
  separator = "-",
  icon = null,
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if no paths provided
  const generatePathsFromLocation = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const generatedPaths = [];

    if (showHome) {
      generatedPaths.push(["Home", "/"]);
    }

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      if (isLast) {
        generatedPaths.push([label]); // No link for current page
      } else {
        generatedPaths.push([label, currentPath]);
      }
    });

    return generatedPaths;
  };

  const breadcrumbPaths = paths || generatePathsFromLocation();

  return (
    <nav aria-label="breadcrumb" className={`${className} breadcrumb-wrap`}>

        <ul className="breadcrumb">
          {icon && <li className="breadcrumb-item breadcrumb-icon">{icon}</li>}
          {breadcrumbPaths.map((path, index) => {
            const [label, link] = Array.isArray(path) ? path : [path];
            const isLast = index === breadcrumbPaths.length - 1;

            return (
              <React.Fragment key={index}>
                <li className={`breadcrumb-item ${isLast ? "active" : ""}`}>
                  {link && !isLast ? (
                    <Link to={link} title={label}>
                      {label}
                    </Link>
                  ) : (
                    <span title={label}>{label}</span>
                  )}
                </li>
                {!isLast && (
                  <li className="breadcrumb-separator">
                    <span>{separator}</span>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
    </nav>
  );
};

export default Breadcrumbs;
