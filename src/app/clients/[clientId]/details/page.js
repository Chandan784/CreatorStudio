import React from "react";

function page({ params }) {
  const { clientId } = params;
  return <div>{clientId}</div>;
}

export default page;
