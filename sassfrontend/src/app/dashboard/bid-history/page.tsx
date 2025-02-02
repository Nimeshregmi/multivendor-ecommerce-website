// import { BidHistory } from '@/components/bid-history'

import { BidHistory } from "@/components/Dashboard/bidhistory/bid-history";


export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        <h1 className="mb-8 text-3xl font-bold text-center">Campaign History</h1>
        <BidHistory />
      </main>
    </div>
  )
}

