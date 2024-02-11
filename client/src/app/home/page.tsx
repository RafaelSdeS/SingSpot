import AudioUploader from '@/components/AudioUploader'
import Recorder from '@/components/Recorder'

export default function Home() {
  return (
    <main className="h-[90vh]">
      <div className="flex flex-row justify-around w-full">
        <AudioUploader />
        <Recorder />
      </div>
    </main>
  )
}
