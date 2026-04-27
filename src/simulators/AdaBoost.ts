import { ClassificationData } from './LogisticRegression'

interface Stump {
  feature: number // 0 for x1, 1 for x2
  threshold: number
  polarity: number // 1 or -1
  alpha: number
}

export interface AdaBoostState {
  data: ClassificationData
  nEstimators: number
  learningRate: number
  stumps: Stump[]
  accuracy: number
  dataset: string
}

export class AdaBoost {
  private state: AdaBoostState

  constructor(dataset: string = 'moons', nEstimators: number = 10) {
    const data = this.generateData(dataset, 100)
    this.state = {
      data,
      nEstimators,
      learningRate: 1.0,
      stumps: [],
      accuracy: 0,
      dataset
    }
    this.train()
  }

  public train() {
    const { data, nEstimators } = this.state
    const n = data.y.length
    // Convert y to [-1, 1] for AdaBoost
    const y = data.y.map(val => val === 0 ? -1 : 1)
    let weights = new Array(n).fill(1 / n)
    const stumps: Stump[] = []

    for (let t = 0; t < nEstimators; t++) {
      let bestStump: Stump = { feature: 0, threshold: 0, polarity: 1, alpha: 0 }
      let minError = Infinity

      // Iterate through features
      for (let f = 0; f < 2; f++) {
        const featureValues = f === 0 ? data.x1 : data.x2
        // Iterate through unique feature values as potential thresholds
        const uniqueValues = Array.from(new Set(featureValues)).sort((a, b) => a - b)
        
        for (let threshold of uniqueValues) {
          for (let polarity of [1, -1]) {
            let error = 0
            for (let i = 0; i < n; i++) {
              const prediction = (polarity * featureValues[i] < polarity * threshold) ? -1 : 1
              if (prediction !== y[i]) {
                error += weights[i]
              }
            }

            if (error < minError) {
              minError = error
              bestStump = { feature: f, threshold, polarity, alpha: 0 }
            }
          }
        }
      }

      // Calculate alpha (amount of say)
      // Add epsilon to avoid div by zero
      const epsilon = 1e-10
      const alpha = 0.5 * Math.log((1.0 - minError + epsilon) / (minError + epsilon))
      bestStump.alpha = alpha
      stumps.push(bestStump)

      // Update weights
      for (let i = 0; i < n; i++) {
        const featureVal = bestStump.feature === 0 ? data.x1[i] : data.x2[i]
        const pred = (bestStump.polarity * featureVal < bestStump.polarity * bestStump.threshold) ? -1 : 1
        weights[i] *= Math.exp(-alpha * y[i] * pred)
      }

      // Normalize weights
      const sumWeights = weights.reduce((a, b) => a + b, 0)
      weights = weights.map(w => w / sumWeights)
    }

    this.state.stumps = stumps
    this.state.accuracy = this.calculateAccuracy()
  }

  public predict(x1: number, x2: number): number {
    const { stumps } = this.state
    let totalPred = 0
    for (const stump of stumps) {
      const val = stump.feature === 0 ? x1 : x2
      const pred = (stump.polarity * val < stump.polarity * stump.threshold) ? -1 : 1
      totalPred += stump.alpha * pred
    }

    // Convert back to [0, 1] probability using sigmoid for smooth boundary
    return 1 / (1 + Math.exp(-totalPred))
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

  public setParams(params: Partial<AdaBoostState>) {
    Object.assign(this.state, params)
    this.train()
  }

  public getState(): AdaBoostState {
    return { ...this.state }
  }

  public changeDataset(dataset: string) {
    this.state.dataset = dataset
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
