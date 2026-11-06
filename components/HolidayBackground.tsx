"use client";

// Full-screen loop behind every page. Muted so the browser can autoplay it.
// A light tint keeps white headings readable over the footage.

export default function HolidayBackground() {
  return (
    <div className="holiday-bg" aria-hidden>
      <video
        className="holiday-video"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/mpp-demo-background.mp4"
      />
      <div className="holiday-scrim" />
    </div>
  );
}
