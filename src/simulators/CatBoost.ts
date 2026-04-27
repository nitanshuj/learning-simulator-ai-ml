import { ClassificationData } from './LogisticRegression'

interface CatNode {
  features: number[]
  thresholds: number[]
  leafValues: number[] // 2^depth leaf values
}

export interface CatBoostState {
  data: ClassificationData
  nEstimators: number
  learningRate: number
  maxDepth: number
  trees: CatNode[]
  accuracy: number
  dataset: string
}

export class CatBoost {
  private state: CatBoostState

  constructor(dataset: string = 'circles', nEstimators: number = 5) {
    const data = this.generateData(dataset, 100)
    this.state = {
      data,
      nEstimators,
      learningRate: 0.1,
      maxDepth: 3,
      trees: [],
      accuracy: 0,
      dataset
    }
    this.train()
  }

  public train() {
    const { data, nEstimators, learningRate, maxDepth } = this.state
    const n = data.y.length
    const y = data.y
    let currentPred = new Array(n).fill(0)
    const trees: CatNode[] = []

    for (let t = 0; t < nEstimators; t++) {
      const residuals: number[] = []
      for (let i = 0; i < n; i++) {
        const p = 1 / (1 + Math.exp(-currentPred[i]))
        residuals.push(y[i] - p)
      }

      const tree = this.buildSymmetricTree(data, residuals, maxDepth)
      trees.push(tree)

      for (let i = 0; i < n; i++) {
        currentPred[i] += learningRate * this.predictTree(tree, data.x1[i], data.x2[i])
      }
    }

    this.state.trees = trees
    this.state.accuracy = this.calculateAccuracy()
  }

  private buildSymmetricTree(data: ClassificationData, residuals: number[], maxDepth: number): CatNode {
    const n = residuals.length
    const treeFeatures: number[] = []
    const treeThresholds: number[] = []

    for (let d = 0; d < maxDepth; d++) {
      let bestMSE = Infinity
      let bestSplit = { feature: 0, threshold: 0 }

      for (let f = 0; f < 2; f++) {
        const featureValues = f === 0 ? data.x1 : data.x2
        const uniqueValues = Array.from(new Set(featureValues)).sort((a, b) => a - b)

        for (let threshold of uniqueValues) {
          let mse = 0
          // Simplified: evaluate split on current global residuals
          let leftSum = 0, leftCount = 0
          let rightSum = 0, rightCount = 0

          for (let i = 0; i < n; i++) {
            if (featureValues[i] <= threshold) {
              leftSum += residuals[i]
              leftCount++
            } else {
              rightSum += residuals[i]
              rightCount++
            }
          }

          const leftMean = leftCount > 0 ? leftSum / leftCount : 0
          const rightMean = rightCount > 0 ? rightSum / rightCount : 0

          for (let i = 0; i < n; i++) {
            const pred = featureValues[i] <= threshold ? leftMean : rightMean
            mse += Math.pow(residuals[i] - pred, 2)
          }

          if (mse < bestMSE) {
            bestMSE = mse
            bestSplit = { feature: f, threshold }
          }
        }
      }

      treeFeatures.push(bestSplit.feature)
      treeThresholds.push(bestSplit.threshold)
    }

    const numLeaves = Math.pow(2, maxDepth)
    const leafSums = new Array(numLeaves).fill(0)
    const leafCounts = new Array(numLeaves).fill(0)

    for (let i = 0; i < n; i++) {
      let leafIndex = 0
      for (let d = 0; d < maxDepth; d++) {
        const val = treeFeatures[d] === 0 ? data.x1[i] : data.x2[i]
        if (val > treeThresholds[d]) {
          leafIndex |= (1 << d)
        }
      }
      leafSums[leafIndex] += residuals[i]
      leafCounts[leafIndex]++
    }

    const leafValues = leafSums.map((sum, idx) => leafCounts[idx] > 0 ? sum / leafCounts[idx] : 0)

    return {
      features: treeFeatures,
      thresholds: treeThresholds,
      leafValues
    }
  }

  private predictTree(tree: CatNode, x1: number, x2: number): number {
    let leafIndex = 0
    for (let d = 0; d < tree.features.length; d++) {
      const val = tree.features[d] === 0 ? x1 : x2
      if (val > tree.thresholds[d]) {
        leafIndex |= (1 << d)
      }
    }
    return tree.leafValues[leafIndex]
  }

  public predict(x1: number, x2: number): number {
    const { trees, learningRate } = this.state
    let logOdds = 0
    for (const tree of trees) {
      logOdds += learningRate * this.predictTree(tree, x1, x2)
    }
    return 1 / (1 + Math.exp(-logOdds))
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

  public setParams(params: Partial<CatBoostState>) {
    Object.assign(this.state, params)
    this.train()
  }

  public getState(): CatBoostState {
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
