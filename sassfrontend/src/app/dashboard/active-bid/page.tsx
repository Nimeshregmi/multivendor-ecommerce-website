
import { ActiveBids } from '@/components/Dashboard/activeBid/active-bids'

export default function page() {
  return (
    <div className="min-h-screen px-2">
      <main className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold text-center">Active Campaigns</h1>
        <ActiveBids />
      </main>
    </div>
  )
}

