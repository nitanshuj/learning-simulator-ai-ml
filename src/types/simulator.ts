export interface SimulatorState {
  currentModule: string;
  params: Record<string, number>;
  dataset: {
    X: number[][];
    y: number[];
  };
  results: {
    predictions: number[];
    loss: number;
    gradients?: Record<string, number>;
    iterations?: number;
    accuracy?: number;
  };
  isRunning: boolean;
  history: SimulationSnapshot[];
}

export interface SimulationSnapshot {
  timestamp: number;
  params: Record<string, number>;
  results: SimulatorState['results'];
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  lessonId: string;
  params: Record<string, number>;
  expectedBehavior: string;
  tags: string[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  lessonId: string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  explanation: string;
  keyPoints: string[];
  controls: LessonControl[];
  presets: Preset[];
  quiz: Quiz;
}

export interface LessonControl {
  id: string;
  label: string;
  type: 'slider' | 'button' | 'dropdown' | 'number';
  min?: number;
  max?: number;
  step?: number;
  default: number | string;
  description: string;
  unit?: string;
}

export interface SimulatorConfig {
  id: string;
  name: string;
  description: string;
  version: string;
}

export interface UserProgress {
  userId: string;
  lessonsCompleted: string[];
  lessonsInProgress: string[];
  quizScores: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}
