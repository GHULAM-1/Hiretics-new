'use client'

import { useEffect, useState } from "react"
import { SplashScreen } from "@/components/splash/SaplashScreen"

export const ClientRoot = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return loading ? <SplashScreen /> : <>{children}</>
}
