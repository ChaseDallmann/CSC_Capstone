import React from "react";
import DisplayCard from "./DisplayCard";

export default function Storefront() {
  const products = [
    {
      title: "Black Breakfast Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product1",
    },
    {
      title: "Oolong Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product2",
    },
    {
      title: "Calming Herbal Tea",
      imageSrc: "/smithTea.png",
      price: "$19.99",
      link: "/product3",
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