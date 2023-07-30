import { SchemaSection } from "./model-schema-section";
import { ModelSummarySection } from "./model-summary-section";
import { StatusBanner } from "./status-banner";
import { ModelDetails } from "@/types";
import React, { useState } from "react";

const DescriptionModal = () => {
  const [modelDetails, setModelDetails] = useState<ModelDetails>(
    {} as ModelDetails
  );

  const handleClick = () =>{
    console.log('clicked...')
  }

  return (
    <div>
      <button className="text-black underline" onClick={handleClick}>Click to view</button>
      

      {/* <ModelSummarySection modelDetails={modelDetails} />

      <StatusBanner
        title={`Model`}
        description={"hello"}
        elapsedTime=""
        totalElapsedTime=""
      />

      <SchemaSection modelDetails={modelDetails} /> */}
    </div>
  );
};

export default DescriptionModal;
