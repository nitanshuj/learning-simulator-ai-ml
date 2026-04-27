import { ClassificationData } from '../LogisticRegression';

export interface BoostingState {
  data: ClassificationData;
  nEstimators: number;
  learningRate: number;
  maxDepth: number;
  accuracy: number;
  dataset: string;
}
