# Markus Wilson - Product Card Component

A modern, animated product card component built with Next.js and Tailwind CSS, featuring hover effects, favorite functionality, and responsive design.

## Table of Contents

- [Props List + Types](#props-list--types)
- [Usage Instructions](#usage-instructions)
- [Integration Notes](#integration-notes)

## Props List + Types

### ProductCard Component

The `ProductCard` component accepts the following props:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `image` | `string` | ✅ Yes | - | Path to the product image (should be in `/public` directory for Next.js Image optimization) |
| `title` | `string` | ✅ Yes | - | Product title/name displayed on the card |
| `description` | `string` | ✅ Yes | - | Product description text (truncated to 2 lines with `line-clamp-2`) |
| `price` | `number` | ✅ Yes | - | Product price (displayed with currency formatting) |
| `rating` | `number` | ❌ No | `undefined` | Product rating (0-5 scale, displays star rating if provided) |
| `onFavorite` | `function` | ✅ Yes | - | Callback function triggered when favorite button is clicked. Receives no parameters. |
| `isFavorite` | `boolean` | ❌ No | `false` | Controls the favorite state (filled/unfilled heart icon) |

### TypeScript Type Definition

If using TypeScript, you can define the component props as:

```typescript
interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  onFavorite: () => void;
  isFavorite?: boolean;
}
```

## Usage Instructions

### Basic Example

```jsx
import ProductCard from './components/ProductCard';

function ProductPage() {
  const handleFavorite = (productId) => {
    // Handle favorite logic
    console.log('Favorite toggled for product:', productId);
  };

  return (
    <ProductCard
      image="/image/shoes.jpg"
      title="Men Sport Shoes"
      description="This is the best shoe you can buy at this price point."
      price={1989}
      rating={4.5}
      isFavorite={false}
      onFavorite={() => handleFavorite(1)}
    />
  );
}
```

### With State Management

```jsx
'use client';

import { useState } from 'react';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const products = [
    {
      id: 1,
      image: '/image/shoes.jpg',
      title: 'Men Sport Shoes',
      description: 'This is the best shoe you can buy at this price point.',
      price: 1989,
      rating: 4.5,
    },
    // ... more products
  ];

  return (
    <div className="flex flex-wrap gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.rating}
          isFavorite={favorites[product.id] || false}
          onFavorite={() => handleFavorite(product.id)}
        />
      ))}
    </div>
  );
}
```

### Without Rating

The rating prop is optional. If not provided, the rating section will not be displayed:

```jsx
<ProductCard
  image="/image/product.jpg"
  title="Product Name"
  description="Product description"
  price={99.99}
  onFavorite={() => console.log('Favorite clicked')}
  isFavorite={false}
/>
```

## Integration Notes

### Prerequisites

- **Next.js** 16.0.3 or higher
- **React** 19.2.0 or higher
- **Tailwind CSS** v4 or higher
- **Next.js Image Optimization**: The component uses `next/image` for optimized image loading

### Setup Steps

1. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Font Configuration**

   The component uses custom fonts (Antonio and Albert Sans) configured in `app/layout.js`. Ensure your layout includes:

   ```jsx
   import { Albert_Sans, Antonio } from "next/font/google";
   
   const antonio = Antonio({
     variable: "--font-antonio",
     subsets: ["latin"],
   });
   
   const albertSans = Albert_Sans({
     variable: "--font-albert-sans",
     subsets: ["latin"],
   });
   ```

3. **Image Assets**

   Place product images in the `public` directory. Reference them with paths starting with `/`:
   - ✅ `/image/shoes.jpg`
   - ❌ `./image/shoes.jpg` (relative paths won't work with Next.js Image)

4. **Client Component**

   The `ProductCard` component is a client component (`'use client'`), so it must be used within client components or pages. If using in a server component, wrap it in a client component.

### Styling Considerations

- **Card Dimensions**: Fixed width of `350px` (w-[350px])
- **Responsive Design**: Use flexbox/grid wrappers for responsive layouts
- **Hover Effects**: Card scales to 105% on hover with smooth transitions
- **Image Aspect Ratio**: Images maintain a 1:1.1 aspect ratio
- **Custom Classes**: The component uses Tailwind utility classes. Ensure your Tailwind config includes all necessary utilities.

### Customization

To customize the component:

1. **Colors**: Modify Tailwind color classes in the component:
   - Favorite heart: `#ef4444` (red-500)
   - Rating stars: `#E3A458` (custom gold)
   - Background: White with backdrop blur

2. **Sizing**: Adjust the `w-[350px]` class to change card width

3. **Border Radius**: Modify `rounded-[40px]` and `rounded-[32px]` classes for different corner radii

### Performance Notes

- **Image Optimization**: Uses Next.js `Image` component with automatic optimization
- **State Management**: Favorite state should be managed at the parent level for persistence
- **Re-renders**: Component uses local state for hover effects to minimize re-renders

### Browser Compatibility

- Modern browsers with CSS Grid and Flexbox support
- Requires JavaScript enabled (client component)
- CSS backdrop-filter support for glassmorphism effect

### Common Issues

1. **Images not loading**: Ensure images are in the `public` directory and paths start with `/`
2. **Fonts not applying**: Verify font imports in `layout.js` and CSS variable usage
3. **Hover effects not working**: Ensure the component is used in a client component context
