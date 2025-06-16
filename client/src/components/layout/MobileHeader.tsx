'use client'

import { Bell, Sun, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenuButton } from "./Dropdown"
import { MobileHeaderProps } from "@/types/header-types"



export const MobileHeader = ({
  onMobileMenuClick,
  button = true,
  title = "Your Campaigns",
  subtitle = "Welcome Back, Moiz",
  onAddClick,
}: MobileHeaderProps) => {
  return (
    <>
      {/* Top nav */}
      <div className="w-full px-4 py-3 flex lg:hidden items-center justify-between bg-white sticky top-0 z-30">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMobileMenuClick}>
            <Menu />
          </Button>
          <img src="/logo.png" alt="Logo" className="w-[20px] h-[20px]" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon"><Sun /></Button>
          <Button variant="outline" size="icon"><Bell /></Button>
          <DropdownMenuButton avatarUrl="/avatars/moiz.png" />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {button && (
          <Button
            size="icon"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full shadow"
            onClick={onAddClick}
          >
            <Plus size={20} />
          </Button>
        )}
      </div>
    </>
  )
}
