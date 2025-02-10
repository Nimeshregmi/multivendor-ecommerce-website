import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    price: 2499,
    rating: 4.8,
    reviews: 2866,
    image: "/logo/logo.png",
    category: "Computers",
  },
  {
    id: 2,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    price: 2499,
    rating: 4.8,
    reviews: 2866,
    image: "/logo/logo.png",
    category: "Computers",
  },
  {
    id: 3,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    price: 2499,
    rating: 4.8,
    reviews: 2866,
    image: "/logo/logo.png",
    category: "Computers",
  },
  {
    id: 4,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    price: 2499,
    rating: 4.8,
    reviews: 2866,
    image: "/logo/logo.png",
    category: "Computers",
  },
  // Add more products here
]

interface ProductGridProps {
  filters: {
    category: string[]
    priceRange: number[]
    rating: number | null
  }
  sort: string
  search: string
}

export default function ProductGrid({ filters, sort, search }: ProductGridProps) {
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false
      }
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }
      // Search filter
      if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
          <div className="relative aspect-square">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} height={999999999} width={99999999} className="object-cover" />
          </div>
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"
                    }`}
                  />
                ))}
              <span className="text-sm text-slate-400">
                {product.rating} ({product.reviews})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">${product.price}</span>
              <Button variant="outline" size="sm">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

