import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { PlainCard } from "../cardComponents/PlainCard";
import { SampleCustomCard } from "../cardComponents/SampleCustomCard";

export interface CredentialCardProps {
  storedVC: StoredVC;
  isSelected?: boolean;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ storedVC, isSelected }) => {
  const renderSwitch = () => {
    switch (storedVC.manifest.id) {
      case "sclvcdev02":
        return <SampleCustomCard storedVC={storedVC} isSelected={isSelected} />;
      default:
        return <PlainCard storedVC={storedVC} isSelected={isSelected} />;
    }
  };
  return <>{renderSwitch()}</>;
};
