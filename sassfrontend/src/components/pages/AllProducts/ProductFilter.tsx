"use client"

import { useState, type Dispatch, type SetStateAction } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface FilterDrawerProps {
  onClose: () => void
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export default function FilterDrawer({ onClose, search, setSearch }: FilterDrawerProps) {
  const [priceRange, setPriceRange] = useState({ from: "300", to: "3500" })
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedColors, setSelectedColors] = useState<string[]>(["Green", "Red"])
  const [condition, setCondition] = useState("all")
  const [rating, setRating] = useState<string>("0")

  return (
    <div className="h-full bg-slate-900  overflow-y-scroll  text-white p-6 space-y-6">
      <VisuallyHidden>
        <DialogTitle>Filters</DialogTitle>
      </VisuallyHidden>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">FILTERS</h2>
        <Button variant="ghost" className="absolute top-1 z-40 right-1" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label>Search</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      {/* Product Brand */}
      <div className="space-y-2">
        <Label>Product Brand</Label>
        <Select defaultValue="apple">
          <SelectTrigger className="w-full bg-slate-800 border-slate-700">
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="samsung">Samsung</SelectItem>
            <SelectItem value="dell">Dell</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Model */}
      <div className="space-y-2">
        <Label>Product Model</Label>
        <Select defaultValue="imac">
          <SelectTrigger className="w-full bg-slate-800 border-slate-700">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="imac">iMac 27"</SelectItem>
            <SelectItem value="macbook">MacBook Pro</SelectItem>
            <SelectItem value="mac-mini">Mac Mini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Manufacture Year */}
      <div className="space-y-2">
        <Label>Manufacture Year</Label>
        <div className="flex gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal bg-slate-800 border-slate-700
                  ${!startDate && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
          <span>to</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal bg-slate-800 border-slate-700
                  ${!endDate && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <div className="flex gap-4 items-center">
          <div className="space-y-2">
            <Label className="text-xs text-slate-400">From</Label>
            <Input
              type="number"
              value={priceRange.from}
              onChange={(e) => setPriceRange({ ...priceRange, from: e.target.value })}
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-slate-400">To</Label>
            <Input
              type="number"
              value={priceRange.to}
              onChange={(e) => setPriceRange({ ...priceRange, to: e.target.value })}
              className="bg-slate-800 border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-4">
        <Label>Rating</Label>
        <RadioGroup value={rating} onValueChange={(value) => setRating(value)}>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <RadioGroupItem value={stars.toString()} id={`rating-${stars}`} className="border-blue-500" />
                <Label htmlFor={`rating-${stars}`} className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < stars ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Delivery */}
      <div className="space-y-4">
        <Label>Delivery</Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { region: "USA", desc: "Delivery only for USA" },
            { region: "Europe", desc: "Delivery only for USA" },
            { region: "Asia", desc: "Delivery only for Asia" },
            { region: "Australia", desc: "Delivery only for Australia" },
          ].map((delivery) => (
            <div
              key={delivery.region}
              className="p-4 bg-slate-800 rounded-lg space-y-1 cursor-pointer hover:bg-slate-700"
            >
              <h3 className="font-medium">{delivery.region}</h3>
              <p className="text-sm text-slate-400">{delivery.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

