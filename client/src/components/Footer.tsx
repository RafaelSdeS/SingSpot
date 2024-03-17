'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-accent py-4 mb-8 border-b h-[10vh]">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <h1 className="font-bold text-xl text-primary">SingSpot</h1>
          </Link>
          <div className="flex gap-3">
            <Link
              className="text-muted-foreground hover:text-primary"
              href="/https://github.com/RafaelSdeS/SingSpot"
            >
              Github
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
