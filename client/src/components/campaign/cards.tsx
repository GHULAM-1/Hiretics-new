"use client"

import { Users, Clock, Eye, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CountCardsProps {
  responsesReceived?: number
  daysRemaining?: number
  onViewAsApplicant?: () => void
}

export function CountCards({ responsesReceived = 100, daysRemaining = 0, onViewAsApplicant }: CountCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Responses Received Card */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Responses Received</p>
              <p className="text-3xl font-bold text-[#16A34A]">{responsesReceived}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days Remaining Card */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Days Remaining</p>
              <p className="text-3xl font-bold text-[#16A34A]">{daysRemaining}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View as Applicant Card */}
      <Card className="p-4 cursor-pointer hover:bg-gray-50" onClick={onViewAsApplicant}>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Eye className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">View campaign document as an applicant.</p>
              </div>
            </div>
            <div className="p-2 bg-[#16A34A] rounded-full">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
