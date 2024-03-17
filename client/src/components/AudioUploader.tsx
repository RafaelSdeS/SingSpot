'use client'

import React, { ChangeEvent, useState, useEffect } from 'react'
import { useButtonClickContext } from '@/contexts/buttonClickContext'
import { Button } from './ui/button'
import { Inbox } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useAuth } from '@/contexts/authContext'

interface AudioPlayerProps {}

const AudioUploader: React.FC<AudioPlayerProps> = () => {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const { handlePlayAudio, audioFileRef } = useButtonClickContext()

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.round(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const handleStop = () => {
    if (audioFileRef.current) {
      audioFileRef.current!.pause()
    }
  }

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioFileRef.current) {
      audioFileRef.current.currentTime = parseFloat(event.target.value)
    }
  }

  useEffect(() => {
    if (audioFileRef.current) {
      audioFileRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioFileRef.current!.duration)
      })

      audioFileRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioFileRef.current!.currentTime)
      })
    }

    return () => {
      if (audioFileRef.current) {
        audioFileRef.current.removeEventListener('loadedmetadata', () => {})
        audioFileRef.current.removeEventListener('timeupdate', () => {})
      }
    }
  }, [audioFileRef])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/webm': ['.webm'],
      'audio/flac': ['.flac'],
      'audio/x-m4a': ['.m4a'],
      'audio/ogg': ['.ogg'],
      'audio/aac': ['.aac'],
      'audio/3gpp': ['.3gp'],
      'audio/3gpp2': ['.3g2'],
    },
    maxFiles: 1,
    onDrop: async acceptedFiles => {
      console.log(acceptedFiles[0].name)
      const file = acceptedFiles[0]
      if (file && audioFileRef.current) {
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (typeof e.target?.result === 'string') {
            audioFileRef.current!.src = e.target.result
          }
        }
        reader.readAsDataURL(file)
      }
    },
  })

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })}
      >
        <input {...getInputProps()} />
        <Inbox className="w-10 h-10 text-blue-500" />
        <p className="mt-2 text-sm text-slate-400">Drop music here</p>
      </div>
      <Button
        onClick={handlePlayAudio}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Play
      </Button>
      <Button
        onClick={handleStop}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Stop
      </Button>
      <audio ref={audioFileRef} className="hidden"></audio>
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
