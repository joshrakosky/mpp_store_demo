"use client";

import { useState } from "react";

// Product photos are portrait shots. If a file is missing, hide the broken image.
export default function CatalogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`bg-gray-100 ${className ?? ""}`} aria-hidden />;
  }

  return (
    // Plain img so the demo does not depend on the Next image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
