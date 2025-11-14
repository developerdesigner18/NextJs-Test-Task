'use client';

import ProductCard from './components/ProductCard';
import { useState } from 'react';

export default function Home() {
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Example product data - replace with your actual data
  const products = [
    {
      id: 1,
      image: '/image/shoes.jpg',
      title: 'Men Sport Shoes',
      description: 'This is the best shoe you can buy at this price point. It stands not only for quality but also for style and comfort.',
      price: 1989,
      rating: 4.5,
    },
    {
      id: 2,
      image: '/image/shoes4.jpg',
      title: 'Running Sneakers Pro',
      description: 'Premium running shoes designed for maximum comfort and performance. Perfect for athletes and fitness enthusiasts.',
      price: 2499,
      rating: 4.8,
    },
    {
      id: 3,
      image: '/image/shoes5.jpg',
      title: 'Casual Walking Shoes',
      description: 'Stylish and comfortable everyday footwear. Ideal for long walks and daily activities with superior cushioning.',
      price: 1699,
      rating: 4.2,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Gradient Background - vertical gradient from pink to purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-200"></div>
      
      {/* Decorative Dots Pattern - scattered pattern */}
      <div className="absolute inset-0 opacity-15">
        {/* Create a grid of dots with some randomness in spacing */}
        {Array.from({ length: 15 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const offsetX = (row % 3) * 2;
            const offsetY = (col % 3) * 2;
            return (
              <div
                key={`${row}-${col}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-gray-300"
                style={{
                  left: `${(col * 5) + offsetX}%`,
                  top: `${(row * 6) + offsetY}%`,
                }}
              ></div>
            );
          })
        )}
      </div>

      {/* Product Cards Container */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-8">
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
    </div>
  );
}
