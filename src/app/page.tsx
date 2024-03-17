import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Main() {
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Welcome to Singspot
              </span>
            </span>
            <h1 className="mt-8 text-3-xl font-extrabold tracking-tight lg:text-6xl">
              Your karaoke app
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              dolor ut nobis voluptates, distinctio dolorem minima dolorum illo
              laborum sed officiis voluptas sint ea quasi et esse fugit ratione
              corrupti?
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto mt-10 gap-8">
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
