# Implementation Plan: AI/ML Learning Simulator Overhaul

## Codebase Snapshot (Current State)

| Area | Details |
|---|---|
| **Stack** | React + TypeScript + Vite + TailwindCSS |
| **Routing** | React Router v6, flat routes in `App.tsx` |
| **Pages** | `LetsLearnPage`, `MLModelsPage`, `DataScienceConceptsPage`, `AIConceptsPage` |
| **Modules** | 21 topic modules in `src/pages/modules/` |
| **Simulators** | Pure `.ts` logic files in `src/simulators/` |
| **Topic Data** | `src/data/models.ts` — `ModelData[]` array, flat, no track/path fields |
| **Components** | Generic: `ModelCard`, `Slider`, `Quiz`, `ControlPanel`, `SimulatorView`, etc. |

**Existing modules to keep and reassign:**
Linear Regression, Gradient Descent, Logistic Regression, Decision Tree, Random Forest, XGBoost, AdaBoost, CatBoost, SVM, KNN, Naive Bayes, K-Means, Hierarchical Clustering, PCA, Bag-of-Words, TF-IDF, N-Grams, Word2Vec, RAG, Transformers.

---

## Phase 1 — Data & Routing Architecture (Foundation)

> **Goal:** Extend the data model and routing to support tracks, paths, and new simulator pages without breaking existing modules.

### 1.1 — Extend `src/data/models.ts`

Add fields to `ModelData`:

```ts
track: TrackId          // which of the 7 tracks this belongs to
paths: PathId[]         // which learning paths include this topic
prerequisites: string[] // IDs of prerequisite topics
nextTopics: string[]    // IDs of suggested next topics
isSimulator?: boolean   // true if it has a scenario-based simulator
simulatorRoute?: string // e.g. '/simulators/missing-data'
```

Add new type exports:

```ts
export type TrackId =
  | 'data-preparation'
  | 'model-training'
  | 'model-evaluation'
  | 'text-and-nlp'
  | 'llm-and-rag'
  | 'deployment-and-monitoring'
  | 'responsible-ai'

export type PathId =
  | 'beginner-ml'
  | 'intermediate-ml'
  | 'nlp-basics'
  | 'genai-builder'
  | 'production-ai'
```

### 1.2 — Create `src/data/tracks.ts`

New file defining the 7 track objects:

```ts
export interface Track {
  id: TrackId
  title: string
  description: string
  icon: string
  color: string         // Tailwind color key
  topicIds: string[]    // ordered list of topic IDs
}
```

**Track → Topic Mapping:**

| Track | Existing Topics | New Topics to Add |
|---|---|---|
| **Data Preparation** | — | Missing Data*, Data Cleaning, Encoding, Feature Scaling, Train-Test Split |
| **Model Training** | Linear Regression, Logistic Regression, Gradient Descent, Decision Tree, Random Forest, KNN, Naive Bayes, SVM, XGBoost, AdaBoost, CatBoost | Class Imbalance* |
| **Model Evaluation** | — | Evaluation Metrics*, Cross-Validation, Threshold Tuning, Error Analysis, Bias-Variance |
| **Text and NLP** | Bag-of-Words, TF-IDF, N-Grams, Word2Vec | Tokenization, Embeddings, Text Classification, Similarity Search |
| **LLM and RAG** | RAG, Transformers | LLM Basics, Prompt Engineering*, Context Windows, Vector Databases, Chunking, Retrieval Quality, Hallucination Control, Agents |
| **Deployment & Monitoring** | — | Deployment Basics*, Drift Monitoring*, Inference Patterns, A/B Testing, Retraining Triggers, Failure Handling |
| **Responsible AI** | — | Bias & Fairness, Privacy, Safety |

*= also gets a scenario-based simulator (Phase 4)

### 1.3 — Create `src/data/learningPaths.ts`

```ts
export interface LearningPath {
  id: PathId
  title: string
  goal: string
  prerequisiteLevel: 'None' | 'Basic Math' | 'Beginner ML' | 'Intermediate ML'
  estimatedHours: number
  topicIds: string[]    // ordered sequence
  miniProject: { title: string; description: string }
  color: string
  icon: string
}
```

**Five paths:**

