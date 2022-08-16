import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { CredentialCard } from "../components/molecules/CredentialCard";
import { useStoredVCs } from "../hooks/useStoredVCs";

const Detail = () => {
  const router = useRouter();
  const q = router.query;
  const { storedVCs } = useStoredVCs(q.id as string);

  const storedVC = useMemo(() => {
    return storedVCs[0];
  }, [storedVCs]);

  console.log(storedVC.credentialSubject);
  return <Box padding={10}>{storedVC && <CredentialCard storedVC={storedVC} />}</Box>;
};

export default Detail;
