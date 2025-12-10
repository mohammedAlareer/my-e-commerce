import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductList from '@/components/ProductList'
import { stripe } from '@/lib/stripe'
import React from 'react'

export default async function ProductsPage() {

  const products = await stripe.products.list({
    expand:["data.default_price"]
  })


  return (
    
    <div>
<h1 className="flex justify-center items-center py-8 font-bold text-indigo-600 text-2xl">
  <span className="bg-white px-4 py-1 rounded-lg shadow-lg shadow-indigo-400 mb-4 ">All Products</span>
</h1>
<ProductList products={products.data}/>
    </div>
  )
}
