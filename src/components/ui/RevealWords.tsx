import { Fragment } from "react";

interface RevealWordsProps {
  text: string;
  className?: string;
}

/** Keeps heading text semantic while giving GSAP one lightweight target per word. */
export default function RevealWords({ text, className = "" }: RevealWordsProps) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <span className={`inline ${className}`}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span className="gsap-word-reveal inline-block">{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
