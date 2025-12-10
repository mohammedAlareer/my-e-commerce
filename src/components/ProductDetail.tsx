"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({product} : Props) => {
  const { items, addItem, removeItem,hasHydrated } = useCartStore();
    const [animate, setAnimate] = useState(false);


  if (!hasHydrated) return null;

  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

    const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };


  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
        triggerAnimation();

  };
    const onRemovetem = () => {
      removeItem(product.id);
      triggerAnimation();

    }

  return (
    <div className="container px-4 py-8 flex flex-col  md:flex-row gap-22 items-center md:justify-center">
      {product.images && product.images[0] && (
        <div className="relative h-[400] w-full md:max-w-lg md:h-[500]  rounded-lg overflow-hidden hover:shadow-[0px_0px_10px_5px_rgb(166,249,230)]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/4">
        <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
        {product.description && (
          <p className="text-gray-400 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-white mb-6">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="flex items-center space-x-4">
          <Button className="text-black bg-white border-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
          variant="outline" onClick={() => onRemovetem()}>
            –
          </Button>
          <span className={`
              text-lg font-semibold text-white inline-block
              transition-all duration-500
              ${animate ? "-translate-y-1.5  animate-bounce scale-110 bg-blue-900 px-1 rounded" : "translate-y-0"}
            `}
            >{quantity}</span>
          <Button className="text-black bg-white border-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out " onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};