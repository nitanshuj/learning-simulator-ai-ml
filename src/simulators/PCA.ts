
export interface PCAState {
  originalData: number[][];
  projectedData: number[][];
  principalComponents: number[][];
  explainedVariance: number[];
  mean: number[];
}

export class PCA {
  private data: number[][] = [];
  private state: PCAState;

  constructor(initialData: number[][]) {
    this.setData(initialData);
  }

  public setData(data: number[][]) {
    this.data = data;
    this.compute();
  }

  private compute() {
    if (this.data.length === 0) return;

    const numPoints = this.data.length;
    const numFeatures = this.data[0].length;

    // 1. Center the data
    const mean = new Array(numFeatures).fill(0);
    for (const point of this.data) {
      for (let i = 0; i < numFeatures; i++) {
        mean[i] += point[i];
      }
    }
    for (let i = 0; i < numFeatures; i++) mean[i] /= numPoints;

    const centeredData = this.data.map(p => p.map((val, i) => val - mean[i]));

    // 2. Compute Covariance Matrix (assuming 2D for simplicity in visualization)
    // For 2D: [ [var(x), cov(x,y)], [cov(x,y), var(y)] ]
    let varX = 0, varY = 0, covXY = 0;
    for (const p of centeredData) {
      varX += p[0] * p[0];
      varY += p[1] * p[1];
      covXY += p[0] * p[1];
    }
    varX /= (numPoints - 1);
    varY /= (numPoints - 1);
    covXY /= (numPoints - 1);

    // 3. Solve for Eigenvalues of [[varX, covXY], [covXY, varY]]
    // Trace T = varX + varY, Determinant D = varX*varY - covXY^2
    const T = varX + varY;
    const D = varX * varY - covXY * covXY;
    
    const lambda1 = T / 2 + Math.sqrt(T * T / 4 - D);
    const lambda2 = T / 2 - Math.sqrt(T * T / 4 - D);

    // 4. Compute Eigenvectors
    // For eigenvalue L, (varX - L)x + covXY*y = 0  => y = - (varX - L)x / covXY
    // If covXY is 0, axes are just [1,0] and [0,1]
    let v1: number[], v2: number[];
    
    if (Math.abs(covXY) < 1e-10) {
      if (varX >= varY) {
        v1 = [1, 0];
        v2 = [0, 1];
      } else {
        v1 = [0, 1];
        v2 = [1, 0];
      }
    } else {
      // v1
      const slope1 = (lambda1 - varX) / covXY;
      const mag1 = Math.sqrt(1 + slope1 * slope1);
      v1 = [1 / mag1, slope1 / mag1];

      // v2 (orthogonal to v1)
      const slope2 = (lambda2 - varX) / covXY;
      const mag2 = Math.sqrt(1 + slope2 * slope2);
      v2 = [1 / mag2, slope2 / mag2];
    }

    // 5. Projected Data (Project centered data onto PC1 and PC2)
    const projectedData = centeredData.map(p => [
      p[0] * v1[0] + p[1] * v1[1],
      p[0] * v2[0] + p[1] * v2[1]
    ]);

    const totalVar = lambda1 + lambda2;

    this.state = {
      originalData: this.data,
      projectedData,
      principalComponents: [v1, v2],
      explainedVariance: [lambda1 / totalVar, lambda2 / totalVar],
      mean
    };
  }

  public getState(): PCAState {
    return this.state;
  }
}

export function generatePCAData(type: 'correlated' | 'blobs' | 'random', count: number): number[][] {
  const data: number[][] = [];
  for (let i = 0; i < count; i++) {
    let x, y;
    if (type === 'correlated') {
      x = (Math.random() - 0.5) * 10;
      y = x * 0.8 + (Math.random() - 0.5) * 2; // Linear relationship with noise
    } else if (type === 'blobs') {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 5;
      x = Math.cos(angle) * r;
      y = Math.sin(angle) * r * 0.4; // Elliptical blob
    } else {
      x = (Math.random() - 0.5) * 8;
      y = (Math.random() - 0.5) * 8;
    }
    data.push([x, y]);
  }
  return data;
}
