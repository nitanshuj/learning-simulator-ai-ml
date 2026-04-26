# Implementation Log — ML Visualizer

## 1. Project Setup
- Vite + React + TypeScript scaffold
- Tailwind CSS with custom design tokens (spacing, colors, typography)
- Path aliases (`@/`) configured in `vite.config.ts` and `tsconfig.json`
- Google Fonts: **Quicksand** (body) + **Architects Daughter** (handwritten accents)

---

## 2. Core Components
| Component | Purpose |
|---|---|
| `Navbar.tsx` | Fixed top nav with ML Visualizer logo, nav links, Favorites button |
| `Footer.tsx` | Dark footer with links and newsletter |
| `Card.tsx` | Reusable card with optional title, hover, and onClick |
| `Button.tsx` | Pill-shaped button with variants (primary, outline, success, danger) |
| `Badge.tsx` | Small status/difficulty badge |
| `Pill.tsx` | Tag/label pill |
| `Quiz.tsx` | Interactive multiple-choice quiz |
| `ModelCard.tsx` | Model library card with icon, category color, "Coming Soon" state |

---

## 3. Data Layer
- `src/data/models.ts` — Central model registry with 10+ models including:
  - Linear Regression, Logistic Regression, Gradient Descent (Active)
  - K-Means, Decision Tree, SVM, KNN, Random Forest, PCA, Naive Bayes (Coming Soon)
- `ModelData` interface with `category`, `difficulty`, `status`, `icon`, `color` fields

---

## 4. Simulator Engines (`src/simulators/`)
| Engine | Key Features |
|---|---|
| `LinearRegression.ts` | Gradient descent training, MSE loss, R², predictions |
| `LogisticRegression.ts` | Sigmoid, binary cross-entropy loss, decision boundary |
| `GradientDescent.ts` | Multiple cost functions (quadratic, bowl, valley, saddle, local minima), convergence detection |

---

## 5. Visualization Components
| Component | Library | What it shows |
|---|---|---|
| `Visualization2D.tsx` | Plotly | Scatter + fitted line + residuals + MSE/R² annotations |
| `LossVisualization.tsx` | Plotly | Loss curve over training iterations (log scale) |
| `ResidualsVisualization.tsx` | Plotly | Residuals histogram |
| `OptimizationPlot.tsx` | Plotly | 2D contour map or 3D surface with gradient descent path |
| `ClassificationPlot.tsx` | Plotly | Heatmap probability background + decision boundary line |

> **Plotly package:** `plotly.js-dist-min` (browser-safe pre-bundled version)

---

## 6. Interactive Module Pages (`src/pages/modules/`)
| Module | Controls | Visualization |
|---|---|---|
| `LinearRegressionModule.tsx` | Slope/intercept sliders, training, residuals toggle | Scatter + fitted line + loss curve |
| `GradientDescentModule.tsx` | Learning rate, cost function selector, step/run/reset | 2D contour or 3D surface with path |
| `LogisticRegressionModule.tsx` | Learning rate, dataset selector, train/reset | Heatmap + decision boundary |

All modules include a **Quiz** section at the bottom.

---

## 7. Home Page (`src/pages/HomePage.tsx`)
- **Hero section** — centered title with handwritten "Visually" highlight + wavy underline SVG
- **Search bar** — live search filtering model cards
- **Filter pills** — All Models / Supervised / Unsupervised / Classification / Regression / Clustering / Dimensionality Reduction
- **Model grid** — responsive 5-column grid
- **Bottom banner** — "More models coming soon!" indigo strip

---

## 8. Navigation (`src/App.tsx`)
- State-based routing: `home | linear-regression | gradient-descent | logistic-regression`
- Fixed back-arrow button when inside a module
- Only `Active` models are clickable; `Coming Soon` cards are disabled

---

## 9. Bug Fixes
- Restored `onClick` prop to `Card.tsx` (cards were not navigating)
- Fixed Plotly import — installed `plotly.js-dist-min`, reverted from `plotly.js` source (which has Node.js-only `buffer/` dependencies breaking Vite)
- Restored `gradient-descent` model entry that was lost during data file refactor
- Removed stale imports for old sections (`HeroSection`, `HowItWorks`, etc.) from `HomePage.tsx`
