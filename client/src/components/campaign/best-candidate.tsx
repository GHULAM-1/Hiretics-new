"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreVertical, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getApplicants } from "@/api/cv/api"
import { Skeleton } from "@/components/ui/skeleton"

export interface Candidate {
  id?: string
  name: string
  email: string
  cv_link?: string
  avatar?: string
}

interface BestCandidatesProps {
  candidates?: Candidate[]
  onLoadMore?: () => void
  campaignId?: string
}

export function BestCandidates({
  candidates: propCandidates,
  onLoadMore,
  campaignId,
}: BestCandidatesProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(propCandidates || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (campaignId) {
      setLoading(true)
      getApplicants(campaignId)
        .then(setCandidates)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [campaignId])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Best Candidates</CardTitle>
        <p className="text-sm text-gray-600">Applicants that best match your needs.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))
          ) : (
            candidates.map((candidate) => (
              <div key={candidate.email} className="flex items-center justify-between py-2">
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
                <div className="flex items-center gap-2">
                  {candidate.cv_link && (
                    <Button asChild variant="default" size="icon" className="p-1" title="View CV" onClick={() => {
                      window.open(candidate.cv_link, "_blank");
                    }}>
                      <a href={candidate.cv_link} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 text-[#16A34A]" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            ))
          )}
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
