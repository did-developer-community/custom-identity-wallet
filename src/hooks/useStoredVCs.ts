import React, { useEffect } from "react";

import { getVCs, StoredVC } from "../lib/repository/vc";

export const useStoredVCs = (vcId?: string) => {
  const [storedVCs, setStoredVCs] = React.useState<StoredVC[]>([]);
  useEffect(() => {
    const vcs = getVCs();
    if (vcs) {
      const storedVCs = Object.values(vcs).map((storedVC) => {
        return storedVC;
      });
      if (vcId) {
        setStoredVCs(storedVCs.filter((v) => v.vc === vcId));
      } else {
        setStoredVCs(storedVCs);
      }
    }
  }, [vcId]);

  return { storedVCs };
};
