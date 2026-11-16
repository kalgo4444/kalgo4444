// Opens off-site links in a new tab; internal and mailto: links stay as they are.
export const externalLinkProps = (href: string) =>
  /^https?:\/\//.test(href)
    ? ({ target: "_blank", rel: "noreferrer" } as const)
    : {};
