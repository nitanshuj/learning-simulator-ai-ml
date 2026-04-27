
import { DecisionTree, ClassificationData, DecisionTreeParams } from './DecisionTree'

export interface RandomForestParams extends DecisionTreeParams {
  numTrees: number
  bootstrap: boolean
}

export interface RandomForestState {
  params: RandomForestParams
  treeStates: any[] // Summary of each tree?
  accuracy: number
}

export class RandomForest {
  private trees: DecisionTree[] = []
  private params: RandomForestParams
  private data: ClassificationData | null = null

  constructor(params: Partial<RandomForestParams> = {}) {
    this.params = {
      numTrees: params.numTrees ?? 10,
      maxDepth: params.maxDepth ?? 5,
      minSamplesSplit: params.minSamplesSplit ?? 2,
      criterion: params.criterion ?? 'gini',
      bootstrap: params.bootstrap ?? true
    }
  }

  public setData(data: ClassificationData): void {
    this.data = data
    this.train()
  }

  public train(): void {
    if (!this.data) return
    this.trees = []
    
    for (let i = 0; i < this.params.numTrees; i++) {
      const tree = new DecisionTree({
        maxDepth: this.params.maxDepth,
        minSamplesSplit: this.params.minSamplesSplit,
        criterion: this.params.criterion
      })

      const sampledData = this.params.bootstrap 
        ? this.bootstrapData(this.data)
        : this.data

      tree.setData(sampledData)
      this.trees.push(tree)
    }
  }

  private bootstrapData(data: ClassificationData): ClassificationData {
    const n = data.x1.length
    const x1: number[] = []
    const x2: number[] = []
    const y: number[] = []

    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * n)
      x1.push(data.x1[idx])
      x2.push(data.x2[idx])
      y.push(data.y[idx])
    }

    return { x1, x2, y }
  }

  public predict(x1: number, x2: number): number {
    if (this.trees.length === 0) return 0
    const votes: Record<number, number> = {}
    
    this.trees.forEach(tree => {
      const p = tree.predict(x1, x2)
      votes[p] = (votes[p] || 0) + 1
    })

    return Object.entries(votes).reduce((a, b) => b[1] > a[1] ? b : a)[0] as unknown as number
  }

  public evaluate(): number {
    if (!this.data) return 0
    let correct = 0
    for (let i = 0; i < this.data.x1.length; i++) {
      if (Number(this.predict(this.data.x1[i], this.data.x2[i])) === this.data.y[i]) {
        correct++
      }
    }
    return correct / this.data.x1.length
  }

  public getState(): RandomForestState {
    return {
      params: this.params,
      treeStates: this.trees.map(t => t.getState()),
      accuracy: this.evaluate()
    }
  }

  public setParams(params: Partial<RandomForestParams>): void {
    this.params = { ...this.params, ...params }
    this.train()
  }
}
