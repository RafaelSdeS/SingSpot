'use client'

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'

interface ButtonContextValue {
  handlePlayAudio: () => void
  startRecording: () => void
  stopRecording: () => void
  audioFileRef: any
  audio: any
  mrRef: any
}

export const ButtonClickContext = createContext<ButtonContextValue>({
  handlePlayAudio: () => {},
  startRecording: () => {},
  stopRecording: () => {},
  audioFileRef: null,
  audio: '',
  mrRef: null
})

interface ButtonProviderProps {
  children: ReactNode
}

export const ButtonClickProvider: React.FC<ButtonProviderProps> = ({
  children,
}) => {
  const [recordComplete, setRcdComplete] = useState(false)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const mrRef = useRef<MediaRecorder | null>(null)
  const audioFileRef = useRef<HTMLAudioElement | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [audio, setAudio] = useState('')

  const dataType = 'video/webm'

  const handlePlayAudio = () => {
    console.log(audioFileRef)
    if (audioFileRef.current) {
      audioFileRef.current?.play()
    }
  }

  const startRecording = async () => {
    URL.revokeObjectURL(audio)
    mrRef.current = null
    audioChunksRef.current = []

    setRecordingStatus('recording')
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: dataType,
          audioBitsPerSecond: 16 * 44100,
        })
        mrRef.current = mediaRecorder

        let localAudioChunks = [] //[Blob];
        mediaRecorder.start()
        mediaRecorder.ondataavailable = event => {
          if (typeof event.data === 'undefined') return
          if (event.data.size === 0) return
          localAudioChunks.push(event.data)
          audioChunksRef.current.push(event.data)
        }
      })
    console.log('Start recording')
  }

  const stopRecording = () => {
    try {
      setRecordingStatus('inactive')
      if (!mrRef.current) {
        console.log('MediaRecorder not initialized')
        return
      }
      mrRef.current.stop()
      mrRef.current.onstop = async () => {
        console.log('Stop recording')
        const audioBlob = new Blob(audioChunksRef.current, {
          type: dataType,
        })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudio(audioUrl)
        setRcdComplete(true)
      }
    } catch (error) {
      console.error('Error stopping recording:', error)
    }
  }

  return (
    <ButtonClickContext.Provider
      value={{
        handlePlayAudio,
        startRecording,
        stopRecording,
        audioFileRef,
        audio,
        mrRef
      }}
    >
      {children}
    </ButtonClickContext.Provider>
  )
}

export const useButtonClickContext = () => {
  const context = useContext(ButtonClickContext)
  if (context === undefined) {
    throw new Error(
      'useButtonClickContext must be used within a ButtonClickProvider'
    )
  }
  return context
}
