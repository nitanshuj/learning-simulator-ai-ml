import { ClassificationData } from './LogisticRegression'

export interface NaiveBayesState {
  data: ClassificationData
  priors: number[]
  means: number[][] // [class][feature]
  vars: number[][]  // [class][feature]
  accuracy: number
}

export class NaiveBayes {
  private state: NaiveBayesState

  constructor(dataset: string = 'blobs') {
    const data = this.generateData(dataset, 100)
    this.state = {
      data,
      priors: [],
      means: [],
      vars: [],
      accuracy: 0
    }
    this.train()
  }

  public train() {
    const { data } = this.state
    const classes = [0, 1]
    const priors: number[] = []
    const means: number[][] = []
    const vars: number[][] = []

    classes.forEach(c => {
      const classIndices = data.y.reduce((acc, val, idx) => val === c ? [...acc, idx] : acc, [] as number[])
      const n_c = classIndices.length
      priors[c] = n_c / data.y.length

      const x1_c = classIndices.map(idx => data.x1[idx])
      const x2_c = classIndices.map(idx => data.x2[idx])

      const m1 = x1_c.reduce((a, b) => a + b, 0) / n_c
      const m2 = x2_c.reduce((a, b) => a + b, 0) / n_c
      means[c] = [m1, m2]

      const v1 = x1_c.reduce((a, b) => a + Math.pow(b - m1, 2), 0) / n_c
      const v2 = x2_c.reduce((a, b) => a + Math.pow(b - m2, 2), 0) / n_c
      vars[c] = [v1 + 1e-9, v2 + 1e-9] // Add epsilon to avoid zero variance
    })

    this.state.priors = priors
    this.state.means = means
    this.state.vars = vars
    this.state.accuracy = this.calculateAccuracy()
  }

  private gaussianProb(x: number, mean: number, variance: number): number {
    const exponent = Math.exp(-Math.pow(x - mean, 2) / (2 * variance))
    return (1 / Math.sqrt(2 * Math.PI * variance)) * exponent
  }

  public predict(x1: number, x2: number): number {
    const { priors, means, vars } = this.state
    
    // Calculate posterior for Class 0
    const p0 = priors[0] * this.gaussianProb(x1, means[0][0], vars[0][0]) * this.gaussianProb(x2, means[0][1], vars[0][1])
    
    // Calculate posterior for Class 1
    const p1 = priors[1] * this.gaussianProb(x1, means[1][0], vars[1][0]) * this.gaussianProb(x2, means[1][1], vars[1][1])

    // Normalize to get probability of Class 1
    const sum = p0 + p1
    if (sum === 0) return 0.5
    return p1 / sum
  }

  private calculateAccuracy(): number {
    let correct = 0
    const { data } = this.state
    for (let i = 0; i < data.y.length; i++) {
      const pred = this.predict(data.x1[i], data.x2[i])
      if ((pred >= 0.5 ? 1 : 0) === data.y[i]) correct++
    }
    return correct / data.y.length
  }

  public getState(): NaiveBayesState {
    return { ...this.state }
  }

  public changeDataset(dataset: string) {
    this.state.data = this.generateData(dataset, 100)
    this.train()
  }

  private generateData(type: string, n: number): ClassificationData {
    const x1: number[] = [];
    const x2: number[] = [];
    const y: number[] = [];

    if (type === 'linear') {
      for (let i = 0; i < n; i++) {
        const isClass0 = i < n / 2;
        const offset = isClass0 ? 1.5 : -1.5;
        x1.push(offset + (Math.random() - 0.5) * 3);
        x2.push(offset + (Math.random() - 0.5) * 3);
        y.push(isClass0 ? 0 : 1);
      }
    } else if (type === 'blobs') {
      const centers = [[-2, -2], [2, 2]];
      for (let i = 0; i < n; i++) {
        const cIdx = i < n / 2 ? 0 : 1;
        const center = centers[cIdx];
        x1.push(center[0] + (Math.random() - 0.5) * 2.5);
        x2.push(center[1] + (Math.random() - 0.5) * 2.5);
        y.push(cIdx);
      }
    } else if (type === 'moons') {
      for (let i = 0; i < n; i++) {
        const isClass0 = i < n / 2;
        const t = Math.random() * Math.PI;
        if (isClass0) {
          x1.push(Math.cos(t) * 3 + (Math.random() - 0.5) * 0.5);
          x2.push(Math.sin(t) * 3 + (Math.random() - 0.5) * 0.5);
          y.push(0);
        } else {
          x1.push(Math.cos(t) * 3 + 1.5 + (Math.random() - 0.5) * 0.5);
          x2.push(-Math.sin(t) * 3 + 1.5 + (Math.random() - 0.5) * 0.5);
          y.push(1);
        }
      }
    } else if (type === 'circles') {
      for (let i = 0; i < n; i++) {
        const isClass0 = i < n / 2;
        const r = isClass0 ? 2 : 4;
        const t = Math.random() * 2 * Math.PI;
        x1.push(Math.cos(t) * r + (Math.random() - 0.5) * 0.5);
        x2.push(Math.sin(t) * r + (Math.random() - 0.5) * 0.5);
        y.push(isClass0 ? 0 : 1);
      }
    }
    return { x1, x2, y };
  }
}
