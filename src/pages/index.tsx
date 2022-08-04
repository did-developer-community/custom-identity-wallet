import { useRouter } from "next/router";
import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { isExistKeyPair } from "../lib/repository/keyPair";
import { getVCs, StoredVC } from "../lib/repository/vc";

const IndexPage: React.FC = () => {
  const [storedVCs, setStoredVCs] = React.useState<StoredVC[]>([]);
  const router = useRouter();
  React.useEffect(() => {
    if (!isExistKeyPair()) {
      router.push("/createKey");
    }
    const vcs = getVCs();
    if (vcs) {
      const storedVCs = Object.values(vcs).map((storedVC) => {
        return storedVC;
      });
      setStoredVCs(storedVCs);
    }
  }, [router]);

  return <HomeTemplate storedVCs={storedVCs} />;
};

export default IndexPage;
