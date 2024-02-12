'use client'

import CustomForm from '@/components/CustomForm'

const Login = () => {
  const login = () => {
    console.log('login')
  }

  return <CustomForm formName="Login" formFunction={login} />
}

export default Login
