import Image from "next/image";
import Link from "next/link";
import React from "react";

type DisplayCardProps = {
  title: string;
  imageSrc?: string; // Make imageSrc optional
  price: string;
  description: string;
  link?: string;
  manufacturer: string;
  stock: number;
};

export default function DisplayCard({ 
  title, 
  imageSrc, 
  price, 
  description, 
  manufacturer, 
  stock 
}: DisplayCardProps) {
  const defaultImageUrl = "/smithTea.png";

  return (
    <div className="display-card">
      <div className="image-container" style={{ width: 200, height: 200, position: 'relative' }}>
        <Image 
          src={imageSrc || defaultImageUrl} 
          alt={title} 
          fill
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            // Fallback to default image if external image fails
            (e.target as HTMLImageElement).src = defaultImageUrl;
          }}
        />
      </div>
      <h3 className="product-title">{title}</h3>
      <p className="product-description">Description: {description}</p>
      <p className="product-manufacturer">{manufacturer}</p>
      <p className="product-price">Price: {price}</p>
      <p className="product-stock">Stock: {stock}</p>
      <button className="product-button">Add to cart</button>
    </div>
  );
}