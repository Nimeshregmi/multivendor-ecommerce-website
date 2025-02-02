import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BidHistoryCardProps {
  bid: {
    id: string
    title: string
    description: string
    amountRaised: number
    goalAmount: number
    status: 'Successful' | 'Partially Funded' | 'Unsuccessful'
    completionDate: string
    imageUrl: string
  }
}

export function BidHistoryCard({ bid }: BidHistoryCardProps) {
  const statusColor = {
    Successful: 'bg-green-500',
    'Partially Funded': 'bg-yellow-500',
    Unsuccessful: 'bg-red-500',
  }[bid.status]

  const formattedDate = new Date(bid.completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="overflow-hidden">
      <img src={bid.imageUrl} alt={bid.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{bid.title}</CardTitle>
          <Badge className={statusColor}>{bid.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{bid.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Raised:</span>
            <span className="font-medium">${bid.amountRaised.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Goal:</span>
            <span className="font-medium">${bid.goalAmount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-gray-500">
        <span>Completed: {formattedDate}</span>
      </CardFooter>
    </Card>
  )
}

