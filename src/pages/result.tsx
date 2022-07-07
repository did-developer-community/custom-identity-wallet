import { useRouter } from "next/router";
import React from "react";

import { ResultTemplate } from "../components/templates/Result";

const ResultPage: React.FC = () => {
  const router = useRouter();
  return (
    <ResultTemplate
      type={router.query.type as "issue" | "present"}
      result={router.query.result === "true" ? true : false}
      errorMessage={router.query.errorMessage as string | undefined}
    />
  );
};

export default ResultPage;
