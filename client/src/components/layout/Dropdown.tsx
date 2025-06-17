'use client'

import { LogOut, Settings, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Props } from "@/types/dropdown-types"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



export function DropdownMenuButton({ name, avatarUrl }: Props) {
  const router = useRouter()
  const handleLogout = async () => {
    console.log("Logging out...")
    await supabase.auth.signOut()
    toast.success("Logged out successfully!")
    router.replace("/signin")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div  className="flex gap-3 rounded-[6px] items-center p-2 border-[#E4E4E7] border hover:cursor-pointer ">
          <Avatar className="h-[30px] w-[30px] self-center ">
          <AvatarImage src={avatarUrl} alt="@shadcn" />
          <AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
          <span className="font-medium lg:flex hidden text-sm">{name}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel className="text-sm hover:cursor-pointer">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <DollarSign className="mr-2 h-4 w-4" />
          <span>Pricing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
