'use client'

// Import necessary modules
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 mb-8">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between">
          <Link className="text-white" href={'/home'}>
            SingSpot
          </Link>
          <ul className="flex gap-3">
            <li>
              <Link className="text-white" href={'/home'}>
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white" href={'/user'}>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
