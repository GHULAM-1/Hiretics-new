'use client'
import React from 'react'
import { Sidebar } from "@/components/layout/SideBar";
import { Header } from "@/components/layout/Header";
import { CardComponent } from "@/components/campaign-creation/DynamicCard";
import { useState } from "react";
import { MobileHeader } from '@/components/layout/MobileHeader';
import AnalyticsMainSection from '@/components/analytics/AnalyticsMainSection';

export default function AnalyticsPage() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className="w-full bg-muted/20">
      <div className="max-w-[1440px] mx-auto flex px-0 lg:px-6 lg:pt-6 pt-2">
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
       
            <AnalyticsMainSection/>
          </div>
        </div>
      </div>

    
    </div>
    </>
  )
}
