// Opens off-site links in a new tab; internal and mailto: links stay as they are.
export const externalLinkProps = (href: string) =>
  href.startsWith("http")
    ? ({ target: "_blank", rel: "noreferrer" } as const)
    : {};
