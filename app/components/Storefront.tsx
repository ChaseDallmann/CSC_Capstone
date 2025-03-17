import React from "react";
import DisplayCard from "./DisplayCard";

export default function Storefront() {
  const products = [
    {
      title: "Black Breakfast Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product1",
      description: "A rich and robust black tea.",
      manufacturer: "Smith Tea",
      stock: 10,
    },
    {
      title: "Oolong Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product2",
      description: "A fragrant and floral oolong tea.",
      manufacturer: "Smith Tea",
      stock: 5,
    },
    {
      title: "Calming Herbal Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product3",
      description: "A soothing herbal tea blend.",
      manufacturer: "Smith Tea",
      stock: 7,
    },
  ];

  return (
    <section className="storefront">
      <h2 className="storefront-title">Featured Teas</h2>
      <div className="storefront-grid">
        {products.map((product, index) => (
          <DisplayCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}