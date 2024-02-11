'use client'

import React, { useRef, ChangeEvent, useState, useEffect } from 'react'
import { Input } from './ui/input'

interface AudioPlayerProps {}

const AudioUploader: React.FC<AudioPlayerProps> = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && audioRef.current) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target?.result === 'string') {
          audioRef.current!.src = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.round(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current?.play()
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current!.pause()
    }
  }

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(event.target.value)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration)
      })

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current!.currentTime)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {})
        audioRef.current.removeEventListener('timeupdate', () => {})
      }
    }
  }, [])

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <Input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="h-[20vh] mb-4"
      />
      <button
        onClick={handlePlay}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Play
      </button>
      <button
        onClick={handleStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Stop
      </button>
      <audio ref={audioRef} className="hidden"></audio>
      <div className="flex justify-between items-center mb-4">
        <span className="text-white">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeekChange}
          className="w-full h-1"
        />
        <span className="text-white">{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default AudioUploader
