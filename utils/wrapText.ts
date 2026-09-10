export function wrapTextAtWords(text: string, maxCharsPerLine: number): string {
  if (!text || maxCharsPerLine <= 0 || text.length <= maxCharsPerLine) {
    return text
  }

  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word

    if (nextLine.length <= maxCharsPerLine) {
      currentLine = nextLine
      continue
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    if (word.length <= maxCharsPerLine) {
      currentLine = word
      continue
    }

    let remaining = word
    while (remaining.length > maxCharsPerLine) {
      lines.push(remaining.slice(0, maxCharsPerLine))
      remaining = remaining.slice(maxCharsPerLine)
    }
    currentLine = remaining
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines.join('\n')
}
