import { useRouter } from "next/router";
import React from "react";

import { CredentialDetailTemplate } from "../../components/templates/CredentialDetail";
import { getVC, StoredVC } from "../../lib/repository/vc";

const CardDetailPage: React.FC = () => {
  const [storedVC, setStoredVCs] = React.useState<StoredVC>();
  const router = useRouter();
  console.log(useRouter().query);
  React.useEffect(() => {
    const { vcID } = router.query;
    const vc = getVC(vcID as string);
    if (vc) {
      setStoredVCs(vc);
    }
  }, [router.query]);
  return <CredentialDetailTemplate storedVC={storedVC} />;
};

export default CardDetailPage;
