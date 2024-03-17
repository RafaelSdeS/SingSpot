'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchemaType, formSchema } from '@/schemas/formShcema'
import { auth } from '@/firebase/config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { AtSign } from 'lucide-react'

interface CustomFormProps {
  formFunction: SubmitHandler<{ email: string; password: string }>
  formName: string
}

const CustomForm: React.FC<CustomFormProps> = ({ formFunction, formName }) => {
  const router = useRouter()

  const signInWithGooglePopup = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('An unexpected error occurred', error)
      }
    }
    router.push('/home')
  }

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <div className="w-full h-[80vh] flex justify-center">
      <Card className="w-[350px] h-[80%]">
        <CardHeader>
          <CardTitle>{formName}</CardTitle>
          {formName == 'Register' ? (
            <CardDescription>Register an account</CardDescription>
          ) : (
            <CardDescription>Login into your account</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(formFunction)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="submit">{formName}</Button>
                {formName === 'Register' ? (
                  <Button variant={'secondary'} asChild>
                    <Link href="/login">Go to login</Link>
                  </Button>
                ) : (
                  <Button variant={'secondary'} asChild>
                    <Link href="/register">Go to register</Link>
                  </Button>
                )}{' '}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button variant={'ghost'} onClick={signInWithGooglePopup}>
            {' '}
            {/* Substitute this for the Google icon and possibly add other providers */}
            <AtSign />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CustomForm
