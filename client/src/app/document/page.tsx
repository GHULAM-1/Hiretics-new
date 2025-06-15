'use client'
import { Sidebar } from '@/components/layout/SideBar'
import React from 'react'
import { Header } from '@/components/layout/Header'
import { useState } from 'react'
import { MobileHeader } from '@/components/layout/MobileHeader'
import JobDetailsPage from '@/components/document/JobAlertDeatils'

export default function HrDocument() {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="w-full bg-muted/20">
    {/* Outer container with max width and centered content */}
    <div className="max-w-[1440px] mx-auto flex px-0 lg:px-6 lg:pt-6 pt-2">
      {/* Sidebar section */}
      <div className="border-[#E4E4E7] border-[1px] shadow-md rounded-[6px] h-screen">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

   
        <div className="flex-1 overflow-auto">
          <JobDetailsPage/>
        </div>
      </div>
     
   
  </div>
  )
}
