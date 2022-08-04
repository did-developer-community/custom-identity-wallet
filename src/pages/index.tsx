import { useRouter } from "next/router";
import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { isExistKeyPair } from "../lib/repository/keyPair";
import { getVCs } from "../lib/repository/vc";
import { Manifest } from "../types";

const IndexPage: React.FC = () => {
  const [manifests, setManifests] = React.useState<Manifest[]>([]);
  const router = useRouter();
  React.useEffect(() => {
    if (!isExistKeyPair()) {
      router.push("/createKey");
    }
    const vcs = getVCs();
    if (vcs) {
      const manifestList = Object.values(vcs).map((vc) => {
        return vc.manifest;
      });
      setManifests(manifestList);
    }
  }, [router]);

  return <HomeTemplate manifests={manifests} />;
};

export default IndexPage;
