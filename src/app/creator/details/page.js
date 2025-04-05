"use client";

import React, { useEffect, useState } from "react";
import getUser from "@/utils/getUser";
import BusinessRequirementForm from "@/components/layout/BusinessDetailsForm";
import InfluencerRequirementForm from "@/components/layout/InfluencerDetailsForm";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/server/api-utils";
function CreatorDetailsPgae() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!user) {
    redirect("/auth");
  }

  if (user.role == "Business") return <BusinessRequirementForm />;
  if (user.role == "Influencer")
    return <InfluencerRequirementForm userId={"67d173ffd0f78d32ad046925"} />;
}

export default CreatorDetailsPgae;