| Path | Prereq | Hours | Topics (ordered) | Mini-Project |
|---|---|---|---|---|
| **Beginner ML** | None | 8 | Data Cleaning → Missing Data → Encoding → Feature Scaling → Train-Test Split → Linear Regression → Logistic Regression → Evaluation Metrics → Cross-Validation → Feature Importance | Predict house prices end-to-end |
| **Intermediate ML** | Beginner ML | 10 | Decision Tree → Random Forest → Class Imbalance → Threshold Tuning → Bias-Variance → Feature Selection → Error Analysis | Fraud detection with imbalanced data |
| **NLP Basics** | None | 7 | Bag-of-Words → TF-IDF → N-Grams → Word2Vec → Tokenization → Embeddings → Text Classification → Similarity Search | Build a document search engine |
| **GenAI Builder** | NLP Basics | 12 | Transformers → LLM Basics → Prompt Engineering → Context Windows → Embeddings → Vector Databases → RAG → Hallucination Control → Agents → Responsible AI | Build a RAG Q&A assistant |
| **Production AI** | Intermediate ML | 10 | Deployment Basics → Inference Patterns → Drift Monitoring → Retraining Triggers → A/B Testing → Failure Handling → Bias & Fairness | Deploy + monitor a classification model |

### 1.4 — Add Routes in `App.tsx`

New routes to add:

```
/tracks                          → TracksPage (new)
/tracks/:trackId                 → TrackDetailPage (new)
/learning-paths                  → LearningPathsPage (new)
/learning-paths/:pathId          → PathDetailPage (new)
/simulators/missing-data         → MissingDataSimulator
/simulators/class-imbalance      → ClassImbalanceSimulator
/simulators/tree-vs-forest       → TreeVsForestSimulator
/simulators/eval-metrics         → EvalMetricsSimulator
/simulators/prompt-engineering   → PromptEngineeringSimulator
/simulators/rag                  → RAGSimulator (replaces /rag or augments it)
/simulators/drift-monitoring     → DriftMonitoringSimulator
+ routes for each new topic module
```

---

## Phase 2 — New Pages & Navigation

> **Goal:** Replace the flat ML Models list with a structured, trackable browsing experience.

### 2.1 — Refactor `LetsLearnPage.tsx` (Homepage)

**Changes:**
- Replace current 4-card "Choose Your Pathway" section with two new sections:
  1. **Learning Tracks** — 7 track cards in a grid, linking to `/tracks/:id`
  2. **Learning Paths** — Featured 5 paths as a horizontal scroll or 3-col grid, linking to `/learning-paths/:id`
- Keep the particle canvas hero unchanged
- Keep the 3-feature grid at the bottom
- Add a "Scenario Simulators" highlight strip (e.g., banner or card row) between the two new sections

### 2.2 — Create `TracksPage.tsx`

- URL: `/tracks`
- Shows all 7 tracks as large cards
- Each card: icon, title, description, topic count, difficulty range, CTA → track detail

### 2.3 — Create `TrackDetailPage.tsx`

- URL: `/tracks/:trackId`
- Header with track name, description, progress bar placeholder
- Topic list: ordered cards showing difficulty tag, estimated time, prereqs, "start" button
- Sidebar or inline "Related Paths" callout

### 2.4 — Create `LearningPathsPage.tsx`

- URL: `/learning-paths`
- 5 path cards: goal, prereq level, estimated hours, topic count, mini-project teaser

### 2.5 — Create `PathDetailPage.tsx`

- URL: `/learning-paths/:pathId`
- Roadmap-style vertical stepper showing ordered topics
- Each step: topic name, difficulty tag, estimated time, status (not started / in progress / done — local state only for now)
- Mini-project card at the bottom
- "Start Path" CTA opens the first topic

### 2.6 — Update `Navbar.tsx`

Replace current nav items with a streamlined set:

| Label | Route |
|---|---|
| Home | `/` |
| Tracks | `/tracks` |
| Learning Paths | `/learning-paths` |
| Simulators | `/simulators` (new overview page) |
| About | `/about` |

Remove: `Data Science Concepts`, `ML Models`, `AI Concepts`, `Roadmaps`, `Resources` as top-level links (they fold into Tracks).

### 2.7 — Refactor `MLModelsPage.tsx` → Redirect or repurpose

Option A (recommended): redirect `/ml-models` → `/tracks/model-training` to preserve backlinks.  
Option B: keep `MLModelsPage` but add a track filter sidebar replacing the current pill filters.

