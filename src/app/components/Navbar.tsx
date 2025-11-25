import Link from 'next/link'
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <nav className='sticky top-0 inset-x-0 shadow-lg bg-white/75 backdrop-blur-xl'>
      <MaxWidthWrapper>
        <div className='container mx-auto flex justify-between items-center py-4 px-4'>
            <Link href='/'>My Ecommerce</Link>
        
        <div className='flex space-x-2'>
            <Link href='/' className={cn(buttonVariants({size:'sm' ,variant:'ghost'}))}>Home</Link>
            <Link href='/' className={cn(buttonVariants({size:'sm',variant:'ghost'}))}>products</Link>
            <Link href='/' className={cn(buttonVariants({size:'sm',variant:'ghost'}))}>Checkout</Link>
        </div>
        </div>
        </MaxWidthWrapper>
    </nav>
    
  )
}
