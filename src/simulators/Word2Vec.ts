export interface WordEmbedding {
  word: string;
  x: number;
  y: number;
}

export interface Word2VecState {
  embeddings: WordEmbedding[];
  selectedWords: string[];
}

export class Word2VecSimulator {
  private baseEmbeddings: WordEmbedding[] = [
    { word: "king", x: 4, y: 5 },
    { word: "queen", x: 4, y: 8 },
    { word: "man", x: 2, y: 5 },
    { word: "woman", x: 2, y: 8 },
    { word: "boy", x: 1, y: 4 },
    { word: "girl", x: 1, y: 7 },
    { word: "prince", x: 3, y: 4 },
    { word: "princess", x: 3, y: 7 },
    { word: "apple", x: -4, y: -2 },
    { word: "banana", x: -5, y: -1 },
    { word: "orange", x: -3, y: -3 },
    { word: "fruit", x: -4, y: -1 },
    { word: "car", x: -5, y: 5 },
    { word: "bus", x: -6, y: 4 },
    { word: "truck", x: -4, y: 4 },
    { word: "vehicle", x: -5, y: 6 }
  ];

  private selectedWords: string[] = [];

  public getState(): Word2VecState {
    return {
      embeddings: this.baseEmbeddings.map(e => ({ ...e })),
      selectedWords: [...this.selectedWords]
    };
  }

  public selectWord(word: string) {
    if (!this.selectedWords.includes(word)) {
      if (this.selectedWords.length >= 3) {
        this.selectedWords.shift(); // keep max 3 for simple vector math demo
      }
      this.selectedWords.push(word);
    } else {
      this.selectedWords = this.selectedWords.filter(w => w !== word);
    }
  }

  public clearSelection() {
    this.selectedWords = [];
  }
}
