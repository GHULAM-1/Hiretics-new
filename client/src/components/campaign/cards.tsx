"use client";

import { Users, Clock, Eye, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CountCardsProps {
  responsesReceived?: number;
  daysRemaining?: number;
  onViewAsApplicant?: () => void;
}

export function CountCards({
  responsesReceived = 100,
  daysRemaining = 0,
  onViewAsApplicant,
}: CountCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Responses Received Card */}
      <Card className="p-6 max-h-[180px]">
        <CardContent className="p-0">
          <div className="flex">
            {/* Responses Received */}
            <div className="flex flex-col space-y-3 flex-1">
              <div className="p-2 bg-gray-100 rounded-lg w-fit">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Responses Received</p>
                <p className="text-3xl font-bold text-[#16A34A]">
                  {responsesReceived}
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-px bg-gray-200 mx-6"></div>

            {/* Days Remaining */}
            <div className="flex flex-col space-y-3 flex-1">
              <div className="p-2 bg-gray-100 rounded-lg w-fit">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Days <br /> Remaining</p>
                <p className="text-3xl font-bold text-[#16A34A]">
                  {daysRemaining}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View as Applicant Card */}
      <Card
        className="p-6 cursor-pointer max-h-[180px] hover:bg-gray-50 transition-colors"
        onClick={onViewAsApplicant}
      >
        <CardContent className="p-0">
          <div className="flex items-center flex-col justify-between space-y-4">
            <div className="flex items-start flex-col space-y-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  View campaign document as an applicant.
                </p>
              </div>
            </div>
            <div className="flex items-end justify-end w-full">
              <div className="p-2 bg-[#16A34A] rounded-full  flex-shrink-0">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
