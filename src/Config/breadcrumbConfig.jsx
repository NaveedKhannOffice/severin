// Breadcrumb Configuration
export const breadcrumbConfig = {
  // Default breadcrumb paths for different routes
  routes: {
    "/": [],
    "/shop": [["Home", "/"], ["Shop"]],
    "/shop/products": [["Home", "/"], ["Shop", "/shop"], ["Products"]],
    "/shop/cart": [["Home", "/"], ["Shop", "/shop"], ["Cart"]],
    "/profile": [["Home", "/"], ["Profile"]],
    "/profile/settings": [["Home", "/"], ["Profile", "/profile"], ["Settings"]],
    "/auth/login": [["Home", "/"], ["Login"]],
    "/auth/signup": [["Home", "/"], ["Sign Up"]],
    "/admin": [["Home", "/"], ["Admin"]],
    "/admin/dashboard": [["Home", "/"], ["Admin", "/admin"], ["Dashboard"]],
    "/admin/users": [["Home", "/"], ["Admin", "/admin"], ["Users"]],
    "/admin/products": [["Home", "/"], ["Admin", "/admin"], ["Products"]],
  },

  // Custom labels for specific route segments
  labels: {
    admin: "Admin Panel",
    auth: "Authentication",
    profile: "User Profile",
    settings: "Settings",
    dashboard: "Dashboard",
    users: "User Management",
    products: "Product Management",
    orders: "Order Management",
    reports: "Reports",
    analytics: "Analytics",
  },

  // Icons for different sections
  icons: {
    admin: "👨‍💼",
    shop: "🛍️",
    profile: "👤",
    auth: "🔐",
    dashboard: "📊",
    settings: "⚙️",
    products: "📦",
    users: "👥",
    orders: "📋",
    reports: "📈",
    analytics: "📊",
  },
};

// Helper function to get breadcrumb config for a route
export const getBreadcrumbConfig = (pathname) => {
  // Check for exact match first
  if (breadcrumbConfig.routes[pathname]) {
    return breadcrumbConfig.routes[pathname];
  }

  // Check for partial matches (for dynamic routes)
  const pathSegments = pathname.split("/").filter(Boolean);

  // Try to find a matching pattern
  for (const [route, paths] of Object.entries(breadcrumbConfig.routes)) {
    const routeSegments = route.split("/").filter(Boolean);

    if (routeSegments.length === pathSegments.length) {
      let matches = true;
      for (let i = 0; i < routeSegments.length; i++) {
        if (
          routeSegments[i] !== pathSegments[i] &&
          !routeSegments[i].startsWith(":")
        ) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return paths;
      }
    }
  }

  return null;
};

// Helper function to get icon for a section
export const getBreadcrumbIcon = (section) => {
  return breadcrumbConfig.icons[section] || null;
};

// Helper function to get custom label
export const getBreadcrumbLabel = (segment) => {
  return (
    breadcrumbConfig.labels[segment] ||
    segment.charAt(0).toUpperCase() + segment.slice(1)
  );
};
