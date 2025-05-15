
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Loader2, MoreVertical } from "lucide-react"
import { CardComponentProps } from "@/types/card-types"
import { Plus ,Star} from "lucide-react"

const CardStatusIcon = ({ status }: { status: "completed" | "ongoing" }) => {
    if (status === "completed") {
      return <CheckCircle size={14} className="text-green-600" />
    }
  
    if (status === "ongoing") {
      return <Loader2 size={14} className="animate-spin text-gray-500" />
    }
  
    return null
  }
  

export const CardComponent = ({
  title,
  status,
  username,
  userAvatar,
  count,
  highlight = false,
  actions,
  footer,
  onClick,
  variant,
  className
}: CardComponentProps) => {
  return (
    <Card
    onClick={onClick}
    className={cn(
      "rounded-lg shadow-sm transition-colors cursor-pointer flex justify-between hover:bg-[#F0FDF4]",
      variant === "create",
      highlight && "lg:bg-[#ECFDF5] lg:border lg:border-[#D1FADF] ",
      className
    )}
  >
   {variant === "create" ? (
  <div className="hidden lg:flex h-40 flex-col items-center justify-center">
    <div className="border-2 border-dashed border-black rounded-full p-3 mb-2">
      <Plus className="h-6 w-6" />
    </div>
    <p className="font-medium text-sm text-black">Create a Campaign</p>
  </div>
) : (
      <>
        <CardHeader className=" flex flex-row items-start justify-between">
            <div className="flex items-start justify-between w-full">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {status && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <CardStatusIcon status={status} />
                <span className="capitalize">{status}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-[4px]">
          <Star size={16}/>
          {actions ?? <MoreVertical size={16} className="text-gray-400 cursor-pointer" />}
          </div>
          </div>
        </CardHeader>
  
        <CardContent className="flex justify-between items-center pt-0">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {userAvatar ? (
                <AvatarImage src={userAvatar} />
              ) : (
                <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm text-muted-foreground">{username}</span>
          </div>
  
          {typeof count === "number" && (
            <div className="flex items-center gap-1 text-[#16A34A] font-medium text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a3 3 0 00-.879-2.121M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 01.879-2.121M12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              {count}
            </div>
          )}
        </CardContent>
  
        {footer && <CardFooter>{footer}</CardFooter>}
      </>
    )}
  </Card>
  
  )
}
