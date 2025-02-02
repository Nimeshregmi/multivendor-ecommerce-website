import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PersonalInfoProps {
  user: {
    gender: string
    dateOfBirth: string
    citizenshipNumber: string
    panNumber: string
  }
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label="Gender" value={user.gender} />
        <InfoRow label="Date of Birth" value={user.dateOfBirth} />
        <InfoRow label="Citizenship Number" value={user.citizenshipNumber} />
        <InfoRow label="PAN Number" value={user.panNumber} />
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