---

## Phase 3 — Topic Module Enhancements

> **Goal:** Add prereq labels, difficulty tags, and "next topic" suggestions to every existing module page.

### 3.1 — Create `src/components/TopicHeader.tsx`

Reusable header component for every module page:

```tsx
interface TopicHeaderProps {
  title: string
  track: string
  trackRoute: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  prerequisites: { title: string; route: string }[]
  paths: { title: string; route: string }[]
}
```

Renders: breadcrumb (Track → Topic), difficulty badge, time badge, prereq chips, path membership chips.

### 3.2 — Create `src/components/NextTopicBar.tsx`

Fixed or sticky bottom bar on each module page:

```tsx
interface NextTopicBarProps {
  nextTopic: { title: string; route: string }
  currentPath?: { title: string; stepN: number; totalSteps: number }
}
```

### 3.3 — Update All 21 Existing Module Pages

For each module:
1. Import and render `<TopicHeader />` at top, passing data from `models.ts`
2. Import and render `<NextTopicBar />` at bottom
3. No changes to existing simulator logic

**Effort estimate:** ~30–45 min per module, bulk-templatable.

### 3.4 — Build New Topic Modules (Stub + Explainer First)

Priority order for new modules (each gets a basic explainer + simple interactive before full simulator):

1. Missing Data (needed by Beginner ML path)
2. Evaluation Metrics (needed by Beginner ML path)
3. Class Imbalance (needed by Intermediate ML path)
4. Tokenization (needed by NLP path)
5. Embeddings (needed by NLP + GenAI paths)
6. LLM Basics (needed by GenAI path)
7. Prompt Engineering
8. Drift Monitoring (needed by Production AI path)
9. Deployment Basics
10. Hallucination Control, Chunking, Retrieval Quality, Bias & Fairness, Privacy, Safety (fill remaining gaps)

---

## Phase 4 — Scenario-Based Simulators

> **Goal:** Build 7 priority scenario simulators using a shared layout system.

### 4.1 — Create `src/components/SimulatorShell.tsx`

The standard 4-panel layout used by every simulator:

```tsx
interface SimulatorShellProps {
  scenario: {
    title: string
    situation: string    // 1-paragraph real-world setup
    userGoal: string     // "Your goal: ..."
    coreQuestion: string // "What happens if I change X?"
  }
  mode: 'Guided' | 'Explore' | 'Challenge'
  onModeChange: (mode) => void
  controlsPanel: React.ReactNode
  resultsPanel: React.ReactNode
  explanationPanel: React.ReactNode
  onRetry?: () => void
}
```

**Layout structure:**
```
┌─────────────────────────────────────────────┐
│  Mode tabs: [Guided] [Explore] [Challenge]  │
├───────────────────┬─────────────────────────┤
│  Scenario Card    │  Results Panel          │
│  (situation +     │  (charts / metrics /    │
│   goal)           │   tables / outputs)     │
├───────────────────┼─────────────────────────┤
│  Controls Panel   │  Explanation Panel      │
│  (sliders,        │  (what changed & why,   │
│   dropdowns)      │   auto-updates)         │
└───────────────────┴─────────────────────────┘
```

**Three modes:**
- **Guided** — controls are stepped/unlocked one at a time with hints
- **Explore** — all controls unlocked, free experimentation
- **Challenge** — goal is given, user must hit a target metric; scored

### 4.2 — Simulator 1: Missing Data (`/simulators/missing-data`)

**Scenario:** You're a data scientist at a hospital. Patient records have missing lab values. Your model's accuracy drops. Fix it.

**Core question:** *"Which imputation strategy gives the best model performance?"*

**Controls:**
- Missing rate slider (0–60%)
- Missing pattern: Random / Systematic / Block
- Imputation strategy: Drop rows / Mean / Median / Mode / KNN Impute / Forward Fill
- Model: Logistic Regression / Decision Tree

**Outputs:**
- Dataset preview table (before/after)
- Missing value heatmap
- Model accuracy bar chart comparing strategies
- Confusion matrix

**New simulator logic in `src/simulators/MissingData.ts`**

### 4.3 — Simulator 2: Class Imbalance (`/simulators/class-imbalance`)

**Scenario:** Your fraud detection model flags 0 fraudulent transactions despite 95% accuracy. The dataset has 1% fraud cases.

