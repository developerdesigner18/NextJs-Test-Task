'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({
  image,
  title,
  description,
  price,
  rating,
  onFavorite,
  isFavorite = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[350px] transition-all bg-white rounded-[40px] p-2 duration-300 ease-in-out shadow-lg ${isHovered ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-[32px] overflow-hidden transition-all duration-300">
        {/* Image Section */}
        <div className="w-full h-full aspect-[1/1.1] rounded-[32px]">
          <div className="flex w-full h-full">
            <div className={`w-full ${isHovered ? 'h-[170%]' : 'h-full'} transition-all duration-300 relative overflow-hidden rounded-[32px]`}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-center w-full h-full transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Heart Icon - Simple outline, no background */}
          <button
            onClick={onFavorite}
            className="absolute top-4 rounded-[20px] right-4 py-2.5 px-3 flex items-center cursor-pointer justify-center z-10 border border-gray-200 bg-black/10"
            aria-label="Add to favorites"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#ef4444' : 'none'}
              stroke={isFavorite ? '#ef4444' : '#fff'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 rounded-[32px] bg-white/30 backdrop-blur-sm">
             {/* Rating - Only show if provided */}
          {rating && (
            <div className="flex items-center gap-2 pb-2">
                <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? '#E3A458' : '#e5e7eb'}
                  stroke={i < Math.floor(rating) ? '#E3A458' : '#e5e7eb'}
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
                </div>
              <span className={`text-sm text-gray-500 font-medium ${isHovered ? 'text-gray-900' : 'text-gray-500'} transition-all duration-300`}>({rating})</span>
            </div>
          )}
          {/* Title */}
          <h3 className="text-3xl antonio -tracking-wide font-bold text-gray-900 pb-1">
            {title}
          </h3>

          {/* Description */}
          <p className={`text-sm text-gray-500 leading-relaxed font-medium mb-2.5 line-clamp-2 ${isHovered ? 'text-gray-900' : 'text-gray-500'} transition-all duration-300`}>
            {description}
          </p>

          {/* Price and Buy Button */}
          <div className="flex items-center gap-2 pb-5">
            <span className="text-2xl font-bold text-gray-900">
              $ {price.toLocaleString()}
            </span>
            <span className="text-xl font-bold text-gray-500 line-through">
              $ {((price * 1.1).toLocaleString())}
            </span>
          </div>
            <button
              className={`py-3 bg-gray-900 cursor-pointer uppercase antonio text-center text-xl text-white w-full rounded-full font-medium transition-all duration-200 text-sm`}
            >
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
}
