import React from 'react'
import Stripe from 'stripe'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

interface Props {
  product:Stripe.Product
}
export default function ProductCard({product} : Props) {

  const price = product.default_price as Stripe.Price

  return (
    <Link href={`/products/${product.id}`}>
    <Card className='group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col pb-2 px-2 justify-center border-gray-300 gap-0'>
      {product?.images[0] && (
        <div className='relative h-58 w-full'>
          <Image 
          src={product.images[0]}
          fill
          alt={product.name}  
          className='object-cover group-hover:opacity-90 transition-opacity duration-300 ease-in-out'
          />
        </div>
      )}
      <CardHeader className='p-2'>
        <CardTitle className='text-xl font-bold text-gray-800 group-hover:scale-105 transition duration-200 ease-in-out'>
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col justify-between'>
        {product.description && (
          <p className='text-gray-600 text-sm mb-2'>{product.description}</p>
        )}
        {price?.unit_amount && (
          <p className='text-lg font-semibold text-gray-900 group-hover:text-red-500'>${(price.unit_amount /100).toFixed(2)}</p>
        )}

        <Button className="mt-4 bg-black text-white">View Detail</Button>
      </CardContent>
    </Card>
    </Link>
  )
}
