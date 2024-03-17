'use client'

import Link from 'next/link'
import React from 'react'
import UserNav from './UserNav'
import { useAuth } from '@/contexts/authContext'
import { Button } from './ui/button'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-gray-800 py-4 mb-8 border-b h-[10vh]">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between">
          <Link href="/">
            <h1 className="font-bold text-3xl text-secondary">SingSpot</h1>
          </Link>
          <div className="flex gap-3">
            {user ? (
              <UserNav
                name={user?.displayName as string}
                email={user?.email as string}
                image={user?.photoURL as string}
              />
            ) : (
              <>
                <Button asChild className="bg-transparent">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-transparent">
                  <Link href="register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
