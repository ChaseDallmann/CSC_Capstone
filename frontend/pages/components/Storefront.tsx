import React from "react";
import DisplayCard from "./DisplayCard";

export default function Storefront() {
  const products = [
    {
      title: "Boba Tea",
      imageSrc: "https://insanelygoodrecipes.com/wp-content/uploads/2023/05/Refreshing-Boba-Milk-Tea-with-Pearls.jpg",
      price: "$10.99",
      description: "A delicious boba tea with chewy tapioca pearls.",
      manufacturer: "Full Leaf Tea",
      stock: 10,
      productID: 1,
    },
    {
      title: "Organic Oolong Tea",
      imageSrc: "https://n4.sdlcdn.com/imgs/h/2/3/Teafloor-Organic-Oolong-Tea-Loose-SDL775610821-2-2f99c.jpg",
      price: "$16.99",
      description: "A fragrant and floral oolong tea.",
      manufacturer: "Full Leaf Tea",
      stock: 10,
      productID: 5,
    },
    {
      title: "Vanilla Tea",
      imageSrc: "https://www.kroger.com/product/images/large/back/0007231000165",
      price: "$12.99",
      description: "A smooth and creamy vanilla tea.",
      manufacturer: "Harney & Sons",
      stock: 10,
      productID: 4,
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