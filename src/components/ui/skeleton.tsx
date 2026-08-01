import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate/60 border border-slate/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
