export const next = (seed: number, step = 0): number => {
  const a = (seed + step * 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export const rng = (seed: number) => {
  let step = 0
  return () => next(seed, step++)
}

export const shuffle = <T>(deck: T[], seed: number): T[] => {
  const result = deck.slice()
  const rand = rng(seed)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export const shuffleInPlace = <T>(deck: T[], seed: number): void => {
  const rand = rng(seed)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
}
