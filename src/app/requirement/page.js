"use client";
import React from "react";
import BusinessForm from "@/components/layout/BusinessDetailsForm";
import AgencyForm from "@/components/layout/AgencyRequirementForm";
import InfluencerForm from "@/components/layout/InfluencerDetailsForm";
function page() {
  return (
    <div className=" mt-12">
      <AgencyForm />
      <InfluencerForm />
      <BusinessForm />
    </div>
  );
}

export default page;
