import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Image
      src={asset(light ? "/jqit-logo-light.png" : "/jqit-logo.png")}
      alt="JQIT"
      width={299}
      height={83}
      priority
      className={cn(
        "h-auto w-[96px] object-contain md:w-[112px]",
        className,
      )}
    />
  );
}
