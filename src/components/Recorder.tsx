'use client'

import { useButtonClickContext } from '@/contexts/buttonClickContext'
import { useState, useRef } from 'react'
import { Button } from './ui/button'

const Recorder = () => {
  const [permission, setPermission] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const recordingRef = useRef<HTMLAudioElement | null>(null)

  const { handlePlayAudio, startRecording, stopRecording, audio, mrRef } =
    useButtonClickContext()

  const getMicrophonePermission = async () => {
    console.log(mrRef)
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
        setPermission(true)
        setStream(streamData)
      } catch (err) {
        alert('err.message')
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }

  const startRecordingAndMusic = () => {
    startRecording()
    handlePlayAudio()
  }

  // Related to hearing the recording

  const handlePlay = () => {
    console.log(recordingRef)
    if (recordingRef.current) {
      recordingRef.current.play()
    }
    console.log(mrRef)
  }

  const handleEnd = () => {
    console.log('Passage +', recordingRef.current ? 'OK' : 'à vide')
    if (recordingRef.current) {
      recordingRef.current.currentTime = 0.0
    }
    console.log('Passage +', recordingRef.current ? 'OK' : 'à vide')
  }

  return (
    <div>
      <main className="flex flex-col gap-4">
        <div className="flex gap-2 justify-around">
          <Button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={getMicrophonePermission}
          >
            Get Microphone
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={startRecording}
          >
            Start Recording
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={stopRecording}
          >
            Stop Recording
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startRecordingAndMusic}
          >
            Start Recording and Song
          </Button>
        </div>
        <audio
          src={audio}
          ref={recordingRef}
          id="audio-player"
          onPlay={handlePlay}
          onEnded={handleEnd}
          onEmptied={event => {
            console.log('--onEmptied--')
          }}
          onCanPlayThrough={event => {
            console.log('--onCanPlayThrough--')
          }}
          controls
        />
      </main>
    </div>
  )
}

export default Recorder
