import CampaignPage from "@/components/campaign/campaign";
import React from "react";

export default function Compaign({ params }: { params: { id: string } }) {
  return (
    <div>
      <CampaignPage id={params.id} />
    </div>
  );
}
