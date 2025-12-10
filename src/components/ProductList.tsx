"use client"

import Stripe from "stripe"
import { useState, useEffect ,useRef } from "react"
import ProductCard from "./ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Search ,X } from "lucide-react";

interface Props { 
  products:Stripe.Product[];
}


export default function ProductList({products} : Props) {
  const [searchInput ,setSearchInput] = useState<string>(""); 
  const [debouncedValue,setDebouncedValue] = useState(searchInput);
  const inputRef  =useRef<HTMLInputElement>(null)

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedValue(searchInput)
  },300)

  return () => clearTimeout(timer)
},[searchInput])





  const filteredProduct  =products.filter((product) => {
    const term =debouncedValue?.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term)
    const descriptionMatch =product.description ?  product.description.toLowerCase().includes(term) : false
  
    return nameMatch || descriptionMatch
  })

  const handleClearInput = () => {
    setSearchInput('');
    setDebouncedValue('');
    
    inputRef.current?.focus();
  }

  return (
    <MaxWidthWrapper>
    <div>
      <div className="flex justify-center">
        <div className='relative group w-full max-w-md '>
            <input 
            type='text'
            placeholder='Search character...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={inputRef}
            className='w-full mt-10 rounded px-12 py-3 border border-gray-300 focus:outline-none text-lg focus:ring-2 focus:ring-green-600 text-white/90'/>
            <Search className='absolute left-5 top-14 text-gray-400 w-5 h-5' />
            {searchInput ? <X className='absolute size-4 right-3 cursor-pointer top-15 text-white' onClick={handleClearInput}/> : ''}
        </div>
      </div>
      <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduct.map((product,key) => {
          return (
          <li key={key}>
            <ProductCard product={product}/>
          </li>)
        })}
      </ul>
    </div>
    </MaxWidthWrapper>
  )
}
