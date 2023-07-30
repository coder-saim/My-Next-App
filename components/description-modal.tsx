import { SchemaSection } from "./model-schema-section";
import { ModelSummarySection } from "./model-summary-section";
import { StatusBanner } from "./status-banner";
import { ModelDetails } from "@/types";
import React, { useState } from "react";

const DescriptionModal = () => {
  const [modelDetails, setModelDetails] = useState<ModelDetails>(
    {} as ModelDetails
  );
  return (
    <div>
      <ModelSummarySection modelDetails={modelDetails} />

      <StatusBanner
        title={`Model`}
        description={"hello"}
        elapsedTime=""
        totalElapsedTime=""
      />

      <SchemaSection modelDetails={modelDetails} />
    </div>
  );
};

export default DescriptionModal;
