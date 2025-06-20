  'use client'

  import { Bell, Sun, Moon } from "lucide-react"
  import { useTheme } from "next-themes"
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
  import { DropdownMenuButton } from "./Dropdown"
  import { HeaderProps } from "@/types/header-types"
import { useUserStore } from "@/store/userStore"


  export const Header = ({ title, subtitle, user }: HeaderProps) => {
    const { theme, setTheme } = useTheme()
    const { displayName } = useUserStore()
    const [darkMode, setDarkMode] = useState(theme === 'dark')

    let name = user?.name ?? "Mian Abubakar";
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.displayName) name = parsed.displayName;
        } catch {}
      }
    }

    const toggleTheme = () => {
      setTheme(darkMode ? 'light' : 'dark')
      setDarkMode(!darkMode)
    }

    return (
      <div className="hidden lg:flex items-center  justify-between w-full px-6 py-4 border-b  bg-white">
        <div >
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {`Welcome, ${name.charAt(0).toUpperCase()}${name.slice(1)}`}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" size="icon" onClick={toggleTheme} className="border hover:cursor-pointer border-[#E4E4E7] rounded-[6px] ">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="default" size="icon" className="border hover:cursor-pointer  border-[#E4E4E7] rounded-[6px]">
            <Bell className="h-5 w-5 text-[#DC2626] " />
          </Button>

          <DropdownMenuButton
          name={name || ""}
          />
        </div>
      </div>
    )
  }
