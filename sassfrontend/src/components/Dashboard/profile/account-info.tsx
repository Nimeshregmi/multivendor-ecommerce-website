import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AccountInfoProps {
  user: {
    boid: string
    accountStatus: string
    boSubStatus: string
    confirmationWaived: string
    accountOpenDate: string
  }
}

export function AccountInfo({ user }: AccountInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label="User ID" value={user.boid} />
        <InfoRow label="Account Status" value={user.accountStatus} />
        <InfoRow label="Residential Type" value={user.boSubStatus} />
        <InfoRow label="Confirmation Waived" value={user.confirmationWaived} />
        <InfoRow label="Account Open Date" value={user.accountOpenDate} />
      </CardContent>
    </Card>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm font-medium ">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  )
}

