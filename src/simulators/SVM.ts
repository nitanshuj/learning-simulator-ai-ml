import { ClassificationData } from './LogisticRegression'

export type SVMKernel = 'linear' | 'rbf' | 'poly'

export interface SVMState {
  data: ClassificationData
  weights: number[] | null // For linear kernel
  bias: number
  alphas: number[] // Dual coefficients for kernel SVM
  supportVectors: number[] // Indices of support vectors
  accuracy: number
  iteration: number
  maxIterations: number
  learningRate: number
  C: number
  kernel: SVMKernel
  gamma: number
  degree: number
  converged: boolean
}

export class SVM {
  private state: SVMState

  constructor(dataset: string = 'linear', kernel: SVMKernel = 'linear', C: number = 1.0) {
    const data = this.generateSVMData(dataset, 100)
    
    this.state = {
      data,
      weights: null,
      bias: 0,
      alphas: new Array(data.y.length).fill(0),
      supportVectors: [],
      accuracy: 0,
      iteration: 0,
      maxIterations: 100,
      learningRate: 0.01,
      C,
      kernel,
      gamma: 0.5,
      degree: 3,
      converged: false
    }

    if (kernel === 'linear') {
      this.state.weights = [0, 0]
    }
  }

  private generateSVMData(type: string, n: number): ClassificationData {
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

  private getKernelValue(i: number, j: number): number {
    const x1 = [this.state.data.x1[i], this.state.data.x2[i]]
    const x2 = [this.state.data.x1[j], this.state.data.x2[j]]
    return this.computeKernel(x1, x2)
  }

  private computeKernel(x1: number[], x2: number[]): number {
    const { gamma, degree } = this.state
    const dot = x1[0] * x2[0] + x1[1] * x2[1]

    if (this.state.kernel === 'linear') return dot
    if (this.state.kernel === 'poly') return Math.pow(dot + 1, degree)
    if (this.state.kernel === 'rbf') {
      const distSq = Math.pow(x1[0] - x2[0], 2) + Math.pow(x1[1] - x2[1], 2)
      return Math.exp(-gamma * distSq)
    }
    return dot
  }

  public step() {
    if (this.state.converged) return this.state

    const { data, alphas, C } = this.state
    const n = data.y.length
    
    // Simplified Sequential Minimal Optimization (SMO) style update
    // We'll do a simple stochastic gradient ascent on the dual objective
    for (let iter = 0; iter < 10; iter++) {
      const i = Math.floor(Math.random() * n)
      
      // Calculate prediction for point i using current alphas
      let prediction = this.state.bias
      for (let j = 0; j < n; j++) {
        if (alphas[j] > 0) {
          const yj = data.y[j] === 0 ? -1 : 1
          prediction += alphas[j] * yj * this.getKernelValue(j, i)
        }
      }

      const yi = data.y[i] === 0 ? -1 : 1
      const gradient = 1 - yi * prediction
      
      // Update alpha_i
      alphas[i] += this.state.learningRate * gradient
      
      // Project alpha back to [0, C]
      if (alphas[i] < 0) alphas[i] = 0
      if (alphas[i] > C) alphas[i] = C

      // Update bias (simplified)
      if (alphas[i] > 0 && alphas[i] < C) {
        this.state.bias += yi - prediction
      }
    }

    this.state.iteration++
    this.updateSupportVectors()
    this.state.accuracy = this.calculateAccuracy()

    if (this.state.iteration >= this.state.maxIterations) {
      this.state.converged = true
    }

    return this.state
  }

  private updateSupportVectors() {
    this.state.supportVectors = []
    for (let i = 0; i < this.state.alphas.length; i++) {
      if (this.state.alphas[i] > 1e-5) {
        this.state.supportVectors.push(i)
      }
    }
  }

  private calculateAccuracy(): number {
    let correct = 0
    for (let i = 0; i < this.state.data.y.length; i++) {
      const pred = this.predict(this.state.data.x1[i], this.state.data.x2[i])
      const actual = this.state.data.y[i]
      if ((pred >= 0.5 ? 1 : 0) === actual) correct++
    }
    return correct / this.state.data.y.length
  }

  public predict(x1: number, x2: number): number {
    const { data, alphas, bias } = this.state
    const x = [x1, x2]
    
    let result = bias
    for (let i = 0; i < data.y.length; i++) {
      if (alphas[i] > 1e-5) {
        const yi = data.y[i] === 0 ? -1 : 1
        result += alphas[i] * yi * this.computeKernel([data.x1[i], data.x2[i]], x)
      }
    }

    // Convert decision function to "probability-like" value for heatmap (0 to 1)
    // Sigmoid is common for this
    return 1 / (1 + Math.exp(-result))
  }

  public getState(): SVMState {
    return { ...this.state, alphas: [...this.state.alphas], supportVectors: [...this.state.supportVectors] }
  }

  public setParams(params: Partial<SVMState>) {
    Object.assign(this.state, params)
    this.reset()
  }

  public reset() {
    this.state.iteration = 0
    this.state.converged = false
    this.state.alphas = new Array(this.state.data.y.length).fill(0)
    this.state.bias = 0
    this.state.supportVectors = []
  }

  public changeDataset(dataset: string) {
    this.state.data = this.generateSVMData(dataset, 100)
    this.reset()
  }
}
