'use client'

import { useState, useRef, useEffect } from 'react'

const Recorder = () => {
  const [permission, setPermission] = useState(false)
  const [recordComplete, setRcdComplete] = useState(false)
  const [stream, setStream] = useState<MediaStream>()
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const mrRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [audio, setAudio] = useState('')

  const dataType = 'video/webm'

  const getMicrophonePermission = async () => {
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

  const startRecording = async () => {
    URL.revokeObjectURL(audio)
    mrRef.current = null
    audioChunksRef.current = []

    setRecordingStatus('recording')
    const mediaRecorder = new MediaRecorder(stream!, {
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
  }

  const stopRecording = () => {
    setRecordingStatus('inactive')
    if (!mrRef.current) return
    mrRef.current?.stop()
    mrRef.current.onstop = async () => {
      console.log('Here dataType = ', dataType)
      const audioBlob = new Blob(audioChunksRef.current, {
        type: dataType,
      })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudio(audioUrl)
      setRcdComplete(true)
    }
  }

  const handlePlay = () => {
    if (audioRef.current) {
      console.log('currentTime-handlePlay(1) =', audioRef.current.currentTime)
      audioRef.current.play()
      console.log('currentTime-handlePlay(2) =', audioRef.current.currentTime)
    }
  }

  const handleEnd = () => {
    console.log('Passage +', audioRef.current ? 'OK' : 'à vide')
    if (audioRef.current) {
      console.log('currentTime(1) =', audioRef.current.currentTime)
      audioRef.current.currentTime = 0.0
      console.log('currentTime(2) =', audioRef.current.currentTime)
    }
    console.log('Passage +', audioRef.current ? 'OK' : 'à vide')
  }

  return (
    <div>
      <main className="flex flex-col gap-4">
        <div className="flex gap-2 justify-around">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={getMicrophonePermission}
            type="button"
          >
            Get Microphone
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={startRecording}
            type="button"
          >
            Start Recording
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={stopRecording}
            type="button"
          >
            Stop Recording
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={stopRecording}
            type="button"
          >
            Start Recording and Song
          </button>
        </div>
        <audio
          src={audio}
          ref={audioRef}
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
