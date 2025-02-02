'use client'

import { useState } from 'react'
// import { BidHistoryCard } from '@/components/bid-history-card'
import { BidHistoryCard } from './bid-history-card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface HistoricalBid {
  id: string
  title: string
  description: string
  amountRaised: number
  goalAmount: number
  status: 'Successful' | 'Partially Funded' | 'Unsuccessful'
  completionDate: string
  imageUrl: string
}

const initialBids: HistoricalBid[] = [
  {
    id: '1',
    title: 'City Park Renovation',
    description: 'Renovated the central park with new playground equipment and landscaping.',
    amountRaised: 50000,
    goalAmount: 50000,
    status: 'Successful',
    completionDate: '2024-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    title: 'Community Center Expansion',
    description: 'Expanded the community center to accommodate more activities and events.',
    amountRaised: 75000,
    goalAmount: 100000,
    status: 'Partially Funded',
    completionDate: '2024-11-30',
    imageUrl: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Homeless Shelter Upgrade',
    description: 'Upgraded facilities and increased capacity of the local homeless shelter.',
    amountRaised: 30000,
    goalAmount: 40000,
    status: 'Successful',
    completionDate: '2024-10-20',
    imageUrl: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    title: 'River Cleanup Project',
    description: 'Organized a major cleanup effort for the city river and its banks.',
    amountRaised: 15000,
    goalAmount: 25000,
    status: 'Partially Funded',
    completionDate: '2024-09-05',
    imageUrl: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    title: 'Public Library Modernization',
    description: 'Updated technology and resources at the main public library.',
    amountRaised: 20000,
    goalAmount: 60000,
    status: 'Unsuccessful',
    completionDate: '2024-08-15',
    imageUrl: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export function BidHistory() {
  const [bids, setBids] = useState<HistoricalBid[]>(initialBids)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredBids = bids.filter(bid =>
    bid.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || bid.status === statusFilter)
  )

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Successful">Successful</SelectItem>
            <SelectItem value="Partially Funded">Partially Funded</SelectItem>
            <SelectItem value="Unsuccessful">Unsuccessful</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBids.map(bid => (
          <BidHistoryCard key={bid.id} bid={bid} />
        ))}
      </div>
    </div>
  )
}

