import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-[rgba(0,0,0,0.15)] bg-[rgba(0,0,0,0.08)] p-5 transition-all hover:-translate-y-0.5 hover:bg-[rgba(0,0,0,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
};
