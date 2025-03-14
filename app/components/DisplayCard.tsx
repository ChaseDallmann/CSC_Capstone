import Image from "next/image";
import Link from "next/link";
import React from "react";

type DisplayCardProps = {
  title: string;
  imageSrc: string;
  price: string;
  description: string;
  link: string;
};

export default function DisplayCard({ title, imageSrc, price, description }: DisplayCardProps) {
  return (
    <div className="display-card">
      <Image src={imageSrc} alt={title} width={200} height={200} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">{price}</p>
      <p className="product-description">{description}</p>
      {imageSrc ? (
        <Image src={imageSrc} alt={title} width={200} height={200} className="product-image" />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}
