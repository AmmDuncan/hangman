import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/utils/cn";
import * as Dialog from "@radix-ui/react-dialog";

type Props = Readonly<{
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (_o: boolean) => void;
  panelClass?: string;
  overflowHidden?: boolean;
}>;

export function Modal(props: Props) {
  const { children, isOpen, setIsOpen, panelClass, overflowHidden } = props;

  return (
    <AnimatePresence>
      {isOpen ? (
        <Dialog.Root open={true} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay
              asChild
              className="modal-overlay data-[state=open]:animate-overlayShow fixed inset-0 z-[200] bg-gradient-to-b from-[#190131dd] to-[#282B96dd] backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="modal-content fixed inset-0 z-[200] grid min-h-full items-center justify-center overflow-y-auto py-10 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 16 }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    panelClass,
                    { "!overflow-hidden": overflowHidden },
                    "!pointer-events-auto relative mx-auto my-20 flex h-[445px] w-[592px] max-w-[90vw] flex-col items-center gap-12 rounded-[72px] bg-gradient-to-b from-[#344ABA] to-[#001479D4] shadow-[0_-8px_0px_4px_#140E66_inset,0_6px_0_8px_#3C74FF_inset]",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {children}
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : null}
    </AnimatePresence>
  );
}