**Core question:** *"How does resampling and threshold tuning affect fraud detection?"*

**Controls:**
- Fraud rate slider (1–30%)
- Decision threshold slider (0.1–0.9)
- Resampling: None / SMOTE / Undersample Majority / Oversample Minority
- Model: Logistic Regression

**Outputs:**
- Precision / Recall / F1 gauge charts
- Confusion matrix (live update)
- ROC curve with threshold marker
- Class distribution bar

**New simulator logic in `src/simulators/ClassImbalance.ts`**

### 4.4 — Simulator 3: Decision Tree vs Random Forest (`/simulators/tree-vs-forest`)

**Scenario:** You're choosing a model for a noisy customer churn dataset. Which one generalizes better?

**Core question:** *"How does model complexity and ensemble size affect overfitting?"*

**Controls:**
- Max tree depth (1–15)
- Number of trees in forest (1–200, only for RF)
- Dataset noise level (low / medium / high)
- Train/test split ratio

**Outputs:**
- Side-by-side decision boundary plots
- Train accuracy vs Test accuracy bar chart (both models)
- Bias-variance decomposition visual
- Tree visualizer (existing `TreeVisualizer.tsx` component reused)

**Reuses existing `DecisionTree.ts` and `RandomForest.ts` simulator logic**

### 4.5 — Simulator 4: Evaluation Metrics (`/simulators/eval-metrics`)

**Scenario:** You're deploying a cancer screening model. Do you optimize for precision or recall?

**Core question:** *"What happens when I shift the optimization target?"*

**Controls:**
- Threshold slider (0.01–0.99)
- Toggle: Optimize for Recall / Precision / F1 / Accuracy
- Disease prevalence slider (affects base rate)
- Predicted probability distribution toggle (well-calibrated / overconfident)

**Outputs:**
- Live Precision / Recall / F1 / Accuracy metrics
- Confusion matrix (animated on change)
- PR curve and ROC curve with moving threshold dot
- Cost analysis panel (false negative cost vs false positive cost)

**New simulator logic in `src/simulators/EvalMetrics.ts`**

### 4.6 — Simulator 5: Prompt Engineering (`/simulators/prompt-engineering`)

**Scenario:** You're building a customer support bot. Its answers keep being too vague or off-topic.

**Core question:** *"How does prompt structure change model output quality?"*

**Controls:**
- Prompt style: Zero-shot / One-shot / Few-shot / Chain-of-thought
- Tone: Formal / Casual / Technical
- Examples count (0–5, for few-shot)
- Instruction clarity: Vague / Moderate / Specific
- Context provided: None / Partial / Full

**Outputs:**
- Simulated LLM response (pre-generated realistic samples per combination, no live API needed)
- Quality scorecard: Relevance / Completeness / Tone match / Hallucination risk
- Diff view: side-by-side before/after prompt comparison
- Prompt preview panel (shows constructed prompt)

**Implementation note:** Responses are pre-authored JSON lookup table (no API cost). ~20 combinations × 3 scenarios.

### 4.7 — Simulator 6: RAG Quality (`/simulators/rag`)

**Scenario:** You're building a document Q&A system. Users complain answers are wrong or missing key info.

**Core question:** *"How do chunk size, overlap, and top-k retrieval affect answer quality?"*

**Controls:**
- Chunk size (128 / 256 / 512 / 1024 tokens)
- Chunk overlap (0% / 10% / 25% / 50%)
- Top-k retrieved chunks (1–10)
- Retrieval method: Keyword / Semantic / Hybrid
- Source grounding: On / Off (grounded answers vs hallucinated)

**Outputs:**
- Retrieved chunk viewer (shows which chunks were selected)
- Answer quality scorecard: Faithfulness / Relevance / Completeness
- Context window visualization (how much of window is filled)
- Hallucination risk indicator

**Extends existing `RAGModule.tsx`** — new SimulatorShell wrapper around existing logic

### 4.8 — Simulator 7: Drift Monitoring (`/simulators/drift-monitoring`)

**Scenario:** Your deployed model was 94% accurate at launch. 3 months later it's at 71%. Something changed.

**Core question:** *"How does feature drift affect model performance over time?"*

