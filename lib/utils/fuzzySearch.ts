export function fuzzySearch<T>(
  items: T[],
  query: string,
  fields: (keyof T)[],
): T[] {
  const searchQuery = query.trim().toLowerCase().replace(/\s+/g, " ");

  // Search empty hai → saare results
  if (!searchQuery) {
    return items;
  }

  const queryWords = searchQuery.split(" ");

  return items
    .map((item) => {
      let score = 0;

      const searchableText = fields
        .map((field) => String(item[field] ?? "").toLowerCase())
        .join(" ");

      // Exact full phrase
      if (searchableText.includes(searchQuery)) {
        score += 100;
      }

      // Individual words
      queryWords.forEach((word) => {
        if (!word) return;

        if (searchableText.includes(word)) {
          score += 30;
        }

        // Similar spelling / typo tolerance
        const words = searchableText.split(/\s+/);

        words.forEach((textWord) => {
          const distance = levenshteinDistance(word, textWord);

          if (distance <= getAllowedDistance(word)) {
            score += 20 - distance * 3;
          }
        });
      });

      return {
        item,
        score,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}

// =========================================================
// LEVENSHTEIN DISTANCE
// =========================================================

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;

  if (!a.length) return b.length;

  if (!b.length) return a.length;

  const matrix: number[][] = Array.from(
    {
      length: a.length + 1,
    },
    () => Array(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

// =========================================================
// TYPO TOLERANCE
// =========================================================

function getAllowedDistance(word: string): number {
  if (word.length <= 3) {
    return 0;
  }

  if (word.length <= 5) {
    return 1;
  }

  if (word.length <= 8) {
    return 2;
  }

  return 3;
}
