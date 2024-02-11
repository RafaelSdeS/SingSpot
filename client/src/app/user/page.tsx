import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function UserPage() {
  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div>
          <h2>Saved recordings</h2>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
        <div>
          <h2>Saved musics</h2>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
