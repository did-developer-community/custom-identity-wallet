import { useRouter } from "next/router";
import React from "react";

import { CredentialCard } from "../components/molecules/CredentialCard";

const Detail = () => {
  const router = useRouter();
  const q = router.query;
  return <div>{/*<CredentialCard storedVC={} />*/}</div>;
};

export default Detail;
