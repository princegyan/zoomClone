'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { Dialog, DialogContent } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface UsernameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UsernameModal = ({ open, onOpenChange }: UsernameModalProps) => {
  const { user } = useUser()
  const [username, setUsername] = useState('')

  const saveUsername = async () => {
    if (!user || !username) return
    try {
      await user.update({ username })
      await user.reload()
      onOpenChange(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <h1 className="text-2xl font-bold">Choose a username</h1>
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button className="bg-blue-1" onClick={saveUsername}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default UsernameModal
