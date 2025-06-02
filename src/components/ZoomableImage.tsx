"use client";
import { useState } from "react";
import ImageModal from "./ImageModal";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export default function ZoomableImage({ src, alt = "", className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in rounded ${className || "max-w-xs"}`}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <ImageModal src={src} alt={alt} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
