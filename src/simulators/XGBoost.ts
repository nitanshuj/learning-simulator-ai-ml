import { ClassificationData } from './LogisticRegression'

interface XGBNode {
  id: number
  feature?: number
  threshold?: number
  left?: XGBNode
  right?: XGBNode
  output?: number // Leaf value
  isLeaf: boolean
}

export interface XGBoostState {
  data: ClassificationData
  nEstimators: number
  learningRate: number
  maxDepth: number
  lambda: number // L2 regularization
  gamma: number // Min loss reduction to split
  trees: XGBNode[]
  accuracy: number
  dataset: string
}

export class XGBoost {
  private state: XGBoostState

  constructor(dataset: string = 'circles', nEstimators: number = 5) {
    const data = this.generateData(dataset, 100)
    this.state = {
      data,
      nEstimators,
      learningRate: 0.3,
      maxDepth: 3,
      lambda: 1.0,
      gamma: 0,
      trees: [],
      accuracy: 0,
      dataset
    }
    this.train()
  }

  public train() {
    const { data, nEstimators, learningRate, maxDepth, lambda, gamma } = this.state
    const n = data.y.length
    const y = data.y
    
    // Initial prediction (log-odds)
    let currentPred = new Array(n).fill(0)
    const trees: XGBNode[] = []

    for (let t = 0; t < nEstimators; t++) {
      // 1. Calculate gradients (g) and hessians (h)
      // For LogLoss: p = sigmoid(pred), g = p - y, h = p * (1 - p)
      const g: number[] = []
      const h: number[] = []
      for (let i = 0; i < n; i++) {
        const p = 1 / (1 + Math.exp(-currentPred[i]))
        g.push(p - y[i])
        h.push(Math.max(p * (1 - p), 1e-6))
      }

      // 2. Build a tree to fit gradients/hessians
      const tree = this.buildTree(data, g, h, 0, maxDepth, lambda, gamma)
      trees.push(tree)

      // 3. Update current predictions
      for (let i = 0; i < n; i++) {
        currentPred[i] += learningRate * this.predictTree(tree, data.x1[i], data.x2[i])
      }
    }

    this.state.trees = trees
    this.state.accuracy = this.calculateAccuracy()
  }

  private buildTree(data: ClassificationData, g: number[], h: number[], depth: number, maxDepth: number, lambda: number, gamma: number): XGBNode {
    const n = g.length
    const sumG = g.reduce((a, b) => a + b, 0)
    const sumH = h.reduce((a, b) => a + b, 0)

    // Stopping criteria
    if (depth >= maxDepth || n < 2) {
      return { id: Math.random(), isLeaf: true, output: -sumG / (sumH + lambda) }
    }

    let bestGain = -Infinity
    let bestSplit = { feature: 0, threshold: 0, leftIndices: [] as number[], rightIndices: [] as number[] }

    const rootSimilarity = Math.pow(sumG, 2) / (sumH + lambda)

    for (let f = 0; f < 2; f++) {
      const featureValues = f === 0 ? data.x1 : data.x2
      const uniqueValues = Array.from(new Set(featureValues)).sort((a, b) => a - b)

      for (let threshold of uniqueValues) {
        const leftIdx: number[] = []
        const rightIdx: number[] = []
        let leftG = 0, leftH = 0
        let rightG = 0, rightH = 0

        for (let i = 0; i < n; i++) {
          if (featureValues[i] <= threshold) {
            leftIdx.push(i)
            leftG += g[i]
            leftH += h[i]
          } else {
            rightIdx.push(i)
            rightG += g[i]
            rightH += h[i]
          }
        }

        if (leftIdx.length === 0 || rightIdx.length === 0) continue

        const leftSim = Math.pow(leftG, 2) / (leftH + lambda)
        const rightSim = Math.pow(rightG, 2) / (rightH + lambda)
        const gain = 0.5 * (leftSim + rightSim - rootSimilarity) - gamma

        if (gain > bestGain) {
          bestGain = gain
          bestSplit = { feature: f, threshold, leftIndices: leftIdx, rightIndices: rightIdx }
        }
      }
    }

    if (bestGain <= 0) {
      return { id: Math.random(), isLeaf: true, output: -sumG / (sumH + lambda) }
    }

    // Recurse
    const leftG = bestSplit.leftIndices.map(i => g[i])
    const leftH = bestSplit.leftIndices.map(i => h[i])
    const leftData = {
      x1: bestSplit.leftIndices.map(i => data.x1[i]),
      x2: bestSplit.leftIndices.map(i => data.x2[i]),
      y: bestSplit.leftIndices.map(i => data.y[i])
    }

    const rightG = bestSplit.rightIndices.map(i => g[i])
    const rightH = bestSplit.rightIndices.map(i => h[i])
    const rightData = {
      x1: bestSplit.rightIndices.map(i => data.x1[i]),
      x2: bestSplit.rightIndices.map(i => data.x2[i]),
      y: bestSplit.rightIndices.map(i => data.y[i])
    }

    return {
      id: Math.random(),
      isLeaf: false,
      feature: bestSplit.feature,
      threshold: bestSplit.threshold,
      left: this.buildTree(leftData, leftG, leftH, depth + 1, maxDepth, lambda, gamma),
      right: this.buildTree(rightData, rightG, rightH, depth + 1, maxDepth, lambda, gamma)
    }
  }

  private predictTree(node: XGBNode, x1: number, x2: number): number {
    if (node.isLeaf) return node.output!
    const val = node.feature === 0 ? x1 : x2
    if (val <= node.threshold!) return this.predictTree(node.left!, x1, x2)
    return this.predictTree(node.right!, x1, x2)
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

  public setParams(params: Partial<XGBoostState>) {
    Object.assign(this.state, params)
    this.train()
  }

  public getState(): XGBoostState {
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
