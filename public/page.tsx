import { getProductBySlug } from '@/wix-api/products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params: { slug } }: PageProps) {
  const product = await getProductBySlug(slug)

  if (!product?._id) notFound()

  return <main></main>
}
