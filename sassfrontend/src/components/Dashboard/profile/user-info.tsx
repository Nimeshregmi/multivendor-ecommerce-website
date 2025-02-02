'use client'

import { useState } from 'react'
import { Mail, MapPin, User, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface UserInfoProps {
  user: {
    name: string
    email: string
    role: string
    location: string
  }
  onUpdate: (field: 'name' | 'email', value: string) => void
}

export function UserInfo({ user, onUpdate }: UserInfoProps) {
  const [editingField, setEditingField] = useState<'name' | 'email' | null>(null)
  const [tempValue, setTempValue] = useState('')

  const handleEditClick = (field: 'name' | 'email') => {
    setEditingField(field)
    setTempValue(user[field])
  }

  const handleSaveClick = () => {
    if (editingField) {
      onUpdate(editingField, tempValue)
      setEditingField(null)
    }
  }

  const handleCancelClick = () => {
    setEditingField(null)
  }

  const renderEditableField = (field: 'name' | 'email', icon: React.ReactNode) => (
    <div className="flex items-center space-x-2">
      {icon}
      {editingField === field ? (
        <div className="flex items-center space-x-2">
          <Input
            type={field === 'email' ? 'email' : 'text'}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="max-w-xs"
          />
          <Button size="icon" onClick={handleSaveClick}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleCancelClick}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full space-x-2">
          <span>{user[field]}</span>
          <Button size="sm" variant="outline" onClick={() => handleEditClick(field)}>
            Edit
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {renderEditableField('name', <User className="h-5 w-5 text-gray-400" />)}
      {renderEditableField('email', <Mail className="h-5 w-5 text-gray-400" />)}
      <div className="flex items-center space-x-2">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>{user.role}</span>
      </div>
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-gray-400" />
        <span>{user.location}</span>
      </div>
    </div>
  )
}

