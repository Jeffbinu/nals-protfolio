import { type ReactNode } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1600px] 2xl:max-w-[1720px] px-6 sm:px-10 lg:px-16 2xl:px-24", className)}>
      {children}
    </div>
  );
}
