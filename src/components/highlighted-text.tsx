import React from "react";

export const HighlightedText = ({ text }: { text: string }) => {
  const highlightedText = text.replace(
    /(\+|-)/g,
    (match) =>
      `<span style=";color: ${match === "+" ? "green" : "red"}">${match}</span>`
  );

  return (
    <p
      className="max-w-prose whitespace-pre-wrap leading-6"
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  );
};
