import { ModelDetails } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";

const DescriptionModal = () => {
  const [modelDetails, setModelDetails] = useState<ModelDetails>(
    {} as ModelDetails
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="underline">Click to view</button>
      </Dialog.Trigger>
      <Dialog.Portal className=" rounded-3xl ">
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="rounded-2xl divide-y-2 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black pb-2 text-lg font-bold text-[17px] ">
            Description
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              className=" absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center pr-8 pt-6"
              aria-label="Close"
            >
              Close
            </button>
          </Dialog.Close>

          <Dialog.Description className="  text-mauve11 pt-4 mt-[10px] mb-5 text-[15px] leading-normal">
            <div className="max-h-72 max-w-lg overflow-y-scroll ">
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
              Make changes to your profile here. Click save when you're done.
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DescriptionModal;
