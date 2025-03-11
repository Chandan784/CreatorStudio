"use client";

import React, { useEffect, useState } from "react";
import getUser from "@/utils/getUser";
import BusinessRequirementForm from "@/components/layout/BusinessDetailsForm";
import InfluencerRequirementForm from "@/components/layout/InfluencerDetailsForm";

function CreatorDetailsPgae() {
  let [user, setUser] = useState({});
  console.log(user, "userData");

  useEffect(() => {
    let userData = getUser();
    setUser(userData);
  }, []);

  if (user.role == "Business") return <BusinessRequirementForm />;
  if (user.role == "Influencer") return <InfluencerRequirementForm />;
}

export default CreatorDetailsPgae;
