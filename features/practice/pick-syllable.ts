interface SyllableFreq {
  syllable: string;
  freq: number;
}

export const bannedSyllables = new Set(["วชน"]);

export class AliasTable {
  private prob: number[] = [];
  private alias: number[] = [];
  private size: number = 0;

  constructor(private syllFreqs: SyllableFreq[]) {
    this.buildTable();
  }

  private buildTable() {
    const n = this.syllFreqs.length;
    this.size = n;

    // 1) Compute total frequency
    let totalFreq = 0;
    for (const { freq } of this.syllFreqs) {
      totalFreq += freq;
    }

    // 2) Build normalized probabilities
    const normalized = this.syllFreqs.map(
      (item) => (item.freq * n) / totalFreq
    );
    this.prob = new Array(n).fill(0);
    this.alias = new Array(n).fill(0);

    // 3) Create two work lists
    const small: number[] = [];
    const large: number[] = [];

    for (let i = 0; i < n; i++) {
      if (normalized[i] < 1) {
        small.push(i);
      } else {
        large.push(i);
      }
    }

    // 4) Fill prob and alias
    while (small.length > 0 && large.length > 0) {
      const l = small.pop()!;
      const g = large.pop()!;

      this.prob[l] = normalized[l];
      this.alias[l] = g;

      normalized[g] = normalized[g] + normalized[l] - 1.0;
      if (normalized[g] < 1.0) {
        small.push(g);
      } else {
        large.push(g);
      }
    }

    // 5) Remaining
    while (large.length > 0) {
      this.prob[large.pop()!] = 1;
    }
    while (small.length > 0) {
      this.prob[small.pop()!] = 1;
    }
  }

  /**
   * Draw a random syllable in O(1)
   */
  public sample(): string {
    const n = this.size;
    const i = Math.floor(Math.random() * n);

    let s: string;

    // With probability prob[i], choose i; otherwise choose alias[i]
    if (Math.random() < this.prob[i]) {
      s = this.syllFreqs[i].syllable;
    } else {
      s = this.syllFreqs[this.alias[i]].syllable;
    }

    if (bannedSyllables.has(s)) {
      return this.sample();
    }

    return s;
  }
}

// Build the alias table
// const aliasTable = new AliasTable(syllables);

// // Sample many times in O(1) each
// for (let i = 0; i < 100; i++) {
//   const randomPick = aliasTable.sample();
//   console.log("Random syllable (Alias):", randomPick);
// }
