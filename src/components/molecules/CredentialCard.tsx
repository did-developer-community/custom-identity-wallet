import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { PlainCard } from "../cardComponents/PlainCard";
import { SampleCustomCard } from "../cardComponents/SampleCustomCard";

export interface CredentialCardProps {
  storedVC: StoredVC;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ storedVC }) => {
  const renderSwitch = () => {
    switch (storedVC.manifest.id) {
      case "sclvcdev02":
        return <SampleCustomCard storedVC={storedVC} />;
      default:
        return <PlainCard storedVC={storedVC} />;
    }
  };
  return <>{renderSwitch()}</>;
};
