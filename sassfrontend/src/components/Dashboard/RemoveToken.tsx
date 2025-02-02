'use client'

import { removeAuthToken } from "@/utils/TokenManagement"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const RemoveToken = () => {
    const router=useRouter()
    useEffect(() => {
    const removeToken = async () => {
      await removeAuthToken("access_token")
    }
    removeToken()
    router.refresh()
    }, [])
  return (
    <></>
  )
}

export default RemoveToken