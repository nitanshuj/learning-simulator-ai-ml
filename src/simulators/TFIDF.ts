export interface Document {
  id: number;
  text: string;
}

export interface TFIDFState {
  documents: Document[];
  vocabulary: string[];
  tfMatrix: number[][];
  idfVector: number[];
  tfidfMatrix: number[][];
  // 2D projection for vector space plotting
  projectedPoints: { id: number; x: number; y: number; text: string }[];
}

export class TFIDF {
  private documents: Document[] = [];

  constructor(initialDocs?: string[]) {
    if (initialDocs) {
      this.documents = initialDocs.map((text, i) => ({ id: i, text }));
    } else {
      this.documents = [
        { id: 0, text: "machine learning is fascinating" },
        { id: 1, text: "deep learning and machine learning" },
        { id: 2, text: "artificial intelligence is the future" }
      ];
    }
  }

  public setDocuments(docs: string[]) {
    this.documents = docs.map((text, i) => ({ id: i, text }));
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  }

  public getState(): TFIDFState {
    const tokenizedDocs = this.documents.map(d => this.tokenize(d.text));
    
    // Build vocabulary
    const vocabSet = new Set<string>();
    tokenizedDocs.forEach(doc => doc.forEach(word => vocabSet.add(word)));
    const vocabulary = Array.from(vocabSet).sort();

    // Calculate TF
    const tfMatrix = tokenizedDocs.map(doc => {
      const counts: Record<string, number> = {};
      doc.forEach(w => counts[w] = (counts[w] || 0) + 1);
      return vocabulary.map(v => (counts[v] || 0) / doc.length);
    });

    // Calculate IDF
    const N = this.documents.length;
    const idfVector = vocabulary.map(v => {
      const docsWithWord = tokenizedDocs.filter(doc => doc.includes(v)).length;
      return Math.log10(N / (docsWithWord || 1)) + 1; // +1 to avoid 0
    });

    // Calculate TF-IDF
    const tfidfMatrix = tfMatrix.map(tfRow => 
      tfRow.map((tf, i) => tf * idfVector[i])
    );

    // Simple 2D projection (using 2 principal-like components or just picking 2 words if vocab is large, 
    // but here we'll use a simplistic pseudo-PCA to 2D for visualization)
    const projectedPoints = tfidfMatrix.map((vec, idx) => {
        let x = 0;
        let y = 0;
        // simplistic projection: sum weighted by sine/cosine to spread points
        vec.forEach((val, i) => {
            const angle = (i * Math.PI * 2) / vocabulary.length;
            x += val * Math.cos(angle);
            y += val * Math.sin(angle);
        });
        return { id: this.documents[idx].id, x, y, text: this.documents[idx].text };
    });

    return {
      documents: this.documents.map(d => ({ ...d })),
      vocabulary,
      tfMatrix,
      idfVector,
      tfidfMatrix,
      projectedPoints
    };
  }
}
