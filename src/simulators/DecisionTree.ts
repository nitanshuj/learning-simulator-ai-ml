
export interface DecisionTreeNode {
  id: string
  featureIndex?: number // 0 for x1, 1 for x2
  threshold?: number
  left?: DecisionTreeNode
  right?: DecisionTreeNode
  prediction?: number
  isLeaf: boolean
  gini: number
  samples: number
  depth: number
}

export interface DecisionTreeParams {
  maxDepth: number
  minSamplesSplit: number
  criterion: 'gini' | 'entropy'
}

export interface DecisionTreeState {
  params: DecisionTreeParams
  tree: DecisionTreeNode | null
  accuracy: number
  iterations: number // Number of nodes
  totalDepth: number
}

export interface ClassificationData {
  x1: number[]
  x2: number[]
  y: number[] // 0 or 1
}

export class DecisionTree {
  private maxDepth: number
  private minSamplesSplit: number
  private criterion: 'gini' | 'entropy'
  private root: DecisionTreeNode | null = null
  private x1: number[] = []
  private x2: number[] = []
  private y: number[] = []

  constructor(params: Partial<DecisionTreeParams> = {}) {
    this.maxDepth = params.maxDepth ?? 5
    this.minSamplesSplit = params.minSamplesSplit ?? 2
    this.criterion = params.criterion ?? 'gini'
  }

  public setData(data: ClassificationData): void {
    this.x1 = data.x1
    this.x2 = data.x2
    this.y = data.y
    this.train()
  }

  public train(): void {
    if (this.x1.length === 0) return
    const indices = Array.from({ length: this.x1.length }, (_, i) => i)
    this.root = this.buildTree(indices, 0)
  }

  private buildTree(indices: number[], depth: number): DecisionTreeNode {
    const samples = indices.length
    const labels = indices.map(i => this.y[i])
    const counts = labels.reduce((acc, l) => {
      acc[l] = (acc[l] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const majorityLabel = Object.entries(counts).reduce((a, b) => b[1] > a[1] ? b : a)[0]
    const gini = this.calculateGini(labels)

    const node: DecisionTreeNode = {
      id: Math.random().toString(36).substr(2, 9),
      gini,
      samples,
      depth,
      isLeaf: true,
      prediction: parseInt(majorityLabel)
    }

    if (depth >= this.maxDepth || samples < this.minSamplesSplit || gini === 0) {
      return node
    }

    const bestSplit = this.findBestSplit(indices)
    if (!bestSplit) return node

    node.isLeaf = false
    node.featureIndex = bestSplit.featureIndex
    node.threshold = bestSplit.threshold
    node.left = this.buildTree(bestSplit.leftIndices, depth + 1)
    node.right = this.buildTree(bestSplit.rightIndices, depth + 1)

    return node
  }

  private findBestSplit(indices: number[]) {
    let bestGini = Infinity
    let bestSplit = null

    for (let featureIndex = 0; featureIndex < 2; featureIndex++) {
      const values = indices.map(i => featureIndex === 0 ? this.x1[i] : this.x2[i])
      const uniqueValues = Array.from(new Set(values)).sort((a, b) => a - b)
      
      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const threshold = (uniqueValues[i] + uniqueValues[i+1]) / 2
        const leftIndices = indices.filter(idx => (featureIndex === 0 ? this.x1[idx] : this.x2[idx]) <= threshold)
        const rightIndices = indices.filter(idx => (featureIndex === 0 ? this.x1[idx] : this.x2[idx]) > threshold)

        if (leftIndices.length === 0 || rightIndices.length === 0) continue

        const leftLabels = leftIndices.map(idx => this.y[idx])
        const rightLabels = rightIndices.map(idx => this.y[idx])

        const weightedGini = (leftLabels.length / indices.length) * this.calculateGini(leftLabels) +
                            (rightLabels.length / indices.length) * this.calculateGini(rightLabels)

        if (weightedGini < bestGini) {
          bestGini = weightedGini
          bestSplit = { featureIndex, threshold, leftIndices, rightIndices }
        }
      }
    }

    return bestSplit
  }

  private calculateGini(labels: number[]): number {
    if (labels.length === 0) return 0
    const counts = labels.reduce((acc, l) => {
      acc[l] = (acc[l] || 0) + 1
      return acc
    }, {} as Record<number, number>)
    
    let sumSq = 0
    for (const count of Object.values(counts)) {
      const p = count / labels.length
      sumSq += p * p
    }
    return 1 - sumSq
  }

  public predict(x1: number, x2: number): number {
    if (!this.root) return 0
    let current = this.root
    while (!current.isLeaf) {
      const val = current.featureIndex === 0 ? x1 : x2
      if (val <= current.threshold!) {
        current = current.left!
      } else {
        current = current.right!
      }
    }
    return current.prediction!
  }

  public evaluate(): number {
    if (this.x1.length === 0) return 0
    let correct = 0
    for (let i = 0; i < this.x1.length; i++) {
      if (this.predict(this.x1[i], this.x2[i]) === this.y[i]) {
        correct++
      }
    }
    return correct / this.x1.length
  }

  public getState(): DecisionTreeState {
    return {
      params: {
        maxDepth: this.maxDepth,
        minSamplesSplit: this.minSamplesSplit,
        criterion: this.criterion
      },
      tree: this.root,
      accuracy: this.evaluate(),
      iterations: this.countNodes(this.root),
      totalDepth: this.calculateTotalDepth(this.root)
    }
  }

  private countNodes(node: DecisionTreeNode | null): number {
    if (!node) return 0
    return 1 + this.countNodes(node.left || null) + this.countNodes(node.right || null)
  }

  private calculateTotalDepth(node: DecisionTreeNode | null): number {
    if (!node || node.isLeaf) return 0
    return 1 + Math.max(
      this.calculateTotalDepth(node.left || null),
      this.calculateTotalDepth(node.right || null)
    )
  }

  public setParams(params: Partial<DecisionTreeParams>): void {
    if (params.maxDepth !== undefined) this.maxDepth = params.maxDepth
    if (params.minSamplesSplit !== undefined) this.minSamplesSplit = params.minSamplesSplit
    if (params.criterion !== undefined) this.criterion = params.criterion
    this.train()
  }
}

/**
 * Data generation utility for multi-class classification
 */
export function generateMultiClassData(
  n: number = 60,
  numClasses: number = 3,
  noise: number = 1.0
): ClassificationData {
  const x1: number[] = []
  const x2: number[] = []
  const y: number[] = []

  const centers = [
    [2.5, 2.5],
    [-2.5, -2.5],
    [2.5, -2.5],
    [-2.5, 2.5],
  ]

  for (let c = 0; c < numClasses; c++) {
    const center = centers[c % centers.length]
    const pointsPerClass = Math.floor(n / numClasses)
    for (let i = 0; i < pointsPerClass; i++) {
      x1.push(center[0] + (Math.random() - 0.5) * 3 * noise)
      x2.push(center[1] + (Math.random() - 0.5) * 3 * noise)
      y.push(c)
    }
  }

  return { x1, x2, y }
}
