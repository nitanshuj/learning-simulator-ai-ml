# Learning Simulator for ML/DL: Technical Planning Document

**Status:** Planning Phase  
**Version:** 1.0  
**Author:** Technical Planning  
**Date:** April 2026  

---

## Table of Contents

1. [Product Definition](#1-product-definition)
2. [Scope Recommendation](#2-scope-recommendation)
3. [Core Modules](#3-core-modules)
4. [Architecture Recommendation](#4-architecture-recommendation)
5. [UX Structure](#5-ux-structure)
6. [Data and Content Model](#6-data-and-content-model)
7. [Engineering Plan](#7-engineering-plan)
8. [GitHub Copilot Workflow](#8-github-copilot-workflow)
9. [Project Management Output](#9-project-management-output)
10. [Risk Review](#10-risk-review)
11. [Final Recommendation](#11-final-recommendation)

---

## 1. Product Definition

### Target User Personas

#### Persona 1: **Curious Learner (Post-Secondary)**
- **Profile:** Student or bootcamp graduate learning ML for the first time, wants intuition before implementation.
- **Pain point:** Textbooks and tutorials are too theoretical; can't see *why* gradient descent works.
- **Success criteria:** "I finally understand what's happening under the hood."
- **Device:** Desktop/laptop (not mobile-first).

#### Persona 2: **Career Switcher**
- **Profile:** Professional from non-tech background (finance, marketing, biology) transitioning into ML.
- **Pain point:** Feels lost when reading papers or tutorials; needs visual, hands-on understanding.
- **Success criteria:** "I can explain gradient descent to someone else now."
- **Device:** Desktop/laptop; works through modules during evenings/weekends.

#### Persona 3: **Interview Prep Practitioner**
- **Profile:** Software engineer or data scientist preparing for ML interviews; knows code but needs conceptual clarity.
- **Pain point:** Interview questions ask about decision boundaries, overfitting, regularization—can't just memorize.
- **Success criteria:** Can draw and explain neural network concepts on a whiteboard.
- **Device:** Desktop/laptop; uses simulator as a quick sanity check before coding rounds.

---

### Main Learning Outcomes

By using this simulator, learners will be able to:

1. **Visualize abstract concepts:** Understand gradient descent not as an algorithm, but as a physical optimization process.
2. **Manipulate parameters and observe consequences:** Build intuition through experimentation (e.g., "What happens if I increase learning rate?").
3. **Connect theory and code:** See how sklearn/PyTorch parameters map to visual behavior.
4. **Reason about trade-offs:** Understand overfitting vs underfitting, model complexity vs generalization, regularization effects.
5. **Predict model behavior:** Given a dataset and hyperparameters, mentally simulate what will happen.

---

### What Makes This Simulator Unique vs. Traditional Resources

| Aspect | Traditional Tutorials | This Simulator |
|--------|----------------------|-----------------|
| **Interactivity** | Read, maybe watch a video | Change 5 parameters, see results in 200ms |
| **Feedback speed** | Hours (implement code, run notebook) | Instant visual feedback |
| **Confidence** | "I think I understand" | "I watched it happen 10 times, I understand" |
| **Entry point** | Need to code first | Understand first, then code |
| **Retention** | Passive reading | Active experimentation |
| **Scope** | Often 1 topic per tutorial | 8-10 interconnected concepts in one app |

**Key differentiation:** The simulator bridges the gap between pure math and hands-on code. It's *before* you write a neural network, not after.

---

### Product Positioning

**Focus: The "Interactive Textbook"**

- **Tagline:** *"ML concepts you can see and touch before writing code."*
- **Positioning:** For learners who want intuition before diving into frameworks.
- **Entry point:** "Confused by gradient descent? Visualize it here."
- **Core value:** Hands-on experimentation → intuition → confidence → code readiness

**Future variants** (after MVP success):
- Interview Prep Tool (whiteboard-ready intuition)
- Hands-On Lab for Educators (classroom integration)
- See [future-implementations.md](future-implementations.md) for details.

---

## 2. Scope Recommendation

### MVP (Minimum Viable Product)

**Goal:** Prove the simulator concept works, deliver real learning value, fit in 6–8 weeks of solo dev.

#### MVP Includes:
1. **2–3 core modules:**
   - Linear Regression (foundational)
   - Gradient Descent (core optimization concept)
   - Logistic Regression + Decision Boundary (supervision + classification)

2. **UI/UX scaffold:**
   - Lesson card → simulator view → controls → visualization
   - Real-time parameter updates
   - Before/after state comparison
   - Reset/preset buttons

3. **Core platform:**
   - React frontend (no backend for MVP)
   - Browser-based computation (TensorFlow.js)
   - Config-driven module structure
   - Mobile-responsive design (basic)

4. **Educational content:**
   - 50–100 words of explanation per concept
   - Guided exploration (suggested parameter ranges)
   - Visual hints ("What changes when you move this slider?")

5. **State management:**
   - Per-module state (dataset, params, results)
   - No persistence (MVP)

#### MVP Excludes:
- User accounts / authentication
- Backend storage
- Progress tracking
- Quiz/assessment
- Advanced modules (CNN, backprop visualization, embeddings)
- Real datasets (synthetic data only)
- Mobile-first design (desktop optimized)
- Export/sharing features

---

### Future Phases (See [future-implementations.md](future-implementations.md))

V2, V3, and post-launch features are documented separately to keep MVP scope focused.

---

### What We Exclude from MVP and Why

| Feature | Why It's Excluded | When to Add |
|---------|-------------------|------------|
| User authentication | Adds DB setup, security burden, not needed to prove learning value | V2 if user base demands persistence |
| Real datasets | Synthetic data teaches the same concepts; real data adds UI complexity | V2 for relevance |
| Complex visualizations | 3D plots, animations require 2–3 extra weeks; 2D is sufficient | V2 polish |
| Mobile optimization | Desktop-first allows focus; responsive basics OK | V2 or app store release |
| Backend | TensorFlow.js handles MVP math; server adds deployment overhead | Only if computation exceeds browser limits |
| Quiz system | Tempting, but doesn't drive core learning value; add after modules are solid | V2 |
| Export/reporting | Nice-to-have; focus on experimentation first | Later |

---

## 3. Core Modules

### Module 1: Linear Regression (MVP)

**Concept taught:**  
How a line fits data via optimization; relationship between prediction, error, and parameters.

**Learner can manipulate:**
- Slope and intercept (manual dragging)
- Dataset scatter (add/remove points by clicking)
- Loss function type (MSE, MAE) for comparison
- Zoom/pan on the plot

**Visual outputs:**
- 2D scatter plot with fitted line
- Real-time loss (total error) in a number box
- Residuals shown as vertical lines from points to line (optional)
- Color gradient: green (low loss) → red (high loss)

**Learning outcome:**
After this module, learner should be able to:
- Explain why we adjust slope/intercept
- See that loss decreases toward a minimum
- Understand what "best fit" means visually
- Predict which line would have lower error on a new point

**Interaction pattern:**
1. Learner sees a random scatter plot
2. Controlled prompt: "Drag the line to minimize loss"
3. Learner manually fits the line
4. Show the optimal line and let them compare

---

### Module 2: Gradient Descent (MVP)

**Concept taught:**  
Iterative optimization: how small steps in the direction of negative gradient lead to a minimum.

**Learner can manipulate:**
- Learning rate (slider: 0.001 → 1.0)
- Start point (initial slope/intercept)
- Data distribution (change dataset)
- Step count (run N iterations or step-by-step)
- Pause/resume and inspect

**Visual outputs:**
- 2D loss landscape (contour plot or 3D surface)
- Animated path of descent (breadcrumb trail)
- Current parameters and loss value
- Gradient vector at current point (arrow showing direction)
- Iteration counter

**Learning outcome:**
After this module, learner should be able to:
- Explain why learning rate matters (too high → overshoot; too low → slow)
- Understand why steps are taken toward lower loss
- Predict behavior for different learning rates
- See convergence vs oscillation visually

**Interaction pattern:**
1. Show loss landscape and current position
2. Let learner pick learning rate and initial point
3. Run descent (animated steps)
4. Compare results for different learning rates side-by-side

---

### Module 3: Logistic Regression & Decision Boundary (MVP)

**Concept taught:**  
Binary classification: how linear decision boundaries separate classes; sigmoid function.

**Learner can manipulate:**
- Dataset: move class clusters by dragging
- Model complexity: add polynomial features (degree 0, 1, 2, 3)
- Decision threshold (0–1 slider)
- Regularization strength (for sneak preview of overfitting)

**Visual outputs:**
- 2D scatter plot (blue vs orange dots)
- Decision boundary line or curve
- Confidence heatmap (background color = predicted probability)
- Accuracy/AUC score in real-time
- Misclassified points highlighted in red

**Learning outcome:**
After this module, learner should be able to:
- Understand classification as probability prediction
- See why linear boundaries fail on non-linear data
- Predict what happens when you change feature complexity
- Know that higher threshold = fewer positive predictions

**Interaction pattern:**
1. Show two overlapping clusters
2. Learner adjusts model complexity, watches boundary reshape
3. Learner changes class positions and sees boundary adapt
4. Compare accuracy across configurations

---

**Post-MVP Modules:** See [future-implementations.md](future-implementations.md) for Neural Networks, Backpropagation, CNN, Embeddings, GANs, and other advanced topics.

## 4. Architecture Recommendation

### Stack Comparison: Three Options

| Criterion | React + TF.js | React + Python/FastAPI | Streamlit |
|-----------|--------------|----------------------|-----------|
| **Setup time** | Fast (1 day) | Medium (2-3 days) | Very fast (2 hours) |
| **Performance (browser)** | Excellent | Good (API latency) | N/A (server-side) |
| **Complexity (solo)** | Medium | High (2 separate servers) | Low |
| **Customization (UI/UX)** | Full control | Full control | Limited (built-in components) |
| **Deployment** | Static hosting (free) | App server + DB (paid) | Streamlit Cloud (free tier) |
| **Educational clarity** | Explicit data flow | Implicit (hidden backend) | Hidden magic |
| **Learner setup** | Just a browser | Browser + interpreter | Browser only |
| **Scaling** | Limited to browser computation | Unlimited | Server-bound |
| **Reusability** | Components → other projects | Python → ML courses | Streamlit-only |

---

### **Chosen Stack: React + TensorFlow.js**

**Rationale:**
1. **Fast to prototype:** React is well-known and TF.js has good linear algebra/ML support.
2. **No backend complexity:** All computation happens in the browser; no server setup, DB, or deployment hassle.
3. **Educational clarity:** Learners see exactly how data flows; no hidden "magic backend."
4. **Instant feedback:** No API latency; parameter changes = immediate visual updates (200ms).
5. **Solo-friendly:** One tech stack, one environment, one deployment target.
6. **Scalable to MVP:** TF.js can handle 2D plotting, linear algebra, and backprop for 2-3 layer networks.
7. **Reusable:** Components can be extracted into npm packages; patterns apply to other projects.

**Limitation:** Advanced compute (high-res images, large networks) would require a backend later. For MVP modules (linear regression, gradient descent, logistic regression, basic networks), TF.js is plenty.

---

### Architecture Detail

#### Frontend Responsibilities:

**React Components:**
- Lesson card & navigation
- Simulator container (layout)
- Parameter controls (sliders, buttons, dropdowns)
- Visualization (Canvas/SVG rendering or Plotly.js)
- State management (component-level, maybe Redux for complexity)

**Data flow in React:**
```
User adjusts slider
  ↓
onChange handler updates React state
  ↓
Re-render with new state
  ↓
Simulator engine (TF.js) runs with new params
  ↓
Output (loss, predictions) fed back to visualization
  ↓
UI reflects new result
```

---

#### Backend Responsibilities:

**MVP: No backend.**
- All computation in browser (TF.js).
- Lesson content (JSON) served as static files or bundled.

**V2+ potential backend (not MVP):**
- User accounts / authentication
- Progress tracking / quiz results
- Serve real datasets (CSV upload)
- Preset experiments (shared templates)
- Analytics (which modules are popular?)

**Assumption:** Backend will be optional; simulator should work standalone.

---

#### What Runs in the Browser:

- All parameter sliders and UI controls
- Data generation (synthetic random datasets)
- Linear algebra (matrix ops via TF.js)
- Training (gradient descent iterations)
- Visualization (2D plots, heatmaps)
- State management (current module, parameters, results)

---

#### What Runs on Server (Optional, V2+):

- Authentication
- User progress persistence
- Real dataset serving
- Quiz grading (optional, can be client-side)

---

#### Folder Structure:

```
learning-simulator-ai-ml/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LessonCard.tsx
│   │   ├── SimulatorView.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── Visualization.tsx
│   │   ├── VisualizationCanvas.tsx
│   │   └── Presets.tsx
│   ├── simulators/
│   │   ├── index.ts (exports all simulators)
│   │   ├── LinearRegression.ts
│   │   ├── GradientDescent.ts
│   │   ├── LogisticRegression.ts
│   │   ├── NeuralNetworkBasics.ts
│   │   └── shared/
│   │       ├── types.ts (interfaces)
│   │       ├── utils.ts (common functions)
│   │       └── datasets.ts (data generation)
│   ├── hooks/
│   │   ├── useSimulator.ts
│   │   └── useVisualization.ts
│   ├── lessons/
│   │   ├── index.ts (all lesson configs)
│   │   ├── linear-regression.json
│   │   ├── gradient-descent.json
│   │   └── ...
│   ├── App.tsx
│   ├── index.tsx
│   └── styles/
│       ├── global.css
│       └── components.css
├── package.json
├── tsconfig.json
└── README.md
```

---

#### State Management:

**Option A (recommended for MVP): Context API + React hooks**
- Simple, no external dependencies
- Per-module state hook: `useSimulator(moduleName)`
- Avoids Redux complexity

**Option B (if complexity grows): Redux Toolkit**
- Central store for multi-module state
- Add later if needed

**MVP State shape:**
```typescript
interface SimulatorState {
  currentModule: string; // "linear-regression" | "gradient-descent" | ...
  params: Record<string, number>; // { slope: 1.5, intercept: 0.2, learningRate: 0.01 }
  dataset: Dataset;
  results: SimulationResults;
  isRunning: boolean;
  history: SimulationSnapshot[]; // for undo, replay
}

interface Dataset {
  X: number[][];
  y: number[];
}

interface SimulationResults {
  predictions: number[];
  loss: number;
  iterations?: number;
}
```

---

#### Data Flow Between UI, Simulator Engine, and Visualization:

```
┌──────────────────────────────────────────────────────────┐
│                     React Component                       │
├──────────────────────────────────────────────────────────┤
│  State: params = { slope: 1.5, lr: 0.01, data: [...] }  │
│                                                            │
│  onChange (slider)                                        │
│    ↓                                                       │
│  setState({ slope: 2.0 })                                 │
│    ↓                                                       │
│  Call simulator.run(params)                               │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│              Simulator Engine (TF.js)                     │
├──────────────────────────────────────────────────────────┤
│  Input: params + dataset                                 │
│  Computation: linear algebra, forward pass, loss calc    │
│  Output: { predictions, loss, gradients, ... }           │
└──────────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────────┐
│          Visualization (Canvas / SVG / Plotly)           │
├──────────────────────────────────────────────────────────┤
│  Input: { X, y, predictions, loss, ... }                │
│  Render: scatter plot, line, loss curve                  │
│  Output: HTML canvas or SVG                              │
└──────────────────────────────────────────────────────────┘
```

---

### Technology Choices

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend framework** | React 18+ | TSX, hooks, component reuse |
| **Language** | TypeScript | Type safety, self-documenting |
| **Math/ML** | TensorFlow.js | Matrices, backprop, linear algebra |
| **Visualization** | Plotly.js (React wrapper) or D3.js | Interactive 2D plots, clean API |
| **State** | React Context + hooks (MVP) | No extra deps, scales OK |
| **Build tool** | Vite | Fast, modern, standard |
| **Styling** | Tailwind CSS | Utility-first, clean design system |
| **Testing** | Vitest + React Testing Library | Unit + component tests |
| **Package manager** | pnpm | Fast, space-efficient |
| **Hosting** | Vercel or Netlify | Free tier, auto-deploy from Git |

---

## 5. UX Structure

### App Navigation and Main Pages

```
Landing / Home
  ├── Hero (what is this?)
  ├── Featured module carousel
  └── "Get started" → Lessons

Lessons Index
  ├── Grid of lesson cards
  │   ├── Icon + title + description
  │   ├── "Estimated time: 5 min"
  │   └── Click to enter
  └── Filter by topic (linear models, neural networks, etc.)

Simulator Page (e.g., /simulator/linear-regression)
  ├── Header: breadcrumb + lesson title
  ├── Main layout:
  │   ├── Left panel (40%): Explanation + Controls
  │   └── Right panel (60%): Visualization + Results
  ├── Footer: Previous / Next lesson, Quiz button
  └── Mobile: Stack vertically (explanation, then viz)

Quiz Page
  ├── 3–5 multiple choice questions per concept
  └── Feedback on right/wrong answers

Results / Progress Page (V2+)
  └── Which concepts mastered, which need review
```

---

### Simulator Layout

**Desktop (recommended for MVP):**

```
┌─────────────────────────────────────────────────────────┐
│ Learning Simulator / Linear Regression                  │
├─────────────────────────────────────────────────────────┤
│  Lesson Card (Left 40%)  │   Visualization (Right 60%)  │
│  ┌───────────────────┐   │  ┌──────────────────────────┐│
│  │ Explaining Linear │   │  │   2D Scatter + Line      ││
│  │ Regression:       │   │  │                          ││
│  │ • What is it?     │   │  │   Loss: 0.234            ││
│  │ • When to use?    │   │  │   MSE Button             ││
│  │                   │   │  │                          ││
│  │ Controls:         │   │  └──────────────────────────┘│
│  │ □ Slope [====|]   │   │                               │
│  │ □ Intercept [==|] │   │                               │
│  │ □ Reset  [Button] │   │                               │
│  │                   │   │                               │
│  │ Presets:          │   │                               │
│  │ [Good fit] [Poor] │   │                               │
│  └───────────────────┘   │                               │
└─────────────────────────────────────────────────────────┘
```

**Mobile (basic responsive, not primary):**

```
┌──────────────────────┐
│ Linear Regression    │
├──────────────────────┤
│ [Explanation card]   │
├──────────────────────┤
│ □ Slope [====|]      │
│ □ Intercept [==|]    │
├──────────────────────┤
│ [Visualization]      │
│ Loss: 0.234          │
├──────────────────────┤
│ [Pre] [Quiz] [Next]  │
└──────────────────────┘
```

---

### Lesson + Experiment + Quiz Flow

**Step 1: Explanation (1 min)**
- What is the concept?
- Why does it matter?
- What will you do?

**Step 2: Guided Exploration (3 min)**
- Preset scenario or data
- Suggested first action ("Try dragging the slope slider")
- Constraints to keep focus

**Step 3: Free Experimentation (2 min)**
- Presets removed or optional
- Learner changes parameters freely
- Instant visual feedback

**Step 4: Quiz/Reflection (1 min)**
- 3 multiple choice questions
- Questions test the intuition (not code)
- "What happens when...?" framing

**Example: Gradient Descent Module**
```
Screen 1: Explanation
  "Gradient descent is like sliding down a hill.
   Each step is downhill. The size of each step is the learning rate.
   Let's watch it."

Screen 2: Guided Exploration
  "Start with learning rate = 0.1. 
   Click 'Run 10 iterations'. Watch the breadcrumb trail.
   Where does it stop?"

Screen 3: Free Experimentation
  "Now try learning rate = 0.01 and 1.0. 
   What's different? Which converges? Which oscillates?"

Screen 4: Quiz
  Q: "What happens with a very large learning rate?"
  A) Converges quickly
  B) Oscillates around the minimum
  C) Never converges
  D) No change
  [Correct: B. Explanation: "Large steps mean we can overshoot the minimum."]
```

---

### Content + Controls + Visualization Integration

**Key principle:** Everything visible at once, minimal scrolling.

**Layout rules:**
1. Explanation (100–150 words max, bullet points)
2. Control labels are self-explanatory (e.g., "Learning Rate: 0.01")
3. Sliders have units and min/max visible
4. Buttons are large and clear (CTA button style)
5. Visualization shows before/after state side-by-side for "Presets" feature
6. Results (loss, accuracy) are bold and high-contrast

**Example control design:**

```
Learning Rate
[████|─────────] 0.01
Min: 0.001     Max: 1.0
ⓘ "Higher = bigger steps. Too high? You'll oscillate."

[Run 10 Iterations] [Reset] [Load Preset: Classic Example]
```

---

### Before/After Comparison

**Option 1: Side-by-side snapshots**
```
Before                After
[plot 1]              [plot 2]
Loss: 2.3       →     Loss: 0.8
```

**Option 2: Animation**
```
One plot, animated shift from before to after with transition.
```

**MVP approach:** Option 1 (simpler, easier to understand).

---

### Educational vs. Technical Feel

**Visual design decisions to keep it educational:**

| Choice | Why |
|--------|-----|
| **Soft colors** | Calm, not intimidating. Blues/greens rather than neon. |
| **Large fonts** | Easy to read; not cramped. |
| **Ample whitespace** | Not overwhelming. Breathe. |
| **Emojis or icons** | "📊 Visualization", "⚙️ Parameters"—humanizes tech. |
| **Progress indicator** | "1 / 8 concepts mastered"—motivates. |
| **Call-to-action buttons** | "Try dragging", "Experiment now"—prompt action, not exploration. |
| **Tooltips on hover** | Explain what each control does. |
| **Color coding** | Green = good, red = bad, yellow = caution. Learners intuitively understand. |
| **Jargon minimization** | "Line of best fit" not "ordinary least squares estimation." |

---

## 6. Data and Content Model

### Lesson Configuration

```typescript
// lessons/linear-regression.json
{
  "id": "linear-regression",
  "title": "Linear Regression",
  "description": "Fit a line to data.",
  "estimatedTime": "5 min",
  "topic": "linear-models",
  "order": 1,
  
  "explanation": {
    "headline": "Find the Best-Fit Line",
    "body": "Linear regression finds a line that minimizes prediction error. We adjust slope and intercept to reduce loss.",
    "keyPoints": [
      "Error is the vertical distance between data points and the line.",
      "We want to minimize total error (loss).",
      "The 'best-fit' line is the one with the lowest loss."
    ]
  },

  "simulator": {
    "type": "linear-regression",
    "initialData": {
      "dataPoints": 20,
      "spread": 0.8,
      "noise": 0.1,
      "seed": "demo-1"
    }
  },

  "controls": [
    {
      "id": "slope",
      "label": "Slope",
      "type": "slider",
      "min": -2,
      "max": 2,
      "step": 0.01,
      "default": 1.0,
      "description": "Steepness of the line"
    },
    {
      "id": "intercept",
      "label": "Intercept",
      "type": "slider",
      "min": -3,
      "max": 3,
      "step": 0.01,
      "default": 0.5,
      "description": "Y value when X is 0"
    }
  ],

  "presets": [
    {
      "name": "Good Fit",
      "params": { "slope": 1.5, "intercept": 0.2 }
    },
    {
      "name": "Poor Fit",
      "params": { "slope": 0.1, "intercept": 2.0 }
    }
  ],

  "quiz": [
    {
      "question": "What does 'loss' measure?",
      "options": [
        "Total prediction error",
        "Number of data points",
        "Slope of the line",
        "Intercept value"
      ],
      "correct": 0,
      "explanation": "Loss is the sum of squared errors; it tells us how far predictions are from actual data."
    }
  ]
}
```

---

### Simulator Configuration & State

```typescript
// simulators/types.ts

interface SimulatorConfig {
  id: string;
  type: "linear-regression" | "gradient-descent" | "logistic-regression" | ...;
  defaultParams: Record<string, number>;
  constraints?: {
    min?: Record<string, number>;
    max?: Record<string, number>;
    locked?: string[]; // params user can't change in MVP
  };
}

interface SimulatorState {
  params: Record<string, number>;
  dataset: {
    X: number[][];
    y: number[];
    Xtest?: number[][];
    ytest?: number[];
  };
  results: {
    predictions: number[];
    loss: number;
    accuracy?: number;
    gradients?: Record<string, number>;
    iteration?: number;
  };
  history: SimulatorSnapshot[];
  isRunning: boolean;
}

interface SimulatorSnapshot {
  timestamp: number;
  params: Record<string, number>;
  results: any;
}
```

---

### Quiz Data Structure

```typescript
interface Quiz {
  lessonId: string;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  type: "multiple-choice" | "numeric" | "free-text";
  options?: string[]; // for multiple-choice
  correct: number | string; // index or value
  explanation: string; // post-answer feedback
  difficulty: "easy" | "medium" | "hard";
}
```

---

### User Progress (V2+)

```typescript
interface UserProgress {
  userId: string;
  completedLessons: string[];
  quizResults: {
    lessonId: string;
    score: number; // 0-1
    timestamp: number;
    attempts: number;
  }[];
  lastActive: number;
  notes?: string; // learner's own notes per lesson
}
```

---

### Preset Experiments

```typescript
interface Preset {
  id: string;
  name: string;
  description: string;
  lessonId: string;
  params: Record<string, number>;
  expectedBehavior: string; // what learner should observe
  tags: string[]; // "edge-case", "common-mistake", "optimal"
}
```

---

### Example JSON Configs

**Preset for Gradient Descent:**
```json
{
  "id": "gd-high-lr",
  "name": "Learning Rate Too High",
  "lessonId": "gradient-descent",
  "params": {
    "learningRate": 1.0,
    "initialSlope": -2,
    "initialIntercept": 1
  },
  "expectedBehavior": "The path oscillates around the optimum without converging.",
  "tags": ["common-mistake", "oscillation"]
}
```

---

## 7. Step-by-Step Implementation Plan

**Approach:** Linear, task-based progression. Each step builds on the previous; no parallelization except where noted.

---

### Step 1: Project Initialization & Setup

**Goal:** Working development environment with scaffolding in place.

**Tasks:**
- [ ] Create Vite + React + TypeScript project
- [ ] Install TensorFlow.js, Tailwind CSS, Plotly.js
- [ ] Configure TypeScript (strict mode)
- [ ] Set up ESLint + Prettier
- [ ] Initialize Git repo + GitHub (optional: GitHub Actions)
- [ ] Create design token file (colors, spacing, fonts)
- [ ] Create README with setup instructions

**Deliverables:**
- `npm run dev` launches development server
- `npm run build` produces bundle
- `npm run test` runs (empty test suite OK)
- Git initialized with initial commit

**Estimated effort:** 3–4 hours  
**Definition of Done:** Project runs locally with zero errors.

---

### Step 2: Build Base Components & Layout

**Goal:** Reusable UI components and core layout patterns.

**Tasks:**
- [ ] Create `<Button />`, `<Slider />`, `<Card />` components
- [ ] Create `<SimulatorView />` layout (left panel 40%, right panel 60%)
- [ ] Create `<LessonCard />` component
- [ ] Create `<ControlPanel />` component
- [ ] Create `<Visualization />` wrapper (placeholder for plots)
- [ ] Create TypeScript interfaces for simulator state
- [ ] Set up Storybook or component showcase page

**Deliverables:**
- All components render correctly in isolation
- Layout responsive (desktop + basic mobile)
- TypeScript strict mode passes
- Component showcase page works

**Estimated effort:** 6–8 hours  
**Definition of Done:** All components visible and functional in showcase.

---

### Step 3: Create useSimulator() Hook & State Management

**Goal:** Centralized state management for simulators.

**Tasks:**
- [ ] Define `SimulatorState` TypeScript interface
- [ ] Create `useSimulator(moduleName)` custom hook
- [ ] Implement state: params, dataset, results, isRunning, history
- [ ] Implement mutations: setParam(), run(), reset(), loadPreset()
- [ ] Write unit tests for hook behavior
- [ ] Create context provider for global simulator state (optional, MVP may not need)

**Deliverables:**
- Hook returns correct state and mutation functions
- State persists across component re-renders
- Multiple components can access simulator state
- Unit tests pass (≥ 80% coverage)

**Estimated effort:** 4–5 hours  
**Definition of Done:** Hook works end-to-end; tests pass.

---

### Step 4: Set Up TensorFlow.js & Test Math Operations

**Goal:** Confirm TF.js works for MVP simulator engines.

**Tasks:**
- [ ] Create matrix operation helpers (multiply, transpose, etc.)
- [ ] Implement MSE loss calculation (TF.js)
- [ ] Implement sigmoid function
- [ ] Implement gradient calculation (numerical)
- [ ] Write unit tests for all math functions
- [ ] Verify performance (< 50ms for typical operations)

**Deliverables:**
- Math library file (`simulators/shared/math.ts`)
- Unit tests for all operations
- Performance benchmarks logged

**Estimated effort:** 3–4 hours  
**Definition of Done:** All math tests pass; performance acceptable.

---

### Step 5: Build Linear Regression Simulator Engine

**Goal:** First complete simulator module (math + UI integration).

**Tasks:**
- [ ] Implement `LinearRegression` class with forward pass (y = m*x + b)
- [ ] Implement MSE loss calculation
- [ ] Create synthetic dataset generator
- [ ] Implement parameter constraints (bounds checking)
- [ ] Write unit tests for engine
- [ ] Create preset configs (Good Fit, Poor Fit, Overfit, Underfit)
- [ ] Document simulator API

**Deliverables:**
- `simulators/LinearRegression.ts` file
- Unit tests (≥ 90% coverage on math)
- Presets JSON file
- API documentation

**Estimated effort:** 5–6 hours  
**Definition of Done:** Engine tested and correct; presets load without errors.

---

### Step 6: Create Visualization Component for Linear Regression

**Goal:** Plot scatter + line in real-time.

**Tasks:**
- [ ] Create Plotly wrapper component for 2D plots
- [ ] Implement scatter plot (data points)
- [ ] Implement line rendering (model predictions)
- [ ] Add real-time loss display (number box)
- [ ] Add color-coded loss indicator (green → red)
- [ ] Test responsiveness (plots update < 200ms after param change)
- [ ] Test on multiple browsers/screen sizes

**Deliverables:**
- `<Visualization />` component using Plotly
- Handles real-time updates
- Responsive layout

**Estimated effort:** 4–5 hours  
**Definition of Done:** Plots render correctly; updates smooth.

---

### Step 7: Integrate Linear Regression Module (End-to-End)

**Goal:** Complete working module: explanation → controls → visualization.

**Tasks:**
- [ ] Create lesson card with explanation (100–150 words)
- [ ] Wire `<ControlPanel />` (slope, intercept sliders) to `useSimulator()`
- [ ] Wire `<Visualization />` to display results from simulator
- [ ] Add preset buttons
- [ ] Add reset button
- [ ] Test full flow: adjust slider → see visualization update
- [ ] Write integration tests

**Deliverables:**
- `/pages/modules/LinearRegression.tsx` (or similar)
- Full working module
- Integration tests

**Estimated effort:** 4–5 hours  
**Definition of Done:** User can open module, adjust sliders, see results update in real-time.

---

### Step 8: Build Gradient Descent Simulator Engine

**Goal:** Second module + reusable patterns emerge.

**Tasks:**
- [ ] Implement `GradientDescent` class
- [ ] Implement gradient computation (numerical or analytical)
- [ ] Implement iterative descent algorithm
- [ ] Track path history (for visualization)
- [ ] Create loss landscape function
- [ ] Add learning rate parameter (0.001–1.0)
- [ ] Write unit tests
- [ ] Create presets (High LR, Low LR, Good LR, Oscillating)

**Deliverables:**
- `simulators/GradientDescent.ts`
- Unit tests
- Presets

**Estimated effort:** 6–7 hours  
**Definition of Done:** Engine tested; descent behaves correctly on toy problems.

---

### Step 9: Create Visualization for Gradient Descent

**Goal:** Loss landscape + descent path animation.

**Tasks:**
- [ ] Create 2D contour plot (loss landscape)
- [ ] Overlay current position marker
- [ ] Overlay descent path (breadcrumb trail)
- [ ] Show gradient vector as arrow
- [ ] Add iteration counter overlay
- [ ] Implement animation (step-by-step descent)
- [ ] Add pause/resume controls
- [ ] Test responsiveness

**Deliverables:**
- Advanced Plotly visualization
- Animation framework

**Estimated effort:** 6–7 hours  
**Definition of Done:** Contour plot renders; descent animation works smoothly.

---

### Step 10: Integrate Gradient Descent Module

**Goal:** Full working module.

**Tasks:**
- [ ] Create lesson card with explanation
- [ ] Wire controls (learning rate, iterations, reset)
- [ ] Wire visualization
- [ ] Add preset buttons
- [ ] Test full flow
- [ ] Compare with Linear Regression module (should feel similar)
- [ ] Update navigation to include both modules

**Deliverables:**
- `/pages/modules/GradientDescent.tsx`
- Working module
- Updated main navigation

**Estimated effort:** 3–4 hours  
**Definition of Done:** Module works; users can switch between Linear Regression and Gradient Descent.

---

### Step 11: Build Logistic Regression Simulator Engine

**Goal:** Third module + classification introducer.

**Tasks:**
- [ ] Implement `LogisticRegression` class
- [ ] Implement sigmoid function
- [ ] Implement binary cross-entropy loss
- [ ] Implement decision boundary calculation
- [ ] Implement polynomial feature expansion (degree 0–3)
- [ ] Create synthetic 2-class dataset generator
- [ ] Write unit tests
- [ ] Create presets (Linear boundary, Quadratic boundary, Overfitting case)

**Deliverables:**
- `simulators/LogisticRegression.ts`
- Unit tests
- Presets

**Estimated effort:** 6–7 hours  
**Definition of Done:** Engine correct; decision boundaries render properly.

---

### Step 12: Create Visualization for Logistic Regression

**Goal:** Decision boundary + classification visualization.

**Tasks:**
- [ ] Create 2D scatter plot (2 classes, different colors)
- [ ] Render decision boundary line/curve
- [ ] Add confidence heatmap (background color = probability)
- [ ] Highlight misclassified points in red
- [ ] Display accuracy/AUC score
- [ ] Test with various class distributions
- [ ] Test responsiveness

**Deliverables:**
- Plotly visualization with heatmap
- Accuracy metric display

**Estimated effort:** 6–7 hours  
**Definition of Done:** Boundary renders correctly; heatmap shows confidence regions.

---

### Step 13: Integrate Logistic Regression Module

**Goal:** Full working module.

**Tasks:**
- [ ] Create lesson card with explanation
- [ ] Wire controls (complexity, threshold, dataset generator)
- [ ] Wire visualization
- [ ] Add preset buttons
- [ ] Test full flow
- [ ] Update navigation

**Deliverables:**
- `/pages/modules/LogisticRegression.tsx`
- Working module
- Three-module navigation working

**Estimated effort:** 3–4 hours  
**Definition of Done:** Three modules available; navigation works.

---

### Step 14: Refactor to Extract `Simulator` Base Class

**Goal:** Reusable patterns emerge; future modules easier to add.

**Tasks:**
- [ ] Analyze common patterns in all 3 simulators
- [ ] Create abstract `Simulator` base class with common methods
- [ ] Refactor LinearRegression to extend base class
- [ ] Refactor GradientDescent to extend base class
- [ ] Refactor LogisticRegression to extend base class
- [ ] Update imports/tests
- [ ] Document "How to Add a Module" guide

**Deliverables:**
- `simulators/Simulator.ts` (base class)
- All 3 modules refactored
- Module template for future developers
- "How to Add a Module" documentation (1 page)

**Estimated effort:** 4–5 hours  
**Definition of Done:** All modules still work after refactor; base class clear and tested.

---

### Step 15: Create Lesson Content (Explanations + Descriptions)

**Goal:** Educational clarity.

**Tasks:**
- [ ] Write LinearRegression explanation (100–150 words, key points)
- [ ] Write GradientDescent explanation
- [ ] Write LogisticRegression explanation
- [ ] Add "What will you learn?" section per module
- [ ] Add "Try this first" hint per module
- [ ] Proofread all content for clarity
- [ ] Get feedback from 1–2 non-experts (optional but recommended)

**Deliverables:**
- Content JSON/files with all explanations
- Reviewed and clear

**Estimated effort:** 2–3 hours  
**Definition of Done:** All content clear, proofread, and displayed in UI.

---

### Step 16: Create Quiz Questions

**Goal:** Learning validation.

**Tasks:**
- [ ] Create 3 quiz questions per module
- [ ] Questions should test conceptual understanding, not code
- [ ] Provide explanation for correct answer
- [ ] Create `<Quiz />` component
- [ ] Wire quiz to lesson pages
- [ ] Test quiz scoring logic

**Deliverables:**
- Quiz question JSON
- Quiz component
- Quiz wired to all 3 modules

**Estimated effort:** 3–4 hours  
**Definition of Done:** Quiz displays; answers scored correctly.

---

### Step 17: Mobile Responsiveness & UX Polish

**Goal:** Works on all screen sizes; feels professional.

**Tasks:**
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (600px width)
- [ ] Test on desktop (1920px width)
- [ ] Fix layout issues (stack controls vertically on mobile)
- [ ] Ensure text readability on all sizes
- [ ] Test touch interactions (sliders, buttons)
- [ ] Add loading states
- [ ] Add smooth transitions

**Deliverables:**
- Responsive layout working
- Touch-friendly controls

**Estimated effort:** 4–5 hours  
**Definition of Done:** App works smoothly on all sizes; Lighthouse scores ≥ 85.

---

### Step 18: Accessibility Improvements

**Goal:** WCAG AA compliance.

**Tasks:**
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation (Tab, Enter, Arrows)
- [ ] Check color contrast (≥ 4.5:1)
- [ ] Test with screen reader (NVDA or similar)
- [ ] Add skip links (if needed)
- [ ] Test with browser DevTools accessibility checker

**Deliverables:**
- ARIA labels throughout
- Keyboard navigation working
- Contrast checker passing
- Lighthouse accessibility score ≥ 90

**Estimated effort:** 3–4 hours  
**Definition of Done:** Lighthouse accessibility ≥ 90; screen reader tested.

---

### Step 19: Unit & Integration Testing

**Goal:** Confidence in code correctness.

**Tasks:**
- [ ] Write tests for all simulator engines (if not already done)
- [ ] Write tests for hooks
- [ ] Write component tests for UI components
- [ ] Write integration tests (full flow: open module → adjust → see result)
- [ ] Aim for ≥ 70% code coverage
- [ ] Document testing strategy

**Deliverables:**
- Unit tests (simulators, hooks, utilities)
- Component tests (UI components)
- Integration tests (end-to-end flows)
- Coverage report

**Estimated effort:** 6–8 hours  
**Definition of Done:** ≥ 70% coverage; all tests passing.

---

### Step 20: CI/CD Setup & Deployment

**Goal:** Automated quality checks; live deployment.

**Tasks:**
- [ ] Create GitHub Actions workflow (lint, test, build)
- [ ] Ensure workflow passes locally
- [ ] Deploy to Vercel (or Netlify)
- [ ] Set up auto-deploy on push to main
- [ ] Test deployment (site loads, all modules work)
- [ ] Configure custom domain (optional)
- [ ] Monitor performance (Lighthouse, bundle size)

**Deliverables:**
- GitHub Actions workflow
- Live deployment at public URL
- CI/CD passing

**Estimated effort:** 3–4 hours  
**Definition of Done:** Live at public URL; CI/CD green.

---

### Step 21: Analytics & Feedback Collection

**Goal:** Track usage; gather improvement ideas.

**Tasks:**
- [ ] Set up Google Analytics or Plausible
- [ ] Track page views and events (module opens, quiz attempts)
- [ ] Add feedback form/widget (e.g., Typeform embed)
- [ ] Set up error tracking (Sentry or similar, optional)
- [ ] Document dashboard/metrics

**Deliverables:**
- Analytics tracking working
- Feedback form live
- Dashboard accessible

**Estimated effort:** 2–3 hours  
**Definition of Done:** Analytics data flowing; feedback submissions working.

---

### Step 22: Documentation & Handoff

**Goal:** Future-proofing; clarity for contributors or future self.

**Tasks:**
- [ ] Update README (overview, setup, development instructions)
- [ ] Document folder structure and coding conventions
- [ ] Write "How to Add a Module" tutorial
- [ ] Document CLI commands (`npm run dev`, `npm run build`, etc.)
- [ ] Document architecture decisions (why React? Why TF.js? Why Plotly?)
- [ ] Create CONTRIBUTING guide (if open-sourcing)
- [ ] Document known issues and future improvements

**Deliverables:**
- Comprehensive README
- Contributor guide
- Architecture documentation
- "How to Add a Module" guide

**Estimated effort:** 3–4 hours  
**Definition of Done:** New developer can set up and add a module using guides.

---

### Step 23: Final QA & Launch

**Goal:** Production-ready release.

**Tasks:**
- [ ] Full end-to-end testing (all modules, all flows)
- [ ] Test on real browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify all content (no typos, correct explanations)
- [ ] Check performance (Lighthouse ≥ 90 across modules)
- [ ] Verify analytics are working
- [ ] Create launch announcement
- [ ] Plan post-launch support (monitoring, feedback response)

**Deliverables:**
- Sign-off on readiness
- Launch announcement
- Monitoring setup

**Estimated effort:** 2–3 hours  
**Definition of Done:** All checks green; ready to announce.

---

### Estimated Total Effort

- **Total steps:** 23
- **Average per step:** 4–5 hours
- **Total estimated:** 90–120 hours
- **Full-time solo:** 2–3 weeks
- **Part-time (20 hrs/week):** 5–6 weeks

**Note:** This is a sequential plan. Parallelization possible in Steps 2–4 (all independent), but presented linearly for clarity.

---

## 8. GitHub Copilot Workflow for Step-by-Step Implementation

### Workflow Philosophy

**Copilot is your pair programmer.** You decide each step; Copilot generates boilerplate and components faster. Review every output; extract reusable patterns. Build confidence by shipping working code frequently.

---

### Copilot Engagement by Step

#### Steps 1–2: Setup & Components

**What to ask Copilot:**

1. **Step 1 scaffolding:**
   ```
   "Generate a Vite + React + TypeScript project structure for an ML learning simulator.
    Include folders: components/, simulators/, hooks/, lessons/, styles/.
    Generate package.json with: react, react-dom, tensorflow.js, plotly.js, tailwindcss, typescript, vite.
    Add dev scripts: dev, build, test, lint."
   ```

2. **Tailwind config:**
   ```
   "Generate a tailwind.config.js with educational soft color palette.
    Colors: primary (blue-500), success (green-600), warning (orange-500), error (red-600).
    Spacing scale: xs (4px) to xl (32px).
    Fonts: system font stack, line-height 1.5."
   ```

3. **Base components:**
   ```
   "Generate a Button.tsx component using Tailwind.
    Props: variant (primary | secondary | outline), size (sm | md | lg), children, disabled.
    Use clear semantic HTML."
   ```

   Repeat for Slider.tsx, Card.tsx, etc.

4. **Layout component:**
   ```
   "Generate SimulatorView.tsx that layouts as: left panel 40% (explanation + controls),
    right panel 60% (visualization). On mobile (< 768px), stack vertically.
    Use Tailwind Grid.
    Props: explanation, controls (JSX), visualization (JSX)."
   ```

**Review before using:** Check prop naming, accessibility attributes, responsiveness.

---

#### Steps 3–4: State & Math

**What to ask Copilot:**

1. **TypeScript interfaces:**
   ```
   "Generate TypeScript interfaces for a simulator in interfaces.ts.
   Define: SimulatorState, SimulatorParams, SimulationResults, Dataset.
   Each interface should have clear field descriptions in JSDoc comments."
   ```

2. **useSimulator hook:**
   ```
   "Generate a custom React hook useSimulator(moduleName: string).
    Hook should manage state with useState: params, results, dataset, isRunning.
    Expose mutations: setParam(key, value), run(), reset(), loadPreset(preset).
    Return all state and mutations.
    Include JSDoc."
   ```

3. **Math functions:**
   ```
   "Generate math utility functions in simulators/shared/math.ts using TensorFlow.js.
    Implement: matrixMultiply(), transpose(), mseLoss(), sigmoidFunction().
    Include JSDoc with input/output shapes.
    Add unit test examples."
   ```

**Review before using:** Verify function signatures, test with sample data, check for numerical stability.

---

#### Steps 5–7: First Module (Linear Regression)

**What to ask Copilot:**

1. **Simulator engine:**
   ```
   "Generate LinearRegression.ts as a simulator engine.
    Implements y = slope * x + intercept.
    Properties: slope, intercept.
    Methods: forward(X, params) returns predictions, loss(y, predictions) returns MSE.
    Include JSDoc with mathematical definitions.
    Generator: generateDataset(n, noise) creates random scatter plot data."
   ```

2. **Unit tests for engine:**
   ```
   "Generate __tests__/LinearRegression.test.ts using Vitest.
    Test cases: forward pass (known data), loss calculation, edge cases (empty data).
    Include setup/teardown with sample datasets."
   ```

3. **Visualization component:**
   ```
   "Generate a Visualization.tsx component using plotly.js for 2D scatter + line.
    Props: dataPoints (array of {x, y}), predictions (array), loss (number).
    Render: scatter plot + fitted line + loss display.
    Handle real-time updates (input changes → re-render < 200ms).
    Use React.memo for performance."
   ```

4. **Integration:**
   ```
   "Generate LinearRegression.tsx page.
    Combine: LessonCard (explanation), ControlPanel (slope/intercept sliders),
    Visualization (plot), PresetButtons, ResetButton.
    Wire to useSimulator('linear-regression').
    On slider change → setParam → re-render visualization."
   ```

**Review before using:** Test the full flow locally; adjust props as needed.

---

#### Steps 8–10: Second Module (Gradient Descent)

**What to ask Copilot:**

1. **GD Engine:**
   ```
   "Generate GradientDescent.ts simulator.
    Takes: initialSlope, initialIntercept, learningRate, iterations.
    Implements: Run N iterations of gradient descent on linear regression.
    Track path history (list of [slope, intercept, loss] at each step).
    Methods: forward(), step(), run(nIterations) returns {path, finalParams}."
   ```

2. **Advanced visualization:**
   ```
   "Generate a GradientDescentViz.tsx using Plotly 2D contour.
    Plot: loss landscape (x-axis: slope, y-axis: intercept).
    Overlay: current position marker, descent path as line with breadcrumbs.
    Add iteration counter above plot."
   ```

3. **Integration:**
   ```
   "Generate GradientDescent.tsx page similar to LinearRegression.tsx.
    Controls: learning rate slider, iterations input, resetButton, presetButtons.
    Show loss landscape + animated descent."
   ```

**Tip:** Ask Copilot: "How would you animate the descent path step-by-step?" It may suggest state machine or setTimeout approach.

---

#### Steps 11–13: Third Module (Logistic Regression)

**What to ask Copilot:**

1. **LR Engine:**
   ```
   "Generate LogisticRegression.ts simulator.
    Implements: sigmoid(w·x + b) for binary classification.
    Methods: forward(X, params), binaryCrossEntropyLoss(y, predictions).
    Support: polynomial feature expansion (degree 0–3).
    generateBinaryDataset(n, clusters, noise) creates two separable Gaussian clusters."
   ```

2. **Decision boundary viz:**
   ```
   "Generate LogisticRegressionViz.tsx using Plotly.
    Plot: 2D scatter (two classes, colors), decision boundary line/curve, confidence heatmap.
    Highlight misclassified points in red.
    Display: accuracy, misclassification rate."
   ```

3. **Integration:**
   ```
   "Generate LogisticRegression.tsx page.
    Controls: complexity slider (polynomial degree), threshold slider, class generator.
    Visualize decision boundary; update in real-time."
   ```

---

#### Steps 14–16: Refactor & Content

1. **Base class extraction:**
   ```
   "I have 3 simulators: LinearRegression, GradientDescent, LogisticRegression.
    Extract a base Simulator class with common methods: forward(), run(), run(params), loadPreset().
    Make each module extend Simulator and override only forward() and loss().
    Refactor all 3 modules to use base class. Keep tests passing."
   ```

2. **Quiz component:**
   ```
   "Generate Quiz.tsx component.
    Props: questions (array of {question, options, correct, explanation}).
    Show: one question, 4 choices, submit button.
    On submit: show correct/incorrect with explanation.
    Display score at the end."
   ```

3. **Content data:**
   ```
   "Generate lessons.ts with lesson configs for all 3 modules.
    Each: {title, explanation (150 words), keyPoints (3), tips, presets}.
    Format as TypeScript objects or JSON."
   ```

---

#### Steps 17–23: Polish & Deployment

**For each, ask Copilot:**

1. **Mobile responsiveness:**
   ```
   "The SimulatorView layout breaks on mobile. 
    Refactor to stack vertically on screens < 768px. Keep side-by-side on desktop.
    Test that plots resize correctly. Use Tailwind responsive utilities."
   ```

2. **Accessibility:**
   ```
   "Add ARIA labels and semantic HTML to all components.
    Ensure keyboard navigation (Tab through controls, Enter to activate).
    Example: <button aria-label='Run simulation'>Run</button>."
   ```

3. **Performance:**
   ```
   "The Visualization updates slowly when I drag the slider.
    Implement throttling: update visualization only 3x per second.
    Use React.memo on viz component, useCallback on handlers."
   ```

4. **CI/CD workflow:**
   ```
   "Generate a GitHub Actions workflow (.github/workflows/ci.yml).
    Steps: install, lint (ESLint), test (Vitest), build.
    Run on: push to main, pull requests.
    Fail if any step fails."
   ```

---

### Mistakes to Avoid

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| **"Build me the entire app"** | Generates unreviewed, hard-to-debug monolithic code | Break into components: engine, then UI, then integration |
| **Asking Copilot for architecture** | Copilot generates working code, not strategic decisions | YOU decide architecture; Copilot implements your design |
| **Copy-pasting without review** | Bugs, type errors, performance issues slip in | Always review, test locally, then commit |
| **Mixing concerns in one prompt** | Confuses Copilot (state + rendering + math simultaneously) | Generate in isolation: engine → hook → component |
| **Vague names** | Generated code is unreadable | Be specific: "learningRate" not "lr", "computeGradient()" not "calc()" |
| **Ignoring type safety** | Types catch bugs early | Always provide TypeScript interfaces first; ask Copilot to implement them |
| **Asking Copilot to debug** | It's good for boilerplate, not debugging | Debug yourself with console logs, DevTools, and reasoning |

---

### Checklist: Before Committing Code Copilot Generated

- [ ] Code compiles (TypeScript strict mode passes)
- [ ] No console warnings
- [ ] Unit tests written and passing (if applicable)
- [ ] Variable/function names are clear
- [ ] Comments explain *why*, not *what*
- [ ] Edge cases considered (empty arrays, null values, etc.)
- [ ] Performance acceptable (< 200ms for interactive updates)
- [ ] Styling consistent with design tokens
- [ ] Accessibility attributes present (ARIA, semantic HTML)

---

### Recommended Prompting Sequence (Day-by-Day)

**Day 1 (Step 1–2):**
```
1. "Generate Vite scaffolding"
2. "Generate Tailwind config"
3. "Generate base components (Button, Slider, Card)"
4. "Generate SimulatorView layout component"
```

**Day 2 (Step 3–4):**
```
5. "Generate TypeScript interfaces"
6. "Generate useSimulator hook"
7. "Generate math utilities (TF.js)"
```

**Day 3–4 (Step 5–7):**
```
8. "Generate LinearRegression engine"
9. "Generate unit tests for LinearRegression"
10. "Generate Visualization component (scatter + line)"
11. "Integrate LinearRegression module (page component)"
```

**Day 5–6 (Step 8–10):**
```
12. "Generate GradientDescent engine"
13. "Generate GD visualization (contour + path)"
14. "Integrate GradientDescent module"
```

**Day 7–8 (Step 11–13):**
```
15. "Generate LogisticRegression engine"
16. "Generate LR visualization (boundary + heatmap)"
17. "Integrate LogisticRegression module"
```

**Day 9 (Step 14–16):**
```
18. "Extract Simulator base class; refactor all 3 modules"
19. "Generate Quiz component"
20. "Generate lesson content in TypeScript"
```

**Day 10–11 (Step 17–23):**
```
21. "Fix mobile responsiveness"
22. "Add accessibility improvements"
23. "Generate performance optimizations"
24. "Generate GitHub Actions CI/CD workflow"
25. "Deploy to Vercel"
```

---

## 9. Project Management: Epic-Based Breakdown

### MVP Epics (Interactive Textbook)

| Epic | Focus | Status |
|------|-------|--------|
| **E1: Platform Foundation** | Setup, design system, base components | Planning |
| **E2: State & Math Layer** | useSimulator hook, TensorFlow.js utilities | Planning |
| **E3: Linear Regression Module** | Core algorithm, visualization, integration | Planning |
| **E4: Gradient Descent Module** | Optimizer visualization, reusable patterns | Planning |
| **E5: Logistic Regression Module** | Classification, decision boundaries | Planning |
| **E6: Content & Polish** | Lesson explanations, quiz, UX refinement | Planning |
| **E7: Quality & Launch** | Testing, deployment, analytics, documentation | Planning |

**Post-MVP Epics:** See [future-implementations.md](future-implementations.md)

---

### User Stories for MVP

#### E1: Platform Foundation

**Story E1-1: Initialize Vite Project**
```markdown
**As a** developer
**I want** a working Vite + React + TypeScript project
**So that** I can start building components

**Acceptance Criteria:**
- npm run dev launches dev server
- npm run build produces bundle
- TypeScript strict mode enabled
- ESLint configured and passing
- .gitignore, README, initial commit present

**Effort:** 3 hours
**Labels:** setup, priority:high
```

**Story E1-2: Design System (Colors, Spacing, Fonts)**
```markdown
**As a** designer/developer
**I want** consistent design tokens
**So that** the UI looks cohesive

**Acceptance Criteria:**
- Tailwind config with soft, educational color palette
- Spacing scale defined (xs–xl)
- Font sizes consistent
- Token showcase page created
- All base components use tokens

**Effort:** 4 hours
**Labels:** design, priority:high
```

**Story E1-3: Build Base Components**
```markdown
**As a** developer
**I want** reusable UI components
**So that** I don't repeat UI code

**Acceptance Criteria:**
- Button, Slider, Card, Tabs components created
- All use Tailwind + design tokens
- TypeScript props documented
- Storybook/showcase page shows all components
- Component tests passing

**Effort:** 8 hours
**Labels:** components, priority:high
```

**Story E1-4: SimulatorView Layout**
```markdown
**As a** learner
**I want** a consistent lesson layout
**So that** modules feel familiar

**Acceptance Criteria:**
- Left panel (40%) for explanation + controls
- Right panel (60%) for visualization
- Responsive: stacks on mobile (< 768px)
- All simulator pages inherit this layout

**Effort:** 4 hours
**Labels:** layout, priority:high
```

---

#### E2: State & Math Layer

**Story E2-1: Define Simulator Interfaces**
```markdown
**As a** developer
**I want** clear TypeScript interfaces
**So that** simulator engines are type-safe

**Acceptance Criteria:**
- SimulatorState interface defined
- SimulatorParams, SimulationResults interfaces defined
- Dataset interface defined
- All with JSDoc comments

**Effort:** 2 hours
**Labels:** architecture, priority:high
```

**Story E2-2: useSimulator Hook**
```markdown
**As a** developer
**I want** a custom hook for simulator state
**So that** all components share state consistently

**Acceptance Criteria:**
- Hook manages params, results, dataset, isRunning, history
- Exposes mutations: setParam, run, reset, loadPreset
- Multiple UI components can use same hook
- Unit tested (setParam works, run executes, etc.)

**Effort:** 5 hours
**Labels:** state, priority:high, testing
```

**Story E2-3: TensorFlow.js Math Utilities**
```markdown
**As a** developer
**I want** TF.js math functions
**So that** simulators compute correctly

**Acceptance Criteria:**
- MSE loss function implemented
- Matrix operations tested
- Sigmoid function tested
- Gradient computation (numerical) tested
- All > 95% accuracy on known problems

**Effort:** 4 hours
**Labels:** math, priority:high, testing
```

---

#### E3–E5: Simulator Modules (Similar structure)

**Example: Story E3-1**
```markdown
**As a** learner
**I want** to manipulate a line to fit data
**So that** I understand linear regression

**Acceptance Criteria:**
- Can adjust slope and intercept via sliders
- Loss updates in real-time
- Scatter plot displays with fitted line
- Presets available (Good, Poor)
- Quiz questions present

**Effort:** 15 hours (across all stories in the module)
**Labels:** module:linear-regression, priority:high
```

---

#### E6: Content & Polish

**Story E6-1: Write Lesson Explanations**
```markdown
**As a** learner
**I want** clear explanations
**So that** I understand before experimenting

**Acceptance Criteria:**
- 100–150 words per module
- Key points in bullets
- Jargon minimized or explained
- Proofread and reviewed

**Effort:** 3 hours
**Labels:** content, priority:high
```

**Story E6-2: Create Quiz Questions**
```markdown
**As a** learner
**I want** to test my understanding
**So that** I know if I learned

**Acceptance Criteria:**
- 3 questions per module
- Conceptual (not code) questions
- Explanations for correct answers
- Score calculated correctly

**Effort:** 3 hours
**Labels:** content, priority:high
```

**Story E6-3: Mobile Responsiveness**
```markdown
**As a** mobile user
**I want** the app to work on my tablet
**So that** I can learn anywhere

**Acceptance Criteria:**
- Responsive from 375px to 2560px
- Touch-friendly (44px+ tap targets)
- No horizontal scrolling
- Tested on real devices

**Effort:** 5 hours
**Labels:** ux, mobile, priority:medium
```

**Story E6-4: Accessibility (WCAG AA)**
```markdown
**As a** screen reader user
**I want** ARIA labels and keyboard nav
**So that** I can use the app

**Acceptance Criteria:**
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Arrows)
- Color contrast ≥ 4.5:1
- Lighthouse accessibility ≥ 90

**Effort:** 4 hours
**Labels:** accessibility, priority:high
```

---

#### E7: Quality & Launch

**Story E7-1: Unit & Integration Testing**
```markdown
**As a** developer
**I want** comprehensive tests
**So that** I catch regressions

**Acceptance Criteria:**
- ≥ 70% code coverage
- Unit tests for all simulators
- Component tests for UI
- Integration tests for full flows
- All passing

**Effort:** 8 hours
**Labels:** testing, quality, priority:high
```

**Story E7-2: CI/CD Pipeline**
```markdown
**As a** developer
**I want** automated quality checks
**So that** only good code is deployed

**Acceptance Criteria:**
- GitHub Actions workflow (lint, test, build)
- Workflow passes locally and on push
- Documented in README

**Effort:** 3 hours
**Labels:** devops, priority:high
```

**Story E7-3: Deploy to Vercel**
```markdown
**As a** learner
**I want** to access the app online
**So that** I don't need to set up locally

**Acceptance Criteria:**
- Deployed to Vercel
- Auto-deploys on push to main
- Custom domain (or Vercel domain)
- Performance Lighthouse ≥ 90

**Effort:** 2 hours
**Labels:** deployment, priority:high
```

**Story E7-4: Analytics & Feedback**
```markdown
**As a** builder
**I want** to track usage
**So that** I understand what works

**Acceptance Criteria:**
- Analytics tracking (Google Analytics or Plausible)
- Feedback form live
- Error tracking (optional, Sentry)

**Effort:** 2 hours
**Labels:** analytics, priority:medium
```

**Story E7-5: Documentation**
```markdown
**As a** contributor
**I want** clear documentation
**So that** I can add modules

**Acceptance Criteria:**
- README with setup instructions
- "How to Add a Module" guide (1 page)
- Architecture overview
- Folder structure documented

**Effort:** 3 hours
**Labels:** docs, priority:high
```

---

### GitHub Issue Labels (Recommended)

```
Priority: priority:highest, priority:high, priority:medium, priority:low
Type: enhancement, bug, docs, maintenance, testing
Module: module:linear-regression, module:gradient-descent, module:logistic-regression
Component: component:visualization, component:controls, component:layout
Category: setup, design, state, architecture, devops, content, quality
Difficulty: good-first-issue, intermediate, expert
```

---

### Milestones

| Milestone | Target Date | Goals |
|-----------|------------|--------|
| `Foundation` | End of Stage 1 | Setup, design, components done |
| `First Module` | End of Stage 2–3 | Linear Regression complete |
| `Three Modules` | End of Stage 4–5 | All 3 core modules working |
| `MVP Ready` | End of Stage 6 | Content, UX, tests complete |
| `Launch` | End of Stage 7 | Deployed and monitoring |

---

### Task Board Structure

Create GitHub Project board with columns:

```
Backlog → 🔄 In Progress → 👀 Ready for Review → ✅ Done
```

**Backlog:** All stories and tasks not yet started.  
**In Progress:** Currently working on (move here before starting).  
**Ready for Review:** Code done; awaiting self-review or testing.  
**Done:** Verified and merged.

---

### Suggested First 5 Issues

1. **Issue #1: Initialize Vite project** (E1-1)
2. **Issue #2: Create base components** (E1-3)
3. **Issue #3: Implement useSimulator hook** (E2-2)
4. **Issue #4: Build LinearRegression engine** (E3-1 part)
5. **Issue #5: Create Visualization for linear regression** (E3-2 part)

These unlock all subsequent work.

---

## 10. Risk Review (MVP Phase)

### Major Risks and Mitigation

#### Risk 1: Browser Performance for Simulations

**Description:**  
TensorFlow.js simulations may be slow or stutter on older browsers.

**Probability:** Medium  
**Impact:** High (ruins learning experience)

**Mitigation Steps:**
1. Profile early (Step 4–5) with DevTools Profiler
2. Throttle visualization updates (max 30fps)
3. Use web workers for heavy compute if needed (defer to V2)
4. Test on Chrome, Firefox, Safari, Edge
5. Set performance budget: "Slider drag = < 50ms response time"

**Early indicator:** If gradient descent step 9 is slow, address before continuing.

---

#### Risk 2: Overbuilding Too Early

**Description:**  
Temptation to add "nice features" (animations, complex UI, user accounts) kills focus, extends timeline.

**Probability:** High  
**Impact:** Medium (delayed MVP launch)

**Mitigation Steps:**
1. Guard against scope creep with "MVP Only" labels on PRs
2. Move nice-to-haves to [future-implementations.md](future-implementations.md) *immediately*
3. Measure: MVP should have ≤ 100 lines of engine code per module
4. Step review: "Does this add learning value or just polish?"
5. Ship MVP *even if* not perfect

---

#### Risk 3: Poor Educational Clarity

**Description:**  
Simulator runs, but learners don't understand what they're seeing.

**Probability:** Medium  
**Impact:** High (defeats purpose)

**Mitigation Steps:**
1. **Get early feedback:** Step 7, ask 2–3 non-expert friends to try linear regression
2. **Observe silently:** Watch them use it. Do they get it in 5 min?
3. **Refine explanations:** If not, rewrite before next module
4. **Test comprehension:** Quiz must be answerable after exploring

---

#### Risk 4: Weak Module Reuse

**Description:**  
Each simulator is a one-off; adding more modules requires rewriting patterns.

**Probability:** Medium  
**Impact:** Medium (slows future development)

**Mitigation Steps:**
1. **Extract base class at Step 14:** After 3 modules, not before
2. **Document pattern:** 1-page "How to Add a Module" guide
3. **Enforce in PRs:** All new modules inherit from base class

---

#### Risk 5: Burnout from Solo Development

**Description:**  
Solo coding for 20+ steps is exhausting.

**Probability:** High  
**Impact:** High (project stalls)

**Mitigation Steps:**
1. Take breaks: 1 day off per 3–4 steps
2. Celebrate milestones: Ship Step 7 (first module works) → celebrate
3. Use Copilot heavily to reduce tedium
4. Set hard boundaries: 4 hours coding/day max

---

### Risk Monitoring Checklist

| Step Range | Key Risk | Check |
|-----------|----------|-------|
| 1–5 | Setup delays | Confirm each uses < 1 hour |
| 6–7 | LR math errors | Run unit tests before moving on |
| 8–10 | GD visualization bugs | Test on multiple browsers |
| 11–14 | UI clutter | Compare screenshots across modules |
| 15–18 | Content quality | Get early feedback |
| 19–23 | Deployment issues | Test deployment at Step 20 |

---

**For advanced risks (V2+):** See [future-implementations.md](future-implementations.md#risks)

---

## 11. First Steps to Implement

### Immediate Next Steps

**Week 1 (Foundational):**
1. Create Vite + React + TypeScript project ✓ Step 1
2. Scaffold folder structure
3. Configure Tailwind + design tokens ✓ Step 2
4. Build base components (Button, Slider, Card) ✓ Step 2
5. Create SimulatorView layout component ✓ Step 2

**Week 2 (Infrastructure):**
6. Define TypeScript interfaces ✓ Step 3
7. Build useSimulator() hook ✓ Step 3
8. Set up TensorFlow.js + math utilities ✓ Step 4
9. Create Storybook/component showcase

**Week 3–4 (First Module):**
10. Implement LinearRegression engine ✓ Step 5
11. Create visualization for scatter + line ✓ Step 6
12. Integrate LR module (full end-to-end) ✓ Step 7

---

### Suggested Starting Checklist

Before writing any code, prepare your workspace:

- [ ] Fork/clone repo from GitHub
- [ ] Create a new branch: `git checkout -b feature/mvp-setup`
- [ ] Create kanban board (GitHub Projects) with MVP epics
- [ ] Set up VS Code with recommended extensions
- [ ] Install Node.js (v18+) and npm (v8+)
- [ ] Create `.env` file (if needed)
- [ ] Document your development commands in README

---

### Repository Structure (Starting State)

```
learning-simulator-ai-ml/
├── .github/
│   └── workflows/
│       └── ci.yml (created in Step 20)
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Slider.tsx
│   │   ├── Card.tsx
│   │   ├── SimulatorView.tsx
│   │   ├── LessonCard.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── Visualization.tsx
│   │   ├── PresetButtons.tsx
│   │   └── Quiz.tsx
│   ├── simulators/
│   │   ├── index.ts
│   │   ├── Simulator.ts (base class, created in Step 14)
│   │   ├── LinearRegression.ts
│   │   ├── GradientDescent.ts
│   │   ├── LogisticRegression.ts
│   │   └── shared/
│   │       ├── types.ts (interfaces)
│   │       ├── math.ts (TF.js utilities)
│   │       └── datasets.ts (data generation)
│   ├── hooks/
│   │   ├── useSimulator.ts
│   │   └── useVisualization.ts
│   ├── lessons/
│   │   ├── index.ts (lesson registry)
│   │   └── content/ (JSON configs)
│   │       ├── linear-regression.json
│   │       ├── gradient-descent.json
│   │       └── logistic-regression.json
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.config.js
│   ├── App.tsx
│   ├── index.tsx
│   └── vite-env.d.ts
├── tests/ (created in Step 19)
│   ├── simulators/
│   └── components/
├── docs/ (created in Step 22)
│   ├── ARCHITECTURE.md
│   ├── HOW_TO_ADD_MODULE.md
│   └── DEVELOPMENT.md
├── public/
│   └── index.html
├── .eslintrc.cjs
├── tsconfig.json
├── vite.config.ts
├── package.json
├── README.md
└── .gitignore
```

---

### Success Metrics for MVP Launch

At the end (Step 23), the project succeeds if:

✅ **Three working modules:** Linear Regression, Gradient Descent, Logistic Regression  
✅ **Real-time interactivity:** Sliders update visualization in < 200ms  
✅ **Learner feedback:** Users can answer 3 quiz questions per module correctly  
✅ **Mobile-friendly:** App works on 375px–2560px widths  
✅ **Accessible:** Lighthouse score ≥ 90 for accessibility  
✅ **Performance:** Lighthouse score ≥ 90 for performance  
✅ **Tested:** ≥ 70% code coverage; all tests passing  
✅ **Deployed:** Live at public URL (Vercel)  
✅ **Documented:** "How to Add a Module" guide works for a new contributor  

---

### Timeline Expectations

| Effort Level | Estimated Duration |
|--------------|-------------------|
| Full-time (40 hrs/week) | 2–3 weeks |
| Part-time (15 hrs/week) | 6–8 weeks |
| Casual (5 hrs/week) | 16–20 weeks |

This is **excluding** content writing, design refinement, and beta testing feedback cycles.

---

### What Comes After MVP?

See **[future-implementations.md](future-implementations.md)** for:
- V2 features (quizzes, presets, advanced modules)
- Post-MVP modules (neural networks, backpropagation, CNN, embeddings, GANs)
- Educator variants (classroom integration, progress tracking)
- Monetization and scaling strategies

---



