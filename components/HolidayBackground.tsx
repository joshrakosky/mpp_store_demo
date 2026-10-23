"use client";

// Full-screen holiday loop behind every page. Muted so the browser can autoplay it.
// A light tint keeps white headings readable over the bright snow.

export default function HolidayBackground() {
  return (
    <div className="holiday-bg" aria-hidden>
      <video
        className="holiday-video"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/holiday-background.mp4"
      />
      <div className="holiday-scrim" />
    </div>
  );
}
