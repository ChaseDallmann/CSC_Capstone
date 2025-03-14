import Image from "next/image";
import Link from "next/link";
import React from "react";

type DisplayCardProps = {
  title: string;
  imageSrc: string;
  price: string;
  description: string;
  link: string;
  manufacturer: string;
};

export default function DisplayCard({ title, imageSrc, price, description, manufacturer }: DisplayCardProps) {
  return (
    <div className="display-card">
    {imageSrc ? (
            <Image src={imageSrc} alt={title} width={200} height={200} className="product-image" />
          ) : (
            <p>No image available</p>
          )}
      <h3 className="product-title">{title}</h3>
      <p className="product-description">Description: {description}</p>
      <p className="product-manufacturer">{manufacturer}</p>
      <p className="product-price">Price: {price}</p>
    </div>
  );
}
