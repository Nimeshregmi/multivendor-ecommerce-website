'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X, Edit2 } from 'lucide-react'

interface UserProfileProps {
  user: {
    name: string
    email: string
    avatar: string
    dpName: string
  }
  onUpdate: (field: string, value: string) => void
}

export function UserProfile({ user, onUpdate }: UserProfileProps) {
  const [editingField, setEditingField] = useState<'name' | 'email' | null>(null)
  const [tempValue, setTempValue] = useState('')

  const handleEdit = (field: 'name' | 'email') => {
    setEditingField(field)
    setTempValue(user[field])
  }

  const handleSave = () => {
    if (editingField) {
      onUpdate(editingField, tempValue)
      setEditingField(null)
    }
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="mt-4 flex-1 space-y-4 text-center md:mt-0 md:text-left">
            <div>
              <div className="text-sm font-medium text-gray-500">Bank Name</div>
              <div className="text-lg font-semibold">{user.dpName}</div>
            </div>
            <div>
              {editingField === 'name' ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button size="icon" onClick={handleSave}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="group relative inline-flex items-center">
                  <span className="text-2xl font-bold">{user.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 opacity-0 group-hover:opacity-100"
                    onClick={() => handleEdit('name')}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              {editingField === 'email' ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="email"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button size="icon" onClick={handleSave}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="group relative inline-flex items-center">
                  <span className="text-gray-600">{user.email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 opacity-0 group-hover:opacity-100"
                    onClick={() => handleEdit('email')}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

