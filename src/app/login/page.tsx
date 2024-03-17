'use client'

import { auth } from '@/firebase/config'
import CustomForm from '@/components/CustomForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { SubmitHandler } from 'react-hook-form'
import { FormValues } from '@/types/formValues'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'next/navigation'
const Login = () => {
  const router = useRouter()

  const handleLogin: SubmitHandler<FormValues> = async ({
    email,
    password,
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.log(err)
        return
      }
    }
    router.push('/home')
  }

  return <CustomForm formName="Login" formFunction={handleLogin} />
}

export default Login
