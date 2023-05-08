import Layouts from '@/layouts/Layouts'
import axios from 'axios'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [auth, setAuth] = useState(false)
  useEffect(()=> {
    (
      async () => {
        try {
          //   const response = await fetch('http://localhost:4500/user/profile', {
          //   credentials: 'include'
          // })
          // const content = await response.json()
          // console.log(content?.statusCode)
          // if(content?.statusCode){
          //   setMessage(`Вы не зарегестрированны в системе`)
          //   setAuth(false)
          //   return
          // }

          const response = await axios.get('http://localhost:4500/user/profile', {
            withCredentials: true,
          }) 
          setMessage(`Hi ${response.data.name}`)
          setAuth(true)
        } catch (error) {
          setMessage(`Вы не зарегестрированны в системе`)
          setAuth(false)
        }
      }
    )()
  }, [])


  return (
    <Layouts auth={auth}>
      {message}
    </Layouts>
  )
}
