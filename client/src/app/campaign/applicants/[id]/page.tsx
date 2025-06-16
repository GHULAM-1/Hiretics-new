import Applicants from "@/components/applicants/applicants";
import React from "react";

// 👇 `params` comes from the dynamic segment [id]
export default function ApplicantsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Applicants id={params.id} />
    </div>
  );
}
