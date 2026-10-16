import Image from "next/image";
export default function Logo({
  size = 52,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Keazzy’s Curations"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
