export interface Document {
  id: number;
  text: string;
}

export interface NGram {
  text: string;
  count: number;
}

export interface NGramsState {
  document: string;
  n: number;
  ngrams: NGram[];
}

export class NGramsSimulator {
  private document: string;
  private n: number;

  constructor(initialDoc?: string, n: number = 2) {
    this.document = initialDoc || "the quick brown fox jumps over the lazy dog";
    this.n = n;
  }

  public setDocument(doc: string) {
    this.document = doc;
  }

  public setN(n: number) {
    this.n = Math.max(1, Math.min(n, 5)); // Keep n between 1 and 5
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  }

  public getState(): NGramsState {
    const tokens = this.tokenize(this.document);
    const ngramsMap: Record<string, number> = {};

    for (let i = 0; i <= tokens.length - this.n; i++) {
      const ngram = tokens.slice(i, i + this.n).join(' ');
      ngramsMap[ngram] = (ngramsMap[ngram] || 0) + 1;
    }

    const ngramsArray = Object.entries(ngramsMap).map(([text, count]) => ({ text, count }));
    // Sort by count descending, then alphabetically
    ngramsArray.sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));

    return {
      document: this.document,
      n: this.n,
      ngrams: ngramsArray
    };
  }
}
