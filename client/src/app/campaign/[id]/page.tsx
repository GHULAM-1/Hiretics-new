import CampaignPage from "@/components/campaign/campaign";
import React from "react";

export default async function Compaign({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <CampaignPage id={id} />
    </div>
  );
}