**Controls:**
- Simulate time: week slider (1–52)
- Drift type: None / Gradual / Sudden / Seasonal
- Drifting feature: Age distribution / Income range / Product category mix
- Drift severity: Low / Medium / High
- Retrain trigger: Manual / Auto (threshold-based)

**Outputs:**
- Accuracy-over-time line chart with drift markers
- Feature distribution comparison (before vs current) — histogram
- PSI (Population Stability Index) gauge
- Alert log panel: when drift was detected, severity
- "Trigger Retrain" button that resets the accuracy curve

**New simulator logic in `src/simulators/DriftMonitoring.ts`**

---

## Phase 5 — Polish & Cross-Linking

> **Goal:** Wire everything together for seamless navigation.

### 5.1 — Cross-links on Topic Pages

Every module page footer links:
- "This topic is part of: [Path A], [Path B]" → links to path detail
- "Next in [Path Name]: [Next Topic]" → rendered by `NextTopicBar`
- "Also in track: [Track Name]" → breadcrumb from `TopicHeader`

### 5.2 — Simulators Overview Page (`/simulators`)

New page listing all 7 scenario simulators as cards with:
- Scenario teaser (one sentence)
- Core question
- Difficulty badge
- "Launch Simulator" CTA

### 5.3 — Homepage Learning Paths Section

Add to `LetsLearnPage.tsx` below the tracks section:
- Section title: "Guided Learning Paths"
- Horizontal scroll row of 5 path cards
- Each card: title, goal, hours, difficulty, mini-project name, "View Path" CTA

---

## Implementation Order (Recommended)

```
Phase 1 → Phase 2.1–2.6 → Phase 3.1–3.2 → Phase 4.1 → Phase 4.2–4.8 (parallel) → Phase 3.3–3.4 → Phase 5
```

| Phase | Effort Estimate | Blocks |
|---|---|---|
| 1 — Data & Routing | 1–2 days | Nothing |
| 2 — Pages & Nav | 3–4 days | Phase 1 |
| 3 — Module Enhancements | 3–5 days | Phase 1, 2 |
| 4 — Simulators | 8–12 days | Phase 1, 4.1 first |
| 5 — Polish | 1–2 days | All above |

**Total estimated effort: ~16–25 days** (solo developer, part-time)

---

## Key Reuse Opportunities

| Existing Asset | Reused In |
|---|---|
| `TreeVisualizer.tsx` | Simulator 3 (Tree vs Forest) |
| `DecisionTree.ts` / `RandomForest.ts` | Simulator 3 |
| `RAGModule.tsx` logic | Simulator 6 (RAG Quality) |
| `Slider.tsx`, `ControlPanel.tsx` | All 7 simulators |
| `Quiz.tsx` | Challenge mode in simulators |
| `ClassificationPlot.tsx` | Simulators 2, 3, 4 |
| `SimplePlot.tsx` | Simulators 1, 7 |
| `ModelCard.tsx` | Track and Path pages |

---

## Files to Create (Summary)

```
src/data/tracks.ts
src/data/learningPaths.ts
src/pages/TracksPage.tsx
src/pages/TrackDetailPage.tsx
src/pages/LearningPathsPage.tsx
src/pages/PathDetailPage.tsx
src/pages/SimulatorsPage.tsx
src/components/TopicHeader.tsx
src/components/NextTopicBar.tsx
src/components/SimulatorShell.tsx
src/simulators/MissingData.ts
src/simulators/ClassImbalance.ts
src/simulators/EvalMetrics.ts
src/simulators/DriftMonitoring.ts
src/pages/modules/MissingDataModule.tsx
src/pages/modules/ClassImbalanceModule.tsx
src/pages/modules/EvalMetricsModule.tsx
src/pages/modules/PromptEngineeringModule.tsx
src/pages/modules/DriftMonitoringModule.tsx
src/pages/modules/TokenizationModule.tsx
src/pages/modules/EmbeddingsModule.tsx
src/pages/modules/LLMBasicsModule.tsx
... (additional new topic modules)
```

## Files to Modify (Summary)

```
src/App.tsx               — add ~15 new routes
src/data/models.ts        — add track/path/prereq/nextTopics fields
src/components/Navbar.tsx — new nav items
src/pages/LetsLearnPage.tsx — new sections
src/pages/MLModelsPage.tsx  — redirect or repurpose
src/pages/modules/*.tsx     — add TopicHeader + NextTopicBar (all 21)
```
