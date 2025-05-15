'use client'

import { Sidebar } from "@/components/layout/SideBar"
import { Header } from "@/components/layout/Header"
import { CardComponent } from "@/components/DynamicCard"
import { useState } from "react"
import { MobileHeader } from "./layout/MobileHeader"

export default function Home() {
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

     
        <div className="flex-1 flex flex-col">
          <MobileHeader
            onMobileMenuClick={() => setIsMobileOpen(true)}
            title="Your Campaigns"
          />

          <Header
            title="Your Campaigns"
            subtitle="Welcome, Moiz"
            user={{ name: "Abdul Moiz", avatarUrl: "" }}
          />

          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <CardComponent
                className="lg:flex hidden"
                variant="create"
                onClick={() => console.log("Create a Campaign clicked")}
              />
              <CardComponent
                title="Web Developer"
                status="ongoing"
                username="BitProwler"
                count={141}
              />
              <CardComponent
                title="Web Developer"
                status="completed"
                username="BitProwler"
                count={141}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
