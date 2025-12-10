"use client"

import { useEffect } from "react";
import { useCartStore } from "../../../store/cart-store"
import Link from "next/link";

export default function SuccessPage() {
    const {clearCart} = useCartStore();

    useEffect(() => {
        clearCart()
    },[clearCart])

  return (
    <div className="container mx-auto  px-4 py-8 text-center text-white">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
      <p className="mt-3">Thank you for your purchase!</p>

        <Link href='/products' className="hover:underline text-blue-600">Continue Shopping</Link>
    </div>

)
}
