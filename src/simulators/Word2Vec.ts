export interface WordEmbedding {
  word: string;
  x: number;
  y: number;
  category: string;
}

export interface Word2VecState {
  embeddings: WordEmbedding[];
  selectedWords: string[];
}

export class Word2VecSimulator {
  private baseEmbeddings: WordEmbedding[] = [
    { word: "king", x: 4, y: 5, category: "Royalty" },
    { word: "queen", x: 4, y: 8, category: "Royalty" },
    { word: "man", x: 2, y: 5, category: "People" },
    { word: "woman", x: 2, y: 8, category: "People" },
    { word: "boy", x: 1, y: 4, category: "People" },
    { word: "girl", x: 1, y: 7, category: "People" },
    { word: "prince", x: 3, y: 4, category: "Royalty" },
    { word: "princess", x: 3, y: 7, category: "Royalty" },
    { word: "apple", x: -4, y: -2, category: "Fruit" },
    { word: "banana", x: -5, y: -1, category: "Fruit" },
    { word: "orange", x: -3, y: -3, category: "Fruit" },
    { word: "fruit", x: -4, y: -1, category: "Fruit" },
    { word: "car", x: -5, y: 5, category: "Transport" },
    { word: "bus", x: -6, y: 4, category: "Transport" },
    { word: "truck", x: -4, y: 4, category: "Transport" },
    { word: "vehicle", x: -5, y: 6, category: "Transport" }
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
