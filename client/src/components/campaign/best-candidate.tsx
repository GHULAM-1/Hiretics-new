"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Download, Timer, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getApplicants } from "@/api/cv/api";
import { getCampaign } from "@/api/campaign/api";
import { Skeleton } from "@/components/ui/skeleton";

export interface Candidate {
  id?: string;
  name: string;
  email: string;
  cv_link?: string;
  avatar?: string;
}

interface BestCandidatesProps {
  candidates?: Candidate[];
  onLoadMore?: () => void;
  campaignId?: string;
  refreshKey?: number;
}

export function BestCandidates({
  candidates: propCandidates,
  onLoadMore,
  campaignId,
  refreshKey,
}: BestCandidatesProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(
    propCandidates || []
  );
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    if (campaignId) {
      setLoading(true);
      Promise.all([
        getApplicants(campaignId),
        getCampaign(campaignId)
      ])
        .then(([applicants, campaignData]) => {
          setCandidates(applicants);
          setCampaign(campaignData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [campaignId, refreshKey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Best Candidates</CardTitle>
        <p className="text-sm text-gray-600">
          {!loading && candidates.length === 0
            ? campaign?.status === "not-started"
              ? "The campaign has not started yet."
              : campaign?.status === "ongoing"
                ? "The Campaign is ongoing."
                : "Applicants that best match your needs."
            : "Applicants that best match your needs."}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center w-full min-w-[300px] justify-between py-2"
              >
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
          ) : candidates.length === 0 ? (
            <div className="flex flex-col min-w-[300px] items-center justify-center h-40 text-gray-500">
              {campaign?.status === "not-started" ? (
                <Timer className="w-8 h-8 text-gray-400 mb-2" />
              ) : (
                <Hourglass fill="#52525B" className="w-8 h-8 text-gray-400 mb-2" />
              )}
              <p className="text-sm text-gray-400">
                {campaign?.status === "not-started"
                  ? "waiting for the campaign to start..."
                  : "waiting for the campaign to end..."}
              </p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.email}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-gray-500">{candidate.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {candidate.cv_link && (
                    <Button
                      asChild
                      variant="default"
                      size="icon"
                      className="p-1"
                      title="View CV"
                      onClick={() => {
                        window.open(candidate.cv_link, "_blank");
                      }}
                    >
                      <a
                        href={candidate.cv_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
        {onLoadMore && candidates.length > 0 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              className="text-[#16A34A] hover:text-[#16A34A]/80"
              onClick={onLoadMore}
            >
              Load more
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
