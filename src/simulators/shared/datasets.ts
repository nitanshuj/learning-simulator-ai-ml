/**
 * Generate synthetic regression dataset
 * y = slope * x + intercept + noise
 */
export const generateLinearDataset = (
  numPoints: number = 50,
  slope: number = 2,
  intercept: number = 1,
  noiseStd: number = 1,
  xMin: number = -5,
  xMax: number = 5,
): { x: number[]; y: number[] } => {
  const x: number[] = []
  const y: number[] = []

  for (let i = 0; i < numPoints; i++) {
    // Generate random x in range
    const xi = Math.random() * (xMax - xMin) + xMin
    // Add noise
    const noise = gaussianRandom() * noiseStd
    const yi = slope * xi + intercept + noise

    x.push(xi)
    y.push(yi)
  }

  return { x, y }
}

/**
 * Generate synthetic classification dataset (two clusters)
 */
export const generateClassificationDataset = (
  numPoints: number = 100,
  separation: number = 2,
  noise: number = 0.5,
): { x: Array<[number, number]>; y: number[] } => {
  const x: Array<[number, number]> = []
  const y: number[] = []

  // Generate class 0 cluster
  for (let i = 0; i < numPoints / 2; i++) {
    const xi = gaussianRandom() * noise - separation
    const yi = gaussianRandom() * noise
    x.push([xi, yi])
    y.push(0)
  }

  // Generate class 1 cluster
  for (let i = 0; i < numPoints / 2; i++) {
    const xi = gaussianRandom() * noise + separation
    const yi = gaussianRandom() * noise
    x.push([xi, yi])
    y.push(1)
  }

  return { x, y }
}

/**
 * Generate non-linear dataset (e.g., polynomial)
 */
export const generateNonlinearDataset = (
  numPoints: number = 50,
  degree: number = 2,
  noiseStd: number = 0.5,
  xMin: number = -2,
  xMax: number = 2,
): { x: number[]; y: number[] } => {
  const x: number[] = []
  const y: number[] = []

  for (let i = 0; i < numPoints; i++) {
    const xi = Math.random() * (xMax - xMin) + xMin

    // Calculate y based on polynomial
    let yi = 0
    for (let d = 0; d <= degree; d++) {
      yi += Math.pow(xi, d)
    }

    // Add noise
    const noise = gaussianRandom() * noiseStd
    yi += noise

    x.push(xi)
    y.push(yi)
  }

  return { x, y }
}

/**
 * Generate dataset with outliers
 */
export const generateDatasetWithOutliers = (
  numPoints: number = 50,
  slope: number = 2,
  intercept: number = 1,
  noiseStd: number = 0.5,
  outlierRatio: number = 0.1,
  outlierMagnitude: number = 5,
  xMin: number = -5,
  xMax: number = 5,
): { x: number[]; y: number[] } => {
  const x: number[] = []
  const y: number[] = []
  const numOutliers = Math.floor(numPoints * outlierRatio)

  for (let i = 0; i < numPoints; i++) {
    const xi = Math.random() * (xMax - xMin) + xMin

    let yi: number
    if (i < numOutliers) {
      // Generate outlier
      yi = gaussianRandom() * outlierMagnitude + (slope * xi + intercept)
    } else {
      // Generate normal point
      const noise = gaussianRandom() * noiseStd
      yi = slope * xi + intercept + noise
    }

    x.push(xi)
    y.push(yi)
  }

  return { x, y }
}

/**
 * Box-Muller transform for Gaussian random sampling
 */
export const gaussianRandom = (mean: number = 0, std: number = 1): number => {
  let u1 = 0,
    u2 = 0
  while (u1 === 0) u1 = Math.random() // Converting [0,1) to (0,1)
  while (u2 === 0) u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
  return z0 * std + mean
}

/**
 * Shuffle array in place (Fisher-Yates)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Split dataset into train/test
 */
export const trainTestSplit = <T>(
  data: T[],
  testRatio: number = 0.2,
): { train: T[]; test: T[] } => {
  const shuffled = shuffle(data)
  const splitIndex = Math.floor(shuffled.length * (1 - testRatio))

  return {
    train: shuffled.slice(0, splitIndex),
    test: shuffled.slice(splitIndex),
  }
}

/**
 * Generate K-fold splits for cross-validation
 */
export const kFoldSplit = <T>(data: T[], k: number = 5): Array<{ train: T[]; test: T[] }> => {
  const shuffled = shuffle(data)
  const foldSize = Math.floor(shuffled.length / k)
  const folds: Array<{ train: T[]; test: T[] }> = []

  for (let i = 0; i < k; i++) {
    const testStart = i * foldSize
    const testEnd = i === k - 1 ? shuffled.length : (i + 1) * foldSize

    const test = shuffled.slice(testStart, testEnd)
    const train = [...shuffled.slice(0, testStart), ...shuffled.slice(testEnd)]

    folds.push({ train, test })
  }

  return folds
}

/**
 * Combine x and y into paired dataset
 */
export const zipDataset = (x: number[], y: number[]): Array<[number, number]> => {
  if (x.length !== y.length) {
    throw new Error('x and y must have the same length')
  }
  return x.map((xi, i) => [xi, y[i]])
}

/**
 * Unzip paired dataset
 */
export const unzipDataset = (data: Array<[number, number]>): { x: number[]; y: number[] } => {
  return {
    x: data.map((d) => d[0]),
    y: data.map((d) => d[1]),
  }
}

/**
 * Get batch from dataset
 */
export const getBatch = <T>(
  data: T[],
  batchIndex: number,
  batchSize: number,
): T[] => {
  const start = batchIndex * batchSize
  const end = Math.min(start + batchSize, data.length)
  return data.slice(start, end)
}

/**
 * Get number of batches
 */
export const getNumBatches = (dataSize: number, batchSize: number): number => {
  return Math.ceil(dataSize / batchSize)
}
