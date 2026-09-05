import clsx from "clsx";

export function SectionHeading({
  number = "01",
  eyebrow,
  title,
  italicSubtitle,
  description,
  className,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  italicSubtitle?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("mb-16 sm:mb-24", className)}>
      {eyebrow && (
        <div className="flex items-center gap-6 mb-6 sm:mb-8">
          <div className="flex items-baseline gap-3">
            <span className="font-serif italic text-base sm:text-lg text-pink-400">
              {number}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-pink-300/70">
              {eyebrow}
            </span>
          </div>
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-pink-500/60 via-pink-400/20 to-transparent" />
        </div>
      )}

      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[0.96] text-white uppercase"
        style={{ letterSpacing: "-0.03em" }}
      >
        <span>{title}</span>
        {italicSubtitle && (
          <>
            <br />
            <span className="italic font-serif normal-case font-normal text-pink-300/90">
              {italicSubtitle}
            </span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-base sm:text-lg font-light text-neutral-300/85 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
