# Breadcrumb System Documentation

## Overview

A comprehensive breadcrumb navigation system for React applications with automatic route generation, custom styling, and icon support.

## Features

- ✅ **Auto-generation** from current route
- ✅ **Custom paths** support
- ✅ **Icon support** for different sections
- ✅ **Mobile responsive** design
- ✅ **Dark mode** support
- ✅ **Accessibility** features
- ✅ **Configuration system** for easy management

## Basic Usage

### 1. Simple Breadcrumb

```jsx
import Breadcrumbs from "../../../Components/Common/Breadcrumbs";

<Breadcrumbs paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]} />;
```

### 2. Auto-generated Breadcrumb

```jsx
// Automatically generates breadcrumbs from current route
<Breadcrumbs />
```

### 3. With Icon

```jsx
<Breadcrumbs
  paths={[["Home", "/"], ["Admin", "/admin"], ["Dashboard"]]}
  icon="👨‍💼"
/>
```

## Advanced Usage

### Using the Hook

```jsx
import {
  useBreadcrumbs,
  useBreadcrumbIcon,
} from "../../../Hooks/useBreadcrumbs";

const MyComponent = () => {
  const breadcrumbPaths = useBreadcrumbs([
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Products"],
  ]);

  const breadcrumbIcon = useBreadcrumbIcon();

  return <Breadcrumbs paths={breadcrumbPaths} icon={breadcrumbIcon} />;
};
```

### Custom Configuration

```jsx
// In breadcrumbConfig.jsx
export const breadcrumbConfig = {
  routes: {
    "/shop/products": [["Home", "/"], ["Shop", "/shop"], ["Products"]],
  },
  icons: {
    shop: "🛍️",
    admin: "👨‍💼",
  },
};
```

## Props

| Prop        | Type           | Default          | Description                       |
| ----------- | -------------- | ---------------- | --------------------------------- |
| `paths`     | Array          | `null`           | Array of [label, link] pairs      |
| `className` | String         | `'mt-3 mt-lg-4'` | CSS classes                       |
| `showHome`  | Boolean        | `true`           | Show home link in auto-generation |
| `separator` | String         | `'›'`            | Separator character               |
| `icon`      | String/Element | `null`           | Icon to display                   |

## Styling

### CSS Classes

- `.breadcrumb-wrap` - Main container
- `.breadcrumb` - Breadcrumb list
- `.breadcrumb-item` - Individual breadcrumb item
- `.breadcrumb-item.active` - Current page item
- `.breadcrumb-icon` - Icon container

### Custom Styling

```css
.breadcrumb-wrap {
  background-color: #f8f9fa;
  padding: 12px 0;
}

.breadcrumb-item a:hover {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}
```

## Examples

### E-commerce Site

```jsx
// Product page
<Breadcrumbs
  paths={[
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Electronics", "/shop/electronics"],
    ["Smartphones", "/shop/electronics/smartphones"],
    ["iPhone 15"],
  ]}
  icon="🛍️"
/>
```

### Admin Panel

```jsx
// User management
<Breadcrumbs
  paths={[
    ["Home", "/"],
    ["Admin", "/admin"],
    ["Users", "/admin/users"],
    ["Edit User"],
  ]}
  icon="👨‍💼"
/>
```

### Blog Site

```jsx
// Article page
<Breadcrumbs
  paths={[
    ["Home", "/"],
    ["Blog", "/blog"],
    ["Technology", "/blog/technology"],
    ["React Tips"],
  ]}
  icon="📝"
/>
```

## Mobile Responsive

The breadcrumb system automatically adapts to mobile screens:

- Smaller font sizes
- Reduced padding
- Better touch targets
- Wrapping support

## Accessibility

- Proper ARIA labels
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Dark Mode

Automatic dark mode support with CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  .breadcrumb-wrap {
    background-color: #343a40;
  }
}
```

## Best Practices

1. **Keep it simple** - Don't make breadcrumbs too deep
2. **Use meaningful labels** - Clear, descriptive text
3. **Include icons** - Visual cues for different sections
4. **Test on mobile** - Ensure touch-friendly design
5. **Consistent styling** - Match your app's design system

## Troubleshooting

### Common Issues

1. **Breadcrumbs not showing**

   - Check if paths array is provided
   - Verify route configuration

2. **Styling issues**

   - Check CSS class conflicts
   - Verify container structure

3. **Mobile display problems**
   - Test responsive breakpoints
   - Check flex-wrap behavior

### Debug Mode

```jsx
// Enable debug logging
const breadcrumbPaths = useBreadcrumbs(debug: true);
console.log('Generated paths:', breadcrumbPaths);
```
