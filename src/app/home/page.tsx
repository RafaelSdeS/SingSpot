'use client'
import React, { useEffect } from 'react'
import AudioUploader from '@/components/AudioUploader'
import Recorder from '@/components/Recorder'
import { useAuth } from '@/contexts/authContext'
import { redirect } from 'next/navigation'

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="h-[90vh]">
      <div className="flex flex-row justify-around w-full">
        <AudioUploader />
        <Recorder />
      </div>
    </main>
  )
}
