'use client'

import React, { useEffect, useState } from "react"

export const SplashScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const beamX = progress * 3 

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative bg-white">
      <h1 className="text-3xl font-bold text-[#16A34A]">Hiretics</h1>

      <div className="relative mt-10 w-72 h-[2px] bg-gray-300 overflow-hidden rounded">
        <div
          className="absolute top-0 left-0 h-full bg-[#16A34A]/60"
          style={{
            width: `${beamX + 50}px`,
            transition: 'width 20ms linear',
          }}
        />
        </div>

        {/*
        <div
          className="absolute top-[-4px] w-4 h-4 bg-[#16A34A] rounded-full shadow-[#16A34A] shadow-2xl translate-y-36"
        //   style={{
        //     transform: `translateX(${beamX}px)`,
        //     boxShadow: '0 0 30px 10px #',
        //     transition: 'transform 20ms linear',
        //   }}
        />
      </div> */}
      <div className="absolute bottom-10 text-sm text-gray-500 font-bold">
        POWERED BY G<span className="text-[#1ad960]">D</span>
      </div>
   </div>
  )
}
