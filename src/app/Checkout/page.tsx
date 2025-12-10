"use client"


import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { useCartStore } from '../../../store/cart-store'
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { checkoutAction } from './checkout-action';

export default function page() {

  const {items,removeItem,addItem} = useCartStore();
  const total = items.reduce((acc,item) => acc + (item.quantity * item.price),0)

  if(items.length === 0){
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-3xl font-bold mt-10  text-white'>the cart is Empty</h1>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
    <div className='container mx-auto px-4 py-8'>
      <h1 className=' text-3xl font-bold mb-8 text-center'><span className='text-indigo-600 bg-white px-4 py-1 rounded-lg shadow-lg shadow-indigo-400'>checkout</span></h1>
      <Card className='bg-white/95 max-w-md mx-auto mb-8'>
        <CardHeader>
          <CardTitle className='fontbold text-2xl tracking-tight'>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 -mt-4'>
            {items.map((item,key) => (
              <li key={key} className='flex flex-col gap-2 border-b px-4 py-2'>
                <div className=''>
                  <span className='font-bold'>{item.name}:</span>
                  <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant='outline' 
                  size='sm'
                  onClick={() => removeItem(item.id)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                  variant='outline'
                  size='sm'
                  onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ) )
            }
          </ul>
          <div className='mt-4 pt-2 text-lg font-semibold '>
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
        
        <form action={checkoutAction} className='max-w-md mx-auto'>
            <input type="hidden" name='items' value={JSON.stringify(items)}/>
            <Button type='submit' variant='outline' className='w-full bg-black text-white'>
              Proceed to Payment
            </Button>
        </form>

    </div>
    </MaxWidthWrapper>
  )
}


<div>
  
</div>
