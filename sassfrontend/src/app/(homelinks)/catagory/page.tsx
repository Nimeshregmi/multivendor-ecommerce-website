"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import FilterDrawer from "@/components/pages/AllProducts/ProductFilter"
import SortDropdown from "@/components/pages/AllProducts/SortDropdown"
import ProductGrid from "@/components/pages/ProductsComponenet/ProductCard"
// import FilterDrawer from "./components/FilterDrawer"
// import ProductGrid from "./components/ProductGrid"
// import SortDropdown from "./components/SortDropdown"

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sort, setSort] = useState("featured")
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {/* <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <a href="/" className="hover:text-white">
            Home
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-white">
            Products
          </a>
          <span>/</span>
          <span className="text-white">Electronics</span>
        </div> */}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Electronics</h1>
          <div className="flex items-center gap-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 dark:bg-slate-900 dark:border-slate-800 bg-slate-300 border-slate-400">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[380px] p-0 bg-transparent border-none">
                <FilterDrawer onClose={() => setIsFilterOpen(false)} search={search} setSearch={setSearch} />
              </SheetContent>
            </Sheet>
            <SortDropdown value={sort} onValueChange={setSort} />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid filters={{ category: [], priceRange: [0, 5000], rating: null }} sort={sort} search={search} />
      </div>
    </div>
  )
}

