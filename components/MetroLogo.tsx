// Metro Printed Products mark. Sits on white so the blue wordmark stays readable.
export default function MetroLogo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/metro-logo.png" alt="Metro Printed Products" className={className} />
  );
}
