import { useRouter } from "next/router";
import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { isExistKeyPair } from "../lib/repository/keyPair";

const IndexPage: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (!isExistKeyPair()) {
      router.push("/createKey");
    }
  }, [router]);

  return <HomeTemplate />;
};

export default IndexPage;
