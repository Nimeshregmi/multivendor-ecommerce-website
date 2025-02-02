import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface BidCardProps {
  bid: {
    id: string
    title: string
    description: string
    currentAmount: number
    goalAmount: number
    daysLeft: number
    imageUrl: string
  }
}

export function BidCard({ bid }: BidCardProps) {
  const progress = (bid.currentAmount / bid.goalAmount) * 100

  return (
    <Card className="overflow-hidden">
      <img src={bid.imageUrl} alt={bid.title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle>{bid.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm  mb-4">{bid.description}</p>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm">
            <span>${bid.currentAmount.toLocaleString()} raised</span>
            <span>${bid.goalAmount.toLocaleString()} goal</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm font-medium">{bid.daysLeft} days left</span>
        <Button>Donate Now</Button>
      </CardFooter>
    </Card>
  )
}

