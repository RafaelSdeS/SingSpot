'use client'

// Import necessary modules
import Link from 'next/link'

// Define the Header component
const Footer = () => {
  return (
    <div className="bg-gray-800 py-4">
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
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Footer
