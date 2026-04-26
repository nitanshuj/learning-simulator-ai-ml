/**
 * Gradient Descent Optimization Simulator
 * 
 * This simulator visualizes the process of gradient descent on various mathematical surfaces (cost functions).
 * It tracks the path taken by the optimizer and demonstrates the impact of learning rate and initial position.
 */

export type CostFunctionType = 'quadratic' | 'bowl' | 'valley' | 'saddle' | 'local_minima'

export interface Point2D {
  x: number
  y: number
  z: number
}

export interface GradientDescentState {
  currentPoint: Point2D
  gradient: { dx: number, dy: number }
  path: Point2D[]
  iterationCount: number
  isConverged: boolean
}

export interface GradientDescentOptions {
  learningRate: number
  initialX: number
  initialY: number
  functionType: CostFunctionType
}

export class GradientDescent {
  private learningRate: number
  private currentX: number
  private currentY: number
  private functionType: CostFunctionType
  private path: Point2D[] = []
  private iterationCount: number = 0
  private tolerance: number = 0.0001
  private isConverged: boolean = false

  constructor(options: GradientDescentOptions) {
    this.learningRate = options.learningRate
    this.currentX = options.initialX
    this.currentY = options.initialY
    this.functionType = options.functionType
    this.reset()
  }

  /**
   * Reset the simulator to initial state
   */
  public reset(initialX?: number, initialY?: number): void {
    if (initialX !== undefined) this.currentX = initialX
    if (initialY !== undefined) this.currentY = initialY
    
    this.iterationCount = 0
    this.isConverged = false
    this.path = [this.getPoint(this.currentX, this.currentY)]
  }

  /**
   * Set the learning rate
   */
  public setLearningRate(lr: number): void {
    this.learningRate = lr
  }

  /**
   * Set the function type
   */
  public setFunctionType(type: CostFunctionType): void {
    this.functionType = type
    this.reset()
  }

  /**
   * Calculate the cost (Z value) for a given (X, Y)
   */
  public calculateCost(x: number, y: number): number {
    switch (this.functionType) {
      case 'quadratic':
        // f(x,y) = x^2 + y^2 (Simple bowl)
        return x * x + y * y
      case 'bowl':
        // f(x,y) = 0.5x^2 + 2y^2 (Elliptical bowl)
        return 0.5 * x * x + 2 * y * y
      case 'valley':
        // f(x,y) = (1-x)^2 + 100(y-x^2)^2 (Rosenbrock - simplified)
        return Math.pow(1 - x, 2) + 10 * Math.pow(y - x * x, 2)
      case 'saddle':
        // f(x,y) = x^2 - y^2
        return x * x - y * y
      case 'local_minima':
        // f(x,y) = x*sin(x) + y*sin(y) (Multiple local minima)
        return x * Math.sin(x) + y * Math.sin(y)
      default:
        return x * x + y * y
    }
  }

  /**
   * Calculate the gradient at current point
   */
  public calculateGradient(x: number, y: number): { dx: number, dy: number } {
    const eps = 0.0001
    // Numerical differentiation
    const dx = (this.calculateCost(x + eps, y) - this.calculateCost(x - eps, y)) / (2 * eps)
    const dy = (this.calculateCost(x, y + eps) - this.calculateCost(x, y - eps)) / (2 * eps)
    return { dx, dy }
  }

  /**
   * Perform a single step of gradient descent
   */
  public step(): GradientDescentState {
    if (this.isConverged) return this.getState()

    const grad = this.calculateGradient(this.currentX, this.currentY)
    
    // Update parameters
    const nextX = this.currentX - this.learningRate * grad.dx
    const nextY = this.currentY - this.learningRate * grad.dy
    
    // Check for convergence
    const delta = Math.sqrt(Math.pow(nextX - this.currentX, 2) + Math.pow(nextY - this.currentY, 2))
    if (delta < this.tolerance) {
      this.isConverged = true
    }

    this.currentX = nextX
    this.currentY = nextY
    this.iterationCount++
    
    // Track path
    this.path.push(this.getPoint(this.currentX, this.currentY))
    
    return this.getState()
  }

  /**
   * Run until convergence or max iterations
   */
  public run(maxIterations: number = 100): GradientDescentState {
    for (let i = 0; i < maxIterations && !this.isConverged; i++) {
      this.step()
    }
    return this.getState()
  }

  /**
   * Get the current state of the simulator
   */
  public getState(): GradientDescentState {
    return {
      currentPoint: this.getPoint(this.currentX, this.currentY),
      gradient: this.calculateGradient(this.currentX, this.currentY),
      path: [...this.path],
      iterationCount: this.iterationCount,
      isConverged: this.isConverged
    }
  }

  private getPoint(x: number, y: number): Point2D {
    return { x, y, z: this.calculateCost(x, y) }
  }
}
