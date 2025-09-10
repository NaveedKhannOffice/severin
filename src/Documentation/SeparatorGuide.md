# Breadcrumb Separator Usage Guide

## Overview

The `separator` prop allows you to customize the character used between breadcrumb items. This gives you full control over the visual appearance of your breadcrumb navigation.

## Basic Usage

### Default Separator (›)

```jsx
<Breadcrumbs
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
/>
// Result: 🛍️ Home › Shop › Products
```

### Custom Separator

```jsx
<Breadcrumbs
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products"]]}
  icon="🛍️"
  separator="→"
/>
// Result: 🛍️ Home → Shop → Products
```

## Available Separators

### Common Separators

| Separator        | Character | Usage               | Example                |
| ---------------- | --------- | ------------------- | ---------------------- | ------------------------ |
| **Default**      | `›`       | Standard breadcrumb | Home › Shop › Products |
| **Arrow**        | `→`       | Modern look         | Home → Shop → Products |
| **Slash**        | `/`       | URL-style           | Home / Shop / Products |
| **Pipe**         | `         | `                   | Clean separation       | Home \| Shop \| Products |
| **Bullet**       | `•`       | Dot separation      | Home • Shop • Products |
| **Double Arrow** | `»`       | Traditional         | Home » Shop » Products |

### Special Characters

| Separator     | Character | Usage         | Example                |
| ------------- | --------- | ------------- | ---------------------- |
| **Diamond**   | `◆`       | Decorative    | Home ◆ Shop ◆ Products |
| **Triangle**  | `▶`       | Directional   | Home ▶ Shop ▶ Products |
| **Circle**    | `●`       | Bold dots     | Home ● Shop ● Products |
| **Square**    | `■`       | Solid blocks  | Home ■ Shop ■ Products |
| **Star**      | `★`       | Premium look  | Home ★ Shop ★ Products |
| **Checkmark** | `✓`       | Success theme | Home ✓ Shop ✓ Products |

## Real-world Examples

### E-commerce Site

```jsx
// Shop page with arrow separator
<Breadcrumbs
  paths={[["Home", "/"], ["Shop"]]}
  icon="🛍️"
  separator="→"
/>
// Result: 🛍️ Home → Shop

// Product detail with double arrow
<Breadcrumbs
  paths={[["Home", "/"], ["Shop", "/shop"], ["Products", "/shop/products"], ["Product Detail"]]}
  icon="📦"
  separator="»"
/>
// Result: 📦 Home » Shop » Products » Product Detail

// Cart with bullet separator
<Breadcrumbs
  paths={[["Home", "/"], ["Shop", "/shop"], ["Cart"]]}
  icon="🛒"
  separator="•"
/>
// Result: 🛒 Home • Shop • Cart
```

### Admin Panel

```jsx
// Admin dashboard with pipe separator
<Breadcrumbs
  paths={[["Home", "/"], ["Admin", "/admin"], ["Dashboard"]]}
  icon="👨‍💼"
  separator="|"
/>
// Result: 👨‍💼 Home | Admin | Dashboard

// User management with slash separator
<Breadcrumbs
  paths={[["Home", "/"], ["Admin", "/admin"], ["Users"]]}
  icon="👥"
  separator="/"
/>
// Result: 👥 Home / Admin / Users
```

### Blog Site

```jsx
// Article page with diamond separator
<Breadcrumbs
  paths={[
    ["Home", "/"],
    ["Blog", "/blog"],
    ["Technology", "/blog/technology"],
    ["React Tips"],
  ]}
  icon="📝"
  separator="◆"
/>
// Result: 📝 Home ◆ Blog ◆ Technology ◆ React Tips
```

## Styling Customization

### CSS Classes

```css
.breadcrumb-separator {
  color: #adb5bd;
  margin: 0 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.breadcrumb-separator span {
  color: #adb5bd;
}
```

### Custom Styling

```css
/* Custom separator styling */
.breadcrumb-separator span {
  color: #007bff;
  font-weight: 900;
  font-size: 18px;
}

/* Hover effect on separators */
.breadcrumb-separator:hover span {
  color: #0056b3;
  transform: scale(1.2);
  transition: all 0.2s ease;
}
```

## Best Practices

### 1. Consistency

```jsx
// Use same separator across similar sections
// Shop pages
<Breadcrumbs separator="→" />
<Breadcrumbs separator="→" />
<Breadcrumbs separator="→" />

// Admin pages
<Breadcrumbs separator="|" />
<Breadcrumbs separator="|" />
<Breadcrumbs separator="|" />
```

### 2. Context-Appropriate

```jsx
// E-commerce: Use arrows for navigation flow
<Breadcrumbs separator="→" />

// Admin: Use pipes for clean separation
<Breadcrumbs separator="|" />

// Blog: Use decorative separators
<Breadcrumbs separator="◆" />
```

### 3. Accessibility

```jsx
// Use clear, recognizable separators
<Breadcrumbs separator="›" /> // Good
<Breadcrumbs separator="→" /> // Good
<Breadcrumbs separator="•" /> // Good

// Avoid confusing separators
<Breadcrumbs separator="?" /> // Bad
<Breadcrumbs separator="@" /> // Bad
```

## Mobile Considerations

### Responsive Separators

```css
@media (max-width: 768px) {
  .breadcrumb-separator {
    margin: 0 4px;
    font-size: 14px;
  }
}
```

### Touch-Friendly

```jsx
// Use larger separators on mobile
<Breadcrumbs
  separator="▶" // Larger, easier to see
  className="mobile-friendly"
/>
```

## Performance Tips

### 1. Static Separators

```jsx
// Define separator as constant
const SHOP_SEPARATOR = "→";
const ADMIN_SEPARATOR = "|";

<Breadcrumbs separator={SHOP_SEPARATOR} />;
```

### 2. Conditional Separators

```jsx
const getSeparator = (section) => {
  const separators = {
    shop: "→",
    admin: "|",
    blog: "◆",
  };
  return separators[section] || "›";
};

<Breadcrumbs separator={getSeparator("shop")} />;
```

## Troubleshooting

### Common Issues

1. **Separator not showing**

   - Check if separator prop is passed
   - Verify CSS classes are applied

2. **Separator styling issues**

   - Check CSS specificity
   - Verify margin/padding values

3. **Mobile display problems**
   - Test responsive breakpoints
   - Check font-size scaling

### Debug Mode

```jsx
// Log separator value
console.log("Separator:", separator);

<Breadcrumbs separator={separator} paths={paths} />;
```

## Summary

The `separator` prop gives you complete control over breadcrumb appearance:

- **Default**: `›` (Single right-pointing angle)
- **Custom**: Any Unicode character
- **Styling**: Full CSS control
- **Responsive**: Mobile-optimized
- **Accessible**: Screen reader friendly

Choose separators that match your design system and provide clear visual hierarchy! 🎯
