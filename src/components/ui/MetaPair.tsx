import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

type MetaPairProps = {
  label: string;
  value: string;
  className?: string;
};

export function MetaPair({ label, value, className }: MetaPairProps) {
  return (
    <div className={cn(className)}>
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-2 font-sans text-body text-ink">{value}</p>
    </div>
  );
}
