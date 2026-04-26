// Math utilities
export { calculateMSE, calculateMAE, calculateR2 } from './math'
export { sigmoid, relu } from './math'
export { linearForward, calculateGradientsLinearMSE } from './math'
export { gradientDescentStep } from './math'
export { normalize, standardize, denormalize, unstandardize } from './math'
export { calculateResiduals, calculateCorrelation } from './math'
export {
  binaryCrossEntropy,
  calculateConfusionMatrix,
  calculateAccuracy,
  calculatePrecision,
  calculateRecall,
  calculateF1,
} from './math'
export { softmax } from './math'

// Dataset utilities
export {
  generateLinearDataset,
  generateClassificationDataset,
  generateNonlinearDataset,
  generateDatasetWithOutliers,
} from './datasets'
export {
  shuffle,
  trainTestSplit,
  kFoldSplit,
  zipDataset,
  unzipDataset,
} from './datasets'
export { getBatch, getNumBatches } from './datasets'
export { gaussianRandom } from './datasets'
