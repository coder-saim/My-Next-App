import { SchemaSection } from "./model-schema-section";
import { ModelSummarySection } from "./model-summary-section";
import { StatusBanner } from "./status-banner";
import { ModelDetails } from "@/types";
import React, { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';

const DescriptionModal = () => {
  const [modelDetails, setModelDetails] = useState<ModelDetails>(
    {} as ModelDetails
  );


  return (
    
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="underline">
        Click to view
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 text-black text-lg font-bold m-0 text-[17px]">
          Description
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        
        
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center pr-8 pt-6"
            aria-label="Close"
          >
           Close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

  );
};

export default DescriptionModal;
