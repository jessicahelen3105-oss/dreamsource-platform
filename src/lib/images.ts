/** Serve local images through the Netlify Image CDN at a sensible size. */
export function cdnImage(src: string, width: number, format: 'webp' | 'avif' = 'webp'): string {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=${format}&q=78`
}

export function cdnSrcSet(src: string, widths: number[]): string {
  return widths.map((w) => `${cdnImage(src, w)} ${w}w`).join(', ')
}
