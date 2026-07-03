import Image from "next/image";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/asset";

// コーポレートサイトと同一のロゴ画像（jqit-logo.png, 425x118）。
// light: 暗背景用に白反転（赤×黒ロゴは暗背景で沈むため）。
export function Logo({
  className,
  light,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Image
      src={asset("/jqit-logo.png")}
      alt="株式会社JQIT"
      width={425}
      height={118}
      loading="eager"
      unoptimized
      className={cn("h-7 w-auto", light && "brightness-0 invert", className)}
    />
  );
}
