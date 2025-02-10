import { Suspense } from 'react'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import banner from '@/assets/banner.jpg'
import { Button } from '@/components/ui/button'
import { delay } from '@/lib/utils'
import { getWixClient } from '@/lib/wix-client.base'
import Product from '@/components/Products'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart
          </h1>
          <p>
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Flow Commerce banner"
            className="h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  )
}

async function FeaturedProducts() {
  await delay(5000)

  const wixClient = getWixClient()

  const { collection } =
    await wixClient.collections.getCollectionBySlug('featured-products')

  if (!collection?._id) {
    return null
  }

  const featuredProducts = await wixClient.products
    .queryProducts()
    .hasSome('collectionIds', [collection._id])
    .descending('lastUpdated')
    .find()

  if (!featuredProducts.items.length) {
    return null
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <pre>{JSON.stringify(featuredProducts, null, 2)}</pre>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[28rem] w-full" />
      ))}
    </div>
  )
}
