import { products } from '@wix/stores'
import Link from 'next/link'
import { media as wixMedia } from '@wix/sdk'
import WixImage from './WixImage'

interface ProductProps {
  product: products.Product
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image

  return (
    <Link href={`/products/${product.slug}`} className="h-full border">
      <div className="relative overflow-hidden">
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          here
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || '' }}
        />
      </div>
    </Link>
  )
}
