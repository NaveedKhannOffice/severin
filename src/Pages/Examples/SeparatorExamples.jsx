import React from "react";
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

const SeparatorExamples = () => {
  return (
    <div className="container mt-4">
      <h2>Breadcrumb Separator Examples</h2>

      <div className="row mt-4">
        <div className="col-12">
          <h4>1. Default Separator (›)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>2. Arrow Separator (→)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="→"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>3. Slash Separator (/)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="/"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>4. Pipe Separator (|)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="|"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>5. Bullet Separator (•)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="•"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>6. Double Arrow Separator (»)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="»"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>7. Custom Separator (◆)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator="◆"
            className="mb-4"
          />
        </div>

        <div className="col-12">
          <h4>8. No Separator (Empty)</h4>
          <Breadcrumbs
            paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
            icon="🛍️"
            separator=""
            className="mb-4"
          />
        </div>
      </div>

      <div className="mt-5">
        <h3>Code Examples:</h3>
        <pre className="bg-light p-3 rounded">
          {`// Default separator (›)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
/>

// Arrow separator (→)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="→"
/>

// Slash separator (/)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="/"
/>

// Pipe separator (|)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="|"
/>

// Bullet separator (•)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="•"
/>

// Double arrow separator (»)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="»"
/>

// Custom separator (◆)
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="◆"
/>

// No separator
<Breadcrumbs 
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator=""
/>`}
        </pre>
      </div>

      <div className="mt-4">
        <h3>Available Separators:</h3>
        <div className="row">
          <div className="col-md-3">
            <p>
              <strong>›</strong> - Default (Single right-pointing angle)
            </p>
            <p>
              <strong>→</strong> - Arrow (Right arrow)
            </p>
            <p>
              <strong>/</strong> - Slash (Forward slash)
            </p>
            <p>
              <strong>|</strong> - Pipe (Vertical bar)
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>•</strong> - Bullet (Middle dot)
            </p>
            <p>
              <strong>»</strong> - Double arrow (Right-pointing double angle)
            </p>
            <p>
              <strong>◆</strong> - Diamond (Black diamond)
            </p>
            <p>
              <strong>▶</strong> - Triangle (Right-pointing triangle)
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>◀</strong> - Left triangle (Left-pointing triangle)
            </p>
            <p>
              <strong>●</strong> - Circle (Black circle)
            </p>
            <p>
              <strong>■</strong> - Square (Black square)
            </p>
            <p>
              <strong>▲</strong> - Up triangle (Up-pointing triangle)
            </p>
          </div>
          <div className="col-md-3">
            <p>
              <strong>▼</strong> - Down triangle (Down-pointing triangle)
            </p>
            <p>
              <strong>★</strong> - Star (Black star)
            </p>
            <p>
              <strong>☆</strong> - White star (White star)
            </p>
            <p>
              <strong>✓</strong> - Checkmark (Check mark)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeparatorExamples;
