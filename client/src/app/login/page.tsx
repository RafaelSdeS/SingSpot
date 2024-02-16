'use client'

import { auth } from '@/firebase/config'
import CustomForm from '@/components/CustomForm'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { UseFormGetValues } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'
import { FormValues } from '@/types/formValues'
import { FirebaseError } from 'firebase/app'
import { useEffect } from 'react'

const Login = () => {
  const handleLogin: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.log(err)
      }
    }
  }

  // Set up the listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
      } else {
        console.log('User is signed out')
      }
    })

    return () => unsubscribe()
  }, [])

  return <CustomForm formName="Login" formFunction={handleLogin} />
}

export default Login
