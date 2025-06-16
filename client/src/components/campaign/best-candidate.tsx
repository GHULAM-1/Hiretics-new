"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Candidate {
  id: string
  name: string
  email: string
  avatar?: string
}

interface BestCandidatesProps {
  candidates?: Candidate[]
  onLoadMore?: () => void
}

export function BestCandidates({
  candidates = [
    { id: "1", name: "Abdul Moiz", email: "abmoiz.189@gmail.com" },
    { id: "2", name: "Abdul Moiz", email: "abmoiz.189@gmail.com" },
    { id: "3", name: "Abdul Moiz", email: "abmoiz.189@gmail.com" },
    { id: "4", name: "Abdul Moiz", email: "abmoiz.189@gmail.com" },
    { id: "5", name: "Abdul Moiz", email: "abmoiz.189@gmail.com" },
  ],
  onLoadMore,
}: BestCandidatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Best Candidates</CardTitle>
        <p className="text-sm text-gray-600">Applicants that best match your needs.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-sm text-gray-500">{candidate.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-1">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>
        {onLoadMore && (
          <div className="mt-4 text-center">
            <Button variant="ghost" className="text-[#16A34A] hover:text-[#16A34A]/80" onClick={onLoadMore}>
              Load more
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
