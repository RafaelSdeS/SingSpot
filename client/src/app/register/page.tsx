'use client'

import CustomForm from '@/components/CustomForm'

const Register = () => {
  const register = () => {
    console.log('Register')
  }

  return <CustomForm formName="Register" formFunction={register} />
}

export default Register
