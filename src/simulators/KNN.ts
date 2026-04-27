import { ClassificationData } from './LogisticRegression'

export type DistanceMetric = 'euclidean' | 'manhattan'

export interface KNNState {
  data: ClassificationData
  k: number
  metric: DistanceMetric
  accuracy: number
}

export class KNN {
  private state: KNNState

  constructor(dataset: string = 'blobs', k: number = 3) {
    const data = this.generateData(dataset, 100)
    this.state = {
      data,
      k,
      metric: 'euclidean',
      accuracy: 0
    }
    this.state.accuracy = this.calculateAccuracy()
  }

  private calculateDistance(x1_a: number, x2_a: number, x1_b: number, x2_b: number): number {
    if (this.state.metric === 'euclidean') {
      return Math.sqrt(Math.pow(x1_a - x1_b, 2) + Math.pow(x2_a - x2_b, 2))
    } else {
      return Math.abs(x1_a - x1_b) + Math.abs(x2_a - x2_b)
    }
  }

  public predict(x1: number, x2: number): number {
    const { data, k } = this.state
    const distances: { dist: number, label: number }[] = []

    for (let i = 0; i < data.y.length; i++) {
      distances.push({
        dist: this.calculateDistance(x1, x2, data.x1[i], data.x2[i]),
        label: data.y[i]
      })
    }

    // Sort by distance
    distances.sort((a, b) => a.dist - b.dist)

    // Take top K
    const neighbors = distances.slice(0, k)
    
    // Vote
    const votes: Record<number, number> = {}
    neighbors.forEach(n => {
      votes[n.label] = (votes[n.label] || 0) + 1
    })

    // Return the class with most votes (or probability)
    // For heatmap, returning the probability of class 1 is better
    const class1Votes = votes[1] || 0
    return class1Votes / k
  }

  private calculateAccuracy(): number {
    let correct = 0
    const { data } = this.state
    for (let i = 0; i < data.y.length; i++) {
      // Leave-one-out or just evaluate on train? 
      // For simple simulator, evaluate on train but skip the point itself
      const pred = this.predictSkip(data.x1[i], data.x2[i], i)
      if ((pred >= 0.5 ? 1 : 0) === data.y[i]) correct++
    }
    return correct / data.y.length
  }

  // Predict skipping a specific index (for training accuracy)
  private predictSkip(x1: number, x2: number, skipIdx: number): number {
    const { data, k } = this.state
    const distances: { dist: number, label: number }[] = []

    for (let i = 0; i < data.y.length; i++) {
      if (i === skipIdx) continue
      distances.push({
        dist: this.calculateDistance(x1, x2, data.x1[i], data.x2[i]),
        label: data.y[i]
      })
    }

    distances.sort((a, b) => a.dist - b.dist)
    const neighbors = distances.slice(0, k)
    const votes: Record<number, number> = {}
    neighbors.forEach(n => {
      votes[n.label] = (votes[n.label] || 0) + 1
    })

    const class1Votes = votes[1] || 0
    return class1Votes / k
  }

  public getState(): KNNState {
    return { ...this.state }
  }

  public setParams(params: Partial<KNNState>) {
    Object.assign(this.state, params)
    this.state.accuracy = this.calculateAccuracy()
  }

  public changeDataset(dataset: string) {
    // Re-use logic from SVM or shared if possible, but keep it simple for now
    this.state.data = this.generateData(dataset, 100)
    this.state.accuracy = this.calculateAccuracy()
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
