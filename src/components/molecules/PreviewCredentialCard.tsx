import React from "react";

import { Manifest } from "../../types";
import { PreviewPlainCard } from "../cardComponents/preview/PreviewPlainCard";
import { PreviewSampleCustomCard } from "../cardComponents/preview/PreviewSampleCustomCard";

export interface PreviewCredentialCardProps {
  manifest: Manifest;
}

export const PreviewCredentialCard: React.FC<PreviewCredentialCardProps> = ({ manifest }) => {
  const renderSwitch = () => {
    switch (manifest.id) {
      case "sclvcdev02":
        return <PreviewSampleCustomCard manifest={manifest} />;
      default:
        return <PreviewPlainCard manifest={manifest} />;
    }
  };
  return <>{renderSwitch()}</>;
};
