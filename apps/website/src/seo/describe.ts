/**
 * A meta description: whole sentences when they fit, else cut at a word
 * boundary. Search engines show about 155 characters.
 */
export function describe(text: string, max = 155): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= max) return flat

  const sentences = flat.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? []
  let out = ''
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break
    out += sentence
  }
  if (out.trim().length >= 70) return out.trim()

  const cut = flat.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '')}…`
}
