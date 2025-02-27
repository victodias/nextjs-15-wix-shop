import { getWixClient } from '@/lib/wix-client.base'

type ProductsSort = 'last_updated' | 'price_asc' | 'price_desc'

interface QueryProductsFilter {
  collectionIds?: string[] | string
  sort?: ProductsSort
}

/**
 * This TypeScript function queries products based on collection IDs and sorting criteria using the Wix
 * API.
 * @param {QueryProductsFilter}  - The `queryProducts` function is an asynchronous function that
 * queries products based on the provided filter parameters. The function takes in an object as a
 * parameter with the following properties:
 * @returns The function `queryProducts` is returning the result of querying products based on the
 * provided filter criteria such as collectionIds and sort order. The function uses the Wix client to
 * query products and applies filters based on the collectionIds and sort parameter. The final result
 * of the query is returned by calling `query.find()`.
 */
export async function queryProducts({
  collectionIds,
  sort = 'last_updated'
}: QueryProductsFilter) {
  const wixClient = getWixClient()

  let query = wixClient.products.queryProducts()

  const collectionIdsArray = collectionIds
    ? Array.isArray(collectionIds)
      ? collectionIds
      : [collectionIds]
    : []

  if (collectionIdsArray.length > 0) {
    query = query.hasSome('collectionIds', collectionIdsArray)
  }

  switch (sort) {
    case 'price_asc':
      query = query.ascending('price')
      break
    case 'price_desc':
      query = query.descending('price')
      break
    case 'last_updated':
      query = query.descending('lastUpdated')
      break
  }

  return query.find()
}

export async function getProductBySlug(slug: string) {
  const wixClient = getWixClient()

  const { items } = await wixClient.products
    .queryProducts()
    .eq('slug', slug)
    .limit(1)
    .find()

  const product = items[0]

  if (!product || !product.visible) {
    return null
  }

  return product
}
