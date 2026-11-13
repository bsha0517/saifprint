interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      data-reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <p className={`eyebrow ${dark ? "eyebrow-on-dark" : ""} ${centered ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-[#c9cde0]" : "text-muted"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
