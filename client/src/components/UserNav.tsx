import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { DoorClosed, Home, Settings } from 'lucide-react'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'
import { redirect } from 'next/navigation'

export const navItems = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Settings', href: '/settings', icon: Settings },
]

type UserNavProps = {
  name: string
  email: string
  image: string
}

const UserNav = ({ name, email, image }: UserNavProps) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        redirect('/')
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y">
            <p className="text-xl font-medium leading-none">{name}</p>
            <p className="text-sm leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className="w-full flex justify-between items-center"
              >
                {item.name}

                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="w-full flex justify-between items-center"
          asChild
        >
          <Button onClick={handleSignOut}>
            Logout{' '}
            <span>
              <DoorClosed />
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
