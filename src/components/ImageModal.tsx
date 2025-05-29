"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";

type ImageModalProps = {
  src: string;
  alt?: string;
  trigger: React.ReactNode;
};

export default function ImageModal({
  src,
  alt = "",
  trigger,
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-zoom-in">
        {trigger}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative max-w-full max-h-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <X className="w-6 h-6 text-yellow-400" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-screen rounded shadow-lg"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
