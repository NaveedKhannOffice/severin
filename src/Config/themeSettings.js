import { images } from "../Assets";

export const THEME_SETTINGS_ROUTE = "/admin/theme-settings";

export const THEME_COLOR_SECTIONS = [
  {
    key: "brandPalette",
    title: "Brand Palette",
    description:
      "Primary brand colors that drive buttons, highlights, and immersive surfaces across the storefront.",
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
      {
        key: "paginationMutedBorderColor",
        label: "Pagination Muted Border",
        cssVariables: ["--pagiMutedBorderColor"],
        fallback: "#E8E8E8",
        helper: "Inactive pagination states and subtle dividers.",
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

export const COLOR_FIELDS = THEME_COLOR_SECTIONS.flatMap((section) => section.fields);
export const COLOR_FIELD_KEYS = COLOR_FIELDS.map((field) => field.key);
export const CSS_VARIABLE_BINDINGS = COLOR_FIELDS.reduce((acc, field) => {
  acc[field.key] = field.cssVariables || [];
  return acc;
}, {});

export const DEFAULT_TEXT_VALUES = {
  brandName: "Severin",
  brandTagline: "",
  brandDescription: "",
};

export const IMAGE_FIELD_KEYS = ["primaryLogo", "secondaryLogo", "favicon"];

export const DEFAULT_THEME_STATE = COLOR_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.key]: field.fallback }),
  {
    ...DEFAULT_TEXT_VALUES,
    primaryLogo: [images.Logo],
    secondaryLogo: [images.HeaderLogo || images.Logo],
    favicon: ["/favicon.ico"],
  }
);

export const API_TO_FORM_MAP = {
  primary_logo: "primaryLogo",
  secondary_logo: "secondaryLogo",
  favicon: "favicon",
  primary_brand_color: "primaryColor",
  secondary_brand_color: "secondaryColor",
  accent_color: "accentColor",
  link_color: "highlightColor",
  surface_color: "surfaceColor",
  app_background_color: "backgroundColor",
  muted_surface_color: "mutedSurfaceColor",
  default_border_color: "borderColor",
  pagination_border_color: "paginationBorderColor",
  pagination_muted_border_color: "paginationMutedBorderColor",
  heading_text_color: "headingColor",
  body_text_color: "bodyTextColor",
  base_text_color: "baseTextColor",
  muted_text_color: "mutedTextColor",
  input_background_color: "inputBackground",
  input_text_color: "inputTextColor",
  input_label_color: "inputLabelColor",
  input_border_color: "inputBorderColor",
  input_focus_color: "inputFocusBorderColor",
  navbar_toggle_color: "navbarTogglerBorderColor",
  primary_button_color: "buttonPrimaryColor",
  primary_button_hover_color: "buttonPrimaryHover",
  success_color: "successColor",
  success_deep_color: "successDeepColor",
  info_color: "infoColor",
  danger_color: "dangerColor",
};

export const FORM_TO_API_MAP = Object.entries(API_TO_FORM_MAP).reduce(
  (acc, [apiKey, formKey]) => {
    acc[formKey] = apiKey;
    return acc;
  },
  {}
);

export const isHexColor = (value = "") =>
  /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(
    value.trim()
  );

export const isRgbColor = (value = "") => /^rgba?\(/i.test(value.trim());

export const normalizeColorValue = (value = "") => {
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

export const isValidColorValue = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return (
    trimmed.toLowerCase() === "transparent" ||
    isHexColor(trimmed) ||
    isRgbColor(trimmed)
  );
};

export const getCssVariableDefaults = () => {
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

const extractImageCandidate = (candidate) => {
  if (candidate instanceof File) return candidate;
  if (typeof candidate === "string" && candidate.trim()) return candidate;
  if (candidate && typeof candidate === "object") {
    if (candidate.url) return candidate.url;
    if (candidate.path) return candidate.path;
    if (candidate.src) return candidate.src;
    if (candidate.value) return candidate.value;
  }
  return null;
};

export const normalizeImageList = (value) => {
  if (!value) return [];
  if (value instanceof File) return [value];
  if (Array.isArray(value)) {
    return value
      .map((item) => extractImageCandidate(item))
      .filter((item) => item !== null);
  }
  const candidate = extractImageCandidate(value);
  return candidate ? [candidate] : [];
};

export const mergeThemeState = (incoming = {}, options = {}) => {
  const { includeCssDefaults = true } = options;
  const baseState = { ...DEFAULT_THEME_STATE };
  if (includeCssDefaults) {
    Object.assign(baseState, getCssVariableDefaults());
  }

  const nextState = { ...baseState };

  IMAGE_FIELD_KEYS.forEach((key) => {
    const imagesList = normalizeImageList(incoming[key]);
    if (imagesList.length) {
      nextState[key] = imagesList;
    }
  });

  COLOR_FIELD_KEYS.forEach((key) => {
    const candidate = incoming[key];
    if (typeof candidate === "string") {
      const normalized = normalizeColorValue(candidate);
      if (isValidColorValue(normalized)) {
        nextState[key] = normalized;
      }
    }
  });

  if (incoming.brandName !== undefined) nextState.brandName = incoming.brandName;
  if (incoming.brandTagline !== undefined)
    nextState.brandTagline = incoming.brandTagline;
  if (incoming.brandDescription !== undefined)
    nextState.brandDescription = incoming.brandDescription;

  return nextState;
};

export const mapApiDataToForm = (payload = {}) => {
  const mapped = {};
  Object.entries(API_TO_FORM_MAP).forEach(([apiKey, formKey]) => {
    const raw = payload?.[apiKey];
    if (IMAGE_FIELD_KEYS.includes(formKey)) {
      const imagesList = normalizeImageList(raw);
      if (imagesList.length) {
        mapped[formKey] = imagesList;
      }
      return;
    }

    if (raw === null || raw === undefined) {
      return;
    }

    const value = String(raw).trim();
    if (!value) return;

    const normalized = normalizeColorValue(value);
    mapped[formKey] = normalized;
  });
  return mapped;
};

export const prepareThemePayload = (formState) => {
  const payload = {};
  Object.entries(FORM_TO_API_MAP).forEach(([formKey, apiKey]) => {
    const value = formState?.[formKey];
    if (IMAGE_FIELD_KEYS.includes(formKey)) {
      const imagesList = normalizeImageList(value);
      if (imagesList.length > 0) {
        payload[apiKey] = imagesList[0];
      }
      return;
    }

    const normalized = normalizeColorValue(value);
    payload[apiKey] = isValidColorValue(normalized)
      ? normalized
      : DEFAULT_THEME_STATE[formKey];
  });
  return payload;
};

export const applyThemeToRoot = (themeConfig) => {
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
};

