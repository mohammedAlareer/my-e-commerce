"use client"

import { useEffect, useState } from "react"
import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import Image from "next/image"

interface Props{
    products:Stripe.Product[]
}

export default function Carousel({products} :Props) {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const interval =setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length)
        },3000)

        return () => clearInterval(interval)
    },[products.length])

    const currentProduct = products[current]

    const price = currentProduct.default_price as Stripe.Price

  return (
    <Card className="relative border-gray-300 shadow-md rounded-xl overflow-hidden mb-12">
        {currentProduct.images && currentProduct.images[0] && (
            <div className="relative w-full h-96">
                <Image src={currentProduct.images[0]} alt={currentProduct.name} fill
            className="object-cover "/>
            </div>
        )}
        <CardContent className="absolute inset-0 flex flex-col justify-center items-center">
            <CardTitle className="text-3xl font-bold text-indigo-500 mb-2 scale-150">
                {currentProduct.name}
            </CardTitle>
            {price?.unit_amount &&(
                <p className="text-2xl text-gray-300 ">${(price.unit_amount /100).toFixed(2)}</p>
            )}
        </CardContent>
    </Card>
    
  )
}
