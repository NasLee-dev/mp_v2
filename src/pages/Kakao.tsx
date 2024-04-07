import { auth } from '@/remote/firebase'
import axios from 'axios'
import {
  OAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}
const { Kakao } = window
export default function KakaoLogin() {
  const [idToken, setIdToken] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string>('')
  const code = new URLSearchParams(window.location.search).get('code')
  console.log(code)
  useEffect(() => {
    if (code) {
      const getToken = async (code: string) => {
        try {
          const res = await axios.post(
            'http://localhost:8000/kakao/login',
            {
              code: code,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          const { firebaseToken } = res.data
          await signInWithCustomToken(auth, firebaseToken)
        } catch (error) {
          console.error(error)
        }
      }
      getToken(code)
    }
  }, [code])

  return <div>Kakao Login...</div>
}
//https://us-central1-missingpeople-e4fc3.cloudfunctions.net/auth
