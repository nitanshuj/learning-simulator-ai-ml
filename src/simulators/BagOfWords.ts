export interface Document {
  id: number;
  text: string;
}

export interface BagOfWordsState {
  documents: Document[];
  vocabulary: string[];
  countsMatrix: number[][];
}

export class BagOfWords {
  private documents: Document[] = [];

  constructor(initialDocs?: string[]) {
    if (initialDocs) {
      this.documents = initialDocs.map((text, i) => ({ id: i, text }));
    } else {
      this.documents = [
        { id: 0, text: "I love natural language processing" },
        { id: 1, text: "natural language processing is fun" },
        { id: 2, text: "I love learning new things" }
      ];
    }
  }

  public setDocuments(docs: string[]) {
    this.documents = docs.map((text, i) => ({ id: i, text }));
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  }

  public getState(): BagOfWordsState {
    const tokenizedDocs = this.documents.map(d => this.tokenize(d.text));
    
    // Build vocabulary
    const vocabSet = new Set<string>();
    tokenizedDocs.forEach(doc => doc.forEach(word => vocabSet.add(word)));
    const vocabulary = Array.from(vocabSet).sort();

    // Calculate word counts
    const countsMatrix = tokenizedDocs.map(doc => {
      const counts: Record<string, number> = {};
      doc.forEach(w => counts[w] = (counts[w] || 0) + 1);
      return vocabulary.map(v => (counts[v] || 0));
    });

    return {
      documents: this.documents.map(d => ({ ...d })),
      vocabulary,
      countsMatrix
    };
  }
}
