import { useRouter } from "next/router";
import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { isExistKeyPair } from "../lib/repository/keyPair";
import { getVCs } from "../lib/repository/vc";
import { Card } from "../types";

const IndexPage: React.FC = () => {
  const [cards, setCards] = React.useState<Card[]>([]);
  const router = useRouter();
  React.useEffect(() => {
    if (!isExistKeyPair()) {
      router.push("/createKey");
    }
    const vcs = getVCs();
    if (vcs) {
      const cards = Object.values(getVCs()).map((vc) => {
        return vc.manifest.display.card;
      });
      setCards(cards);
    }
  }, [router]);

  return <HomeTemplate cards={cards} />;
};

export default IndexPage;
