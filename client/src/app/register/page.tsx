'use client'

import CustomForm from '@/components/CustomForm'
import { auth } from '@/firebase/config'
import { FormValues } from '@/types/formValues'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SubmitHandler } from 'react-hook-form'

const Register = () => {
  const handleRegister: SubmitHandler<FormValues> = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log(user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorMessage)
      })
  }

  return <CustomForm formName="Register" formFunction={handleRegister} />
}

export default Register
