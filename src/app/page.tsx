import Image from "next/image";
import { stripe } from "@/lib/stripe";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Carousel from "@/components/Carousel";
import { Star } from "lucide-react";
export default async function Home() {

  const products = await stripe.products.list({
    expand:['data.default_price'],
    limit:6,
  })

  console.log(products)

  return (
    <MaxWidthWrapper>
    <div className="px-2">
      <section className="py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between rounded text-balance  bg-gray-200 p-10">
          <div className="flex flex-col space-y-4 mb-10">
            <h2 className="font-bold text-3xl md:text-4xl tracking-tight">Welcome to <span className="bg-blue-500 text-4xl px-2 py-1 rounded">My Ecommerce</span></h2>
            <p className="text-gray-600 font-light ml-1">Discover the latest products at the best prices.</p>
            <Link href='/products' className={cn(buttonVariants({variant:'ghost', size:'sm'}),"bg-black text-white rounded-full px-6 py-3 w-fit")}>Browse All Products <span className="w-3 h-6">💎</span></Link>
                  <div className="flex flex-col items-start md:flex-row gap-2 md:items-center mb-2">
                  <div className="flex gap-0.5">
                    <Star className="fill-green-600 text-green-600 size-4"/>
                    <Star className="fill-green-600 text-green-600 size-4"/>
                    <Star className="fill-green-600 text-green-600 size-4"/>
                    <Star className="fill-green-600 text-green-600 size-4"/>
                    <Star className="fill-green-600 text-green-600 size-4"/>
                  </div>
                  <p><span className="font-semibold">3.499</span> happy customers</p>
                  </div>
          </div>
          <Image alt="Banner Image" width={450} height={450} src='/landing photo.png' className="rounded shadow-[0_0_15px_5px_rgb(60,98,185)]  "/>
        </div>
      </section>
      <section>
        <Carousel products={products.data} />
      </section>
      
    </div>
    </MaxWidthWrapper>
      );
}
