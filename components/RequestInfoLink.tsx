// Opens the shopper's mail app. Nothing is sent from this demo.

export const REQUEST_INFO_HREF =
  "mailto:metroinfo@proforma.com?subject=New%20Holiday%20Store%20Request";

export default function RequestInfoLink({ className }: { className?: string }) {
  return (
    <a href={REQUEST_INFO_HREF} className={className}>
      Request Info
    </a>
  );
}
