'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import { useCartStore } from '../../store/cart-store'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items } = useCartStore()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/checkout', label: 'Checkout' },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className='sticky top-0 z-50 shadow-lg bg-indigo-950/90 text-white backdrop-blur-xl border-b border-white/10'>
      <MaxWidthWrapper>
        <div className='flex justify-between items-center py-4'>
          <Link href='/' className='text-3xl font-bold  hover:scale-110 transtion-all duration-300 ease-in-out]  '>
            My Ecommerce
          </Link>

          <div className='hidden md:flex space-x-6'>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }),'text-md')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-4'>
            <Link href='/checkout' className='relative hover:scale-115'>
              <ShoppingCartIcon className='w-6 h-6'  />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 w-5 h-5 rounded-full flex justify-center items-center bg-red-500 text-white text-xs'>
                  {cartCount}
                </span>
              )}
            </Link>

            <Button
              variant='ghost'
              className='md:hidden'
              onClick={() => setMobileOpen(prev => !prev)}
            >
              {mobileOpen ? (
                <XMarkIcon className='w-6 h-6' />
              ) : (
                <Bars3Icon className='w-6 h-6' />
              )}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-40 opacity-100 border-t border-gray-50 '  : 'max-h-0 opacity-0'
          )}
        >
          <ul className='flex flex-col space-y-1 py-1'>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='block px-2 py-1 text-gray-100 hover:bg-gray-600 rounded'
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
