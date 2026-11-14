// Escaping "<" stops the JSON from closing the script tag early (pattern from the Next.js JSON-LD guide).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON we build ourselves, "<" escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
