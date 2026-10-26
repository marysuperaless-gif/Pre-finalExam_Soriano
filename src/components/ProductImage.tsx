import { useState } from "react";

interface Props { src: string; alt: string; }

// Shows an image. If the link is broken, shows a text box instead (fallback).
export default function ProductImage({ src, alt }: Props) {
  const [failedSrc, setFailedSrc] = useState("");
  // Compare with the failed link so a new URL gets a fresh try.
  if (!src || failedSrc === src) {
    return <div className="image-fallback" role="img" aria-label={alt}>Image not available</div>;
  }
  return <img src={src} alt={alt} referrerPolicy="no-referrer" onError={() => setFailedSrc(src)} />;
}
