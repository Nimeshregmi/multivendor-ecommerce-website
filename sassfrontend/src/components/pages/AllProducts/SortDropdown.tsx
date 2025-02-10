import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortDropdownProps {
  value: string
  onValueChange: (value: string) => void
}

export default function SortDropdown({ value, onValueChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] dark:bg-slate-900 dark:border-slate-800 bg-slate-300 border-slate-400">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-900 dark:border-slate-800 bg-slate-300 border-slate-400">
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
      </SelectContent>
    </Select>
  )
}

