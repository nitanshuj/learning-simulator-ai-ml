export type RoadmapId =
  | 'ai-engineer'
  | 'ml-engineer'
  | 'data-scientist'
  | 'forward-deployed-engineer'

export interface SkillItem {
  id: string
  text: string
  simulatorRoute?: string
  simulatorLabel?: string
}

export interface SkillCategory {
  id: string
  name: string
  items: SkillItem[]
}

export interface RoadmapStage {
  id: string
  stageNumber: number
  title: string
  subtitle: string
  duration: string
  description: string
  keyMilestone: string
  tools: string[]
  skills: SkillItem[]
}

export interface AuthorCitation {
  name: string
  role: string
  linkedinUrl: string
  websiteUrl?: string
  quote: string
  note?: string
}

export interface Roadmap {
  id: RoadmapId
  title: string
  badge: string
  subtitle: string
  description: string
  icon: string
  gradient: string
  accentColor: string
  borderHover: string
  bgLight: string
  estimatedMonths: string
  difficulty: 'Beginner \u2192 Advanced' | 'Intermediate \u2192 Advanced'
  targetAudience: string
  primaryStack: string[]
  authorCitation?: AuthorCitation
  categories: SkillCategory[]
  stages?: RoadmapStage[]
}

export const aiEngineerSkills: SkillCategory[] = [
  {
    id: 'technical-foundation',
    name: 'Technical Foundation',
    items: [
      { id: 'technical-foundation::basic-statistics-and-probability', text: 'Basic statistics and probability' },
      { id: 'technical-foundation::probability-distributions', text: 'Probability distributions' },
      { id: 'technical-foundation::averages-and-variance', text: 'Averages and variance' },
      { id: 'technical-foundation::basic-linear-algebra-vectors-and-matrices', text: 'Basic linear algebra: vectors and matrices', simulatorRoute: '/modules/pca', simulatorLabel: 'PCA Matrix Sim' },
      { id: 'technical-foundation::basic-calculus-derivatives-and-gradients', text: 'Basic calculus: derivatives and gradients', simulatorRoute: '/gradientdescent', simulatorLabel: 'Gradient Sim' },
      { id: 'technical-foundation::understanding-of-numerical-precision-formats', text: 'Understanding of numerical precision formats' },
      { id: 'technical-foundation::data-structures-and-algorithms-fundamentals', text: 'Data structures and algorithms fundamentals' },
      { id: 'technical-foundation::intuition-for-the-concepts-rather-than-doing-the-math-by-han', text: 'Intuition for the concepts, rather than doing the math by hand' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    items: [
      { id: 'python::functions-and-classes', text: 'Functions and classes' },
      { id: 'python::core-data-structures-and-when-to-use-each', text: 'Core data structures, and when to use each' },
      { id: 'python::error-handling', text: 'Error handling' },
      { id: 'python::reading-a-traceback-to-find-the-real-problem', text: 'Reading a traceback to find the real problem' },
      { id: 'python::working-with-apis', text: 'Working with APIs' },
      { id: 'python::using-third-party-libraries', text: 'Using third-party libraries' },
      { id: 'python::writing-python-without-an-ai-finishing-your-lines', text: 'Writing Python without an AI finishing your lines' },
    ],
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    items: [
      { id: 'software-engineering::structuring-a-project', text: 'Structuring a project' },
      { id: 'software-engineering::git-and-version-control', text: 'Git and version control' },
      { id: 'software-engineering::virtual-environments', text: 'Virtual environments' },
      { id: 'software-engineering::config-files-instead-of-hardcoded-settings', text: 'Config files instead of hardcoded settings' },
      { id: 'software-engineering::writing-tests', text: 'Writing tests' },
      { id: 'software-engineering::linux-and-command-line-tools', text: 'Linux and command-line tools' },
      { id: 'software-engineering::enough-backend-to-ship-without-being-a-backend-expert', text: 'Enough backend to ship, without being a backend expert' },
    ],
  },
  {
    id: 'ml-basics',
    name: 'ML Basics',
    items: [
      { id: 'ml-basics::supervised-vs-unsupervised-learning', text: 'Supervised vs. unsupervised learning', simulatorRoute: '/ml-models', simulatorLabel: 'ML Models Explorer' },
      { id: 'ml-basics::common-algorithms-at-a-high-level', text: 'Common algorithms at a high level', simulatorRoute: '/linearregression', simulatorLabel: 'Linear Reg Sim' },
      { id: 'ml-basics::training-validation-test-splits', text: 'Training/validation/test splits', simulatorRoute: '/modules/train-test-split', simulatorLabel: 'Split Explorer' },
      { id: 'ml-basics::overfitting-and-underfitting', text: 'Overfitting and underfitting', simulatorRoute: '/modules/bias-variance', simulatorLabel: 'Bias-Variance Sim' },
      { id: 'ml-basics::model-evaluation-metrics-precision-recall', text: 'Model evaluation metrics: precision, recall', simulatorRoute: '/simulators/eval-metrics', simulatorLabel: 'Eval Metrics Sim' },
      { id: 'ml-basics::neural-networks-at-a-high-level', text: 'Neural networks at a high level' },
      { id: 'ml-basics::strong-deep-learning-knowledge', text: 'Strong deep learning knowledge' },
    ],
  },
  {
    id: 'foundation-models-and-model-selection',
    name: 'Foundation Models & Model Selection',
    items: [
      { id: 'foundation-models-and-model-selection::transformer-architecture', text: 'Transformer architecture', simulatorRoute: '/transformers', simulatorLabel: 'Interactive Transformer' },
      { id: 'foundation-models-and-model-selection::attention-mechanism', text: 'Attention mechanism', simulatorRoute: '/transformers', simulatorLabel: 'Self-Attention Visualizer' },
      { id: 'foundation-models-and-model-selection::tokenization', text: 'Tokenization', simulatorRoute: '/modules/tokenization', simulatorLabel: 'Tokenizer Lab' },
      { id: 'foundation-models-and-model-selection::post-training-techniques-sft-rlhf-dpo', text: 'Post-training techniques: SFT, RLHF, DPO' },
      { id: 'foundation-models-and-model-selection::tradeoffs-performance-vs-cost-vs-speed-vs-licensing', text: 'Tradeoffs: performance vs. cost vs. speed vs. licensing' },
      { id: 'foundation-models-and-model-selection::open-weight-vs-open-source-vs-api-models', text: 'Open-weight vs. open-source vs. API models' },
      { id: 'foundation-models-and-model-selection::tooling-for-model-benchmarking', text: 'Tooling for model benchmarking' },
    ],
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    items: [
      { id: 'prompt-engineering::structuring-effective-prompts', text: 'Structuring effective prompts', simulatorRoute: '/simulators/prompt-engineering', simulatorLabel: 'Prompt Simulator' },
      { id: 'prompt-engineering::few-shot-and-in-context-learning', text: 'Few-shot and in-context learning', simulatorRoute: '/simulators/prompt-engineering', simulatorLabel: 'Few-Shot Playground' },
      { id: 'prompt-engineering::structured-outputs', text: 'Structured outputs (JSON, Pydantic, tool calls)' },
      { id: 'prompt-engineering::defensive-prompt-engineering-against-attacks', text: 'Defensive prompt engineering against attacks' },
      { id: 'prompt-engineering::prompt-experimentation-and-tracking', text: 'Prompt experimentation and tracking' },
      { id: 'prompt-engineering::testing-changes-systematically-instead-of-eyeballing-them', text: 'Testing changes systematically instead of eyeballing them' },
    ],
  },
  {
    id: 'context-engineering',
    name: 'Context Engineering',
    items: [
      { id: 'context-engineering::deciding-what-the-model-sees-and-in-what-order', text: 'Deciding what the model sees, and in what order', simulatorRoute: '/modules/context-windows', simulatorLabel: 'Context Window Guide' },
      { id: 'context-engineering::deciding-what-gets-cut-when-there-s-too-much', text: "Deciding what gets cut when there's too much" },
      { id: 'context-engineering::context-construction-patterns', text: 'Context construction patterns' },
      { id: 'context-engineering::conversation-history-and-memory-management', text: 'Conversation history and memory management' },
      { id: 'context-engineering::token-budgeting', text: 'Token budgeting' },
    ],
  },
  {
    id: 'retrieval-augmented-generation',
    name: 'Retrieval-Augmented Generation',
    items: [
      { id: 'retrieval-augmented-generation::vector-database-implementation', text: 'Vector database implementation', simulatorRoute: '/modules/vector-databases', simulatorLabel: 'Vector DBs' },
      { id: 'retrieval-augmented-generation::document-chunking-strategies', text: 'Document chunking strategies', simulatorRoute: '/modules/chunking', simulatorLabel: 'Chunking Lab' },
      { id: 'retrieval-augmented-generation::embedding-techniques', text: 'Embedding techniques', simulatorRoute: '/modules/embeddings', simulatorLabel: 'Embedding Sim' },
      { id: 'retrieval-augmented-generation::term-based-vs-embedding-based-retrieval', text: 'Term-based vs. embedding-based retrieval', simulatorRoute: '/tf-idf', simulatorLabel: 'TF-IDF vs Embeddings' },
      { id: 'retrieval-augmented-generation::retrieval-optimization-techniques', text: 'Retrieval optimization techniques (Reranking, Hybrid Search)', simulatorRoute: '/rag', simulatorLabel: 'Interactive RAG Module' },
    ],
  },
  {
    id: 'evaluation-and-testing',
    name: 'Evaluation and Testing',
    items: [
      { id: 'evaluation-and-testing::model-evaluation-pipelines', text: 'Model evaluation pipelines', simulatorRoute: '/simulators/eval-metrics', simulatorLabel: 'Eval Pipeline Sim' },
      { id: 'evaluation-and-testing::building-test-sets', text: 'Building test sets' },
      { id: 'evaluation-and-testing::metrics-perplexity-bleu-rouge-semantic-similarity-functional', text: 'Metrics: perplexity, BLEU, ROUGE, semantic similarity, functional correctness' },
      { id: 'evaluation-and-testing::ai-judges-and-human-evals', text: 'AI judges and human evals' },
      { id: 'evaluation-and-testing::measuring-hallucinations-toxicity-bias', text: 'Measuring hallucinations, toxicity, bias', simulatorRoute: '/modules/hallucination-control', simulatorLabel: 'Hallucination Controls' },
    ],
  },
  {
    id: 'agent-systems',
    name: 'Agent Systems',
    items: [
      { id: 'agent-systems::tool-calling-and-integration', text: 'Tool calling and integration', simulatorRoute: '/modules/agents', simulatorLabel: 'Agent Tools Lab' },
      { id: 'agent-systems::planning-and-reflection-techniques', text: 'Planning and reflection techniques' },
      { id: 'agent-systems::memory-systems-implementation', text: 'Memory systems implementation' },
      { id: 'agent-systems::working-with-mcp', text: 'Working with Model Context Protocol (MCP)' },
      { id: 'agent-systems::agent-security-and-safety-guardrails', text: 'Agent security and safety guardrails' },
      { id: 'agent-systems::agent-evaluation-methodologies', text: 'Agent evaluation methodologies' },
      { id: 'agent-systems::multi-agent-system-design', text: 'Multi-agent system design' },
    ],
  },
  {
    id: 'finetuning',
    name: 'Finetuning',
    items: [
      { id: 'finetuning::parameter-efficient-fine-tuning-peft', text: 'Parameter-efficient fine-tuning (PEFT)' },
      { id: 'finetuning::lora-and-similar-approaches', text: 'LoRA and similar approaches (QLoRA)' },
      { id: 'finetuning::model-distillation', text: 'Model distillation' },
      { id: 'finetuning::model-merging', text: 'Model merging' },
      { id: 'finetuning::multi-task-fine-tuning', text: 'Multi-task fine-tuning' },
    ],
  },
  {
    id: 'dataset-engineering',
    name: 'Dataset Engineering',
    items: [
      { id: 'dataset-engineering::data-acquisition-strategies', text: 'Data acquisition strategies' },
      { id: 'dataset-engineering::data-quality-assessment', text: 'Data quality assessment', simulatorRoute: '/simulators/missing-data', simulatorLabel: 'Data Quality Sim' },
      { id: 'dataset-engineering::data-processing', text: 'Data processing' },
      { id: 'dataset-engineering::annotation-guidelines-creation', text: 'Annotation guidelines creation' },
      { id: 'dataset-engineering::data-augmentation-and-synthesis', text: 'Data augmentation and synthesis' },
    ],
  },
  {
    id: 'inference-optimization',
    name: 'Inference Optimization',
    items: [
      { id: 'inference-optimization::compute-vs-memory-bound-inference', text: 'Compute vs. memory-bound inference' },
      { id: 'inference-optimization::latency-metrics-ttft-tpot', text: 'Latency metrics: TTFT, TPOT' },
      { id: 'inference-optimization::model-compression-quantization-pruning-distillation', text: 'Model compression: quantization, pruning, distillation' },
      { id: 'inference-optimization::batch-vs-online-inference-strategies', text: 'Batch vs. online inference strategies' },
      { id: 'inference-optimization::hardware-gpu-tpu-memory-specs', text: 'Hardware (GPU, TPU, memory specs)' },
      { id: 'inference-optimization::batching-techniques', text: 'Batching techniques (Continuous batching, vLLM)' },
      { id: 'inference-optimization::parallel-inference-strategies', text: 'Parallel inference strategies (Tensor parallel, pipeline parallel)' },
      { id: 'inference-optimization::caching-implementations', text: 'Caching implementations (Prompt caching, semantic cache)' },
    ],
  },
  {
    id: 'application-architecture',
    name: 'Application Architecture',
    items: [
      { id: 'application-architecture::input-output-guardrails', text: 'Input/output guardrails' },
      { id: 'application-architecture::model-routing-and-gateways', text: 'Model routing and gateways' },
      { id: 'application-architecture::caching-architectures', text: 'Caching architectures' },
      { id: 'application-architecture::orchestration-patterns', text: 'Orchestration patterns' },
    ],
  },
  {
    id: 'production-engineering',
    name: 'Production Engineering',
    items: [
      { id: 'production-engineering::building-apis', text: 'Building APIs (FastAPI, streaming responses)' },
      { id: 'production-engineering::cloud-platforms', text: 'Cloud platforms (AWS, GCP, Azure, modal)' },
      { id: 'production-engineering::docker-and-containers', text: 'Docker and containers' },
      { id: 'production-engineering::basic-ci-cd', text: 'Basic CI/CD' },
      { id: 'production-engineering::monitoring-and-logging', text: 'Monitoring and logging (Traces, token spend, latencies)', simulatorRoute: '/simulators/drift-monitoring', simulatorLabel: 'Drift Simulator' },
      { id: 'production-engineering::debugging-what-went-wrong-in-production', text: 'Debugging what went wrong in production' },
      { id: 'production-engineering::cost-speed-and-security-under-real-traffic', text: 'Cost, speed, and security under real traffic' },
    ],
  },
  {
    id: 'security-privacy-ethics',
    name: 'Security / Privacy / Ethics',
    items: [
      { id: 'security-privacy-ethics::prompt-injection-detection-and-mitigation', text: 'Prompt injection detection and mitigation' },
      { id: 'security-privacy-ethics::adversarial-input-handling', text: 'Adversarial input handling' },
      { id: 'security-privacy-ethics::pii-detection-and-redaction', text: 'PII detection and redaction' },
      { id: 'security-privacy-ethics::secure-sandboxing-for-agents-and-code-execution', text: 'Secure sandboxing for agents and code execution' },
      { id: 'security-privacy-ethics::model-privacy-risks-memorization-attacks-data-leakage', text: 'Model privacy risks: memorization attacks, data leakage' },
      { id: 'security-privacy-ethics::legal-compliance-gdpr-copyright-implications', text: 'Legal compliance: GDPR, copyright implications' },
      { id: 'security-privacy-ethics::ai-ethics-considerations', text: 'AI ethics considerations', simulatorRoute: '/modules/bias-fairness', simulatorLabel: 'Ethics & Bias' },
    ],
  },
]

export const mlEngineerSkills: SkillCategory[] = [
  {
    "id": "technical-foundation",
    "name": "Technical Foundation",
    "items": [
      {
        "id": "mle::technical-foundation::basic-statistics-and-probability",
        "text": "Basic statistics and probability"
      },
      {
        "id": "mle::technical-foundation::probability-distributions-and-their-applications",
        "text": "Probability distributions and their applications"
      },
      {
        "id": "mle::technical-foundation::hypothesis-testing-and-p-values",
        "text": "Hypothesis testing and p-values"
      },
      {
        "id": "mle::technical-foundation::linear-algebra-vectors-matrices-matrix-factorizati",
        "text": "Linear algebra: vectors, matrices, matrix factorization",
        "simulatorRoute": "/modules/pca",
        "simulatorLabel": "PCA Matrix Sim"
      },
      {
        "id": "mle::technical-foundation::calculus-derivatives-gradients-chain-rule",
        "text": "Calculus: derivatives, gradients, chain rule",
        "simulatorRoute": "/gradientdescent",
        "simulatorLabel": "Gradient Sim"
      },
      {
        "id": "mle::technical-foundation::understanding-of-numerical-precision-float16-float",
        "text": "Understanding of numerical precision (float16, float32, bfloat16)"
      },
      {
        "id": "mle::technical-foundation::data-structures-and-algorithm-complexity-big-o",
        "text": "Data structures and algorithm complexity (Big-O)"
      },
      {
        "id": "mle::technical-foundation::information-theory-basics-entropy-kl-divergence",
        "text": "Information theory basics: entropy, KL divergence"
      }
    ]
  },
  {
    "id": "python-for-ml",
    "name": "Python for ML",
    "items": [
      {
        "id": "mle::python-for-ml::functions-classes-and-modules",
        "text": "Functions, classes, and modules"
      },
      {
        "id": "mle::python-for-ml::core-data-structures-and-when-to-use-each",
        "text": "Core data structures and when to use each"
      },
      {
        "id": "mle::python-for-ml::writing-readable-well-documented-code",
        "text": "Writing readable, well-documented code"
      },
      {
        "id": "mle::python-for-ml::virtual-environments-and-dependency-management",
        "text": "Virtual environments and dependency management"
      },
      {
        "id": "mle::python-for-ml::reading-and-debugging-tracebacks",
        "text": "Reading and debugging tracebacks"
      },
      {
        "id": "mle::python-for-ml::working-with-configuration-files-and-cli-arguments",
        "text": "Working with configuration files and CLI arguments"
      },
      {
        "id": "mle::python-for-ml::profiling-and-benchmarking-python-code",
        "text": "Profiling and benchmarking Python code"
      }
    ]
  },
  {
    "id": "data-engineering-wrangling",
    "name": "Data Engineering & Wrangling",
    "items": [
      {
        "id": "mle::data-engineering-wrangling::loading-and-parsing-data-with-pandas-and-polars",
        "text": "Loading and parsing data with Pandas and Polars"
      },
      {
        "id": "mle::data-engineering-wrangling::handling-missing-values-and-data-quality-issues",
        "text": "Handling missing values and data quality issues",
        "simulatorRoute": "/simulators/missing-data",
        "simulatorLabel": "Missing Data Sim"
      },
      {
        "id": "mle::data-engineering-wrangling::exploratory-data-analysis-eda-and-visualization",
        "text": "Exploratory data analysis (EDA) and visualization"
      },
      {
        "id": "mle::data-engineering-wrangling::feature-engineering-encoding-scaling-binning",
        "text": "Feature engineering: encoding, scaling, binning"
      },
      {
        "id": "mle::data-engineering-wrangling::working-with-large-datasets-that-don-t-fit-in-memo",
        "text": "Working with large datasets that don't fit in memory"
      },
      {
        "id": "mle::data-engineering-wrangling::sql-for-data-retrieval-and-transformation",
        "text": "SQL for data retrieval and transformation"
      },
      {
        "id": "mle::data-engineering-wrangling::building-reproducible-data-pipelines-e-g-dvc-prefe",
        "text": "Building reproducible data pipelines (e.g., DVC, Prefect, Airflow)"
      },
      {
        "id": "mle::data-engineering-wrangling::joining-aggregating-and-reshaping-structured-data",
        "text": "Joining, aggregating, and reshaping structured data"
      }
    ]
  },
  {
    "id": "core-ml-concepts",
    "name": "Core ML Concepts",
    "items": [
      {
        "id": "mle::core-ml-concepts::supervised-vs-unsupervised-vs-self-supervised-lear",
        "text": "Supervised vs. unsupervised vs. self-supervised learning"
      },
      {
        "id": "mle::core-ml-concepts::common-algorithms-linear-logistic-regression-decis",
        "text": "Common algorithms: linear/logistic regression, decision trees, SVMs, k-NN",
        "simulatorRoute": "/logisticregression",
        "simulatorLabel": "Logistic Sim"
      },
      {
        "id": "mle::core-ml-concepts::ensemble-methods-bagging-boosting-gradient-boosted",
        "text": "Ensemble methods: bagging, boosting, gradient boosted trees",
        "simulatorRoute": "/simulators/tree-vs-forest",
        "simulatorLabel": "Tree vs Forest Sim"
      },
      {
        "id": "mle::core-ml-concepts::training-validation-test-splits-and-cross-validati",
        "text": "Training/validation/test splits and cross-validation"
      },
      {
        "id": "mle::core-ml-concepts::overfitting-underfitting-and-bias-variance-tradeof",
        "text": "Overfitting, underfitting, and bias-variance tradeoff"
      },
      {
        "id": "mle::core-ml-concepts::regularization-techniques-l1-l2-dropout-early-stop",
        "text": "Regularization techniques: L1, L2, dropout, early stopping"
      },
      {
        "id": "mle::core-ml-concepts::hyperparameter-tuning-grid-search-random-search-ba",
        "text": "Hyperparameter tuning: grid search, random search, Bayesian optimization"
      },
      {
        "id": "mle::core-ml-concepts::dimensionality-reduction-pca-t-sne-umap",
        "text": "Dimensionality reduction: PCA, t-SNE, UMAP",
        "simulatorRoute": "/modules/pca",
        "simulatorLabel": "PCA Matrix Sim"
      }
    ]
  },
  {
    "id": "deep-learning",
    "name": "Deep Learning",
    "items": [
      {
        "id": "mle::deep-learning::feedforward-neural-networks-and-backpropagation",
        "text": "Feedforward neural networks and backpropagation",
        "simulatorRoute": "/gradientdescent",
        "simulatorLabel": "Gradient Sim"
      },
      {
        "id": "mle::deep-learning::convolutional-neural-networks-cnns-for-vision",
        "text": "Convolutional neural networks (CNNs) for vision"
      },
      {
        "id": "mle::deep-learning::recurrent-networks-rnns-lstms-grus-for-sequences",
        "text": "Recurrent networks: RNNs, LSTMs, GRUs for sequences"
      },
      {
        "id": "mle::deep-learning::transformer-architecture-and-self-attention",
        "text": "Transformer architecture and self-attention",
        "simulatorRoute": "/transformers",
        "simulatorLabel": "Transformer Sim"
      },
      {
        "id": "mle::deep-learning::loss-functions-and-when-to-use-each",
        "text": "Loss functions and when to use each"
      },
      {
        "id": "mle::deep-learning::optimizers-sgd-adam-adagrad-and-their-tradeoffs",
        "text": "Optimizers: SGD, Adam, AdaGrad, and their tradeoffs"
      },
      {
        "id": "mle::deep-learning::batch-normalization-layer-normalization",
        "text": "Batch normalization, layer normalization"
      },
      {
        "id": "mle::deep-learning::learning-rate-schedules-and-warm-up-strategies",
        "text": "Learning rate schedules and warm-up strategies"
      }
    ]
  },
  {
    "id": "ml-frameworks-tooling",
    "name": "ML Frameworks & Tooling",
    "items": [
      {
        "id": "mle::ml-frameworks-tooling::pytorch-training-loop-forward-pass-loss-backward-o",
        "text": "PyTorch training loop: forward pass, loss, backward, optimizer step"
      },
      {
        "id": "mle::ml-frameworks-tooling::tensorflow-keras-for-production-and-serving",
        "text": "TensorFlow / Keras for production and serving"
      },
      {
        "id": "mle::ml-frameworks-tooling::scikit-learn-for-classical-ml-pipelines",
        "text": "Scikit-learn for classical ML pipelines"
      },
      {
        "id": "mle::ml-frameworks-tooling::experiment-tracking-with-mlflow-or-w-b",
        "text": "Experiment tracking with MLflow or W&B"
      },
      {
        "id": "mle::ml-frameworks-tooling::debugging-nan-losses-and-training-instabilities",
        "text": "Debugging NaN losses and training instabilities"
      },
      {
        "id": "mle::ml-frameworks-tooling::profiling-gpu-utilization-and-memory-usage",
        "text": "Profiling GPU utilization and memory usage"
      }
    ]
  },
  {
    "id": "model-evaluation-metrics",
    "name": "Model Evaluation & Metrics",
    "items": [
      {
        "id": "mle::model-evaluation-metrics::classification-metrics-precision-recall-f1-auc-roc",
        "text": "Classification metrics: precision, recall, F1, AUC-ROC",
        "simulatorRoute": "/simulators/eval-metrics",
        "simulatorLabel": "Eval Metrics Sim"
      },
      {
        "id": "mle::model-evaluation-metrics::regression-metrics-rmse-mae-r-squared",
        "text": "Regression metrics: RMSE, MAE, R-squared"
      },
      {
        "id": "mle::model-evaluation-metrics::ranking-and-retrieval-metrics-ndcg-map-mrr",
        "text": "Ranking and retrieval metrics: NDCG, MAP, MRR"
      },
      {
        "id": "mle::model-evaluation-metrics::calibration-of-predicted-probabilities",
        "text": "Calibration of predicted probabilities"
      },
      {
        "id": "mle::model-evaluation-metrics::confusion-matrix-analysis-and-error-attribution",
        "text": "Confusion matrix analysis and error attribution"
      },
      {
        "id": "mle::model-evaluation-metrics::evaluation-under-distribution-shift-ood-performanc",
        "text": "Evaluation under distribution shift (OOD performance)"
      },
      {
        "id": "mle::model-evaluation-metrics::defining-a-meaningful-offline-evaluation-strategy-",
        "text": "Defining a meaningful offline evaluation strategy before training"
      }
    ]
  },
  {
    "id": "feature-stores-data-pipelines",
    "name": "Feature Stores & Data Pipelines",
    "items": [
      {
        "id": "mle::feature-stores-data-pipelines::difference-between-online-and-offline-feature-stor",
        "text": "Difference between online and offline feature stores"
      },
      {
        "id": "mle::feature-stores-data-pipelines::point-in-time-correctness-to-prevent-data-leakage",
        "text": "Point-in-time correctness to prevent data leakage"
      },
      {
        "id": "mle::feature-stores-data-pipelines::feature-versioning-and-lineage-tracking",
        "text": "Feature versioning and lineage tracking"
      },
      {
        "id": "mle::feature-stores-data-pipelines::building-a-training-data-pipeline-end-to-end",
        "text": "Building a training data pipeline end-to-end"
      },
      {
        "id": "mle::feature-stores-data-pipelines::using-tools-like-feast-tecton-or-hopsworks",
        "text": "Using tools like Feast, Tecton, or Hopsworks"
      }
    ]
  },
  {
    "id": "model-training-at-scale",
    "name": "Model Training at Scale",
    "items": [
      {
        "id": "mle::model-training-at-scale::distributed-training-data-parallelism-vs-model-par",
        "text": "Distributed training: data parallelism vs. model parallelism"
      },
      {
        "id": "mle::model-training-at-scale::mixed-precision-training-fp16-bf16-with-gradient-s",
        "text": "Mixed-precision training (fp16/bf16 with gradient scaling)"
      },
      {
        "id": "mle::model-training-at-scale::gradient-accumulation-and-checkpointing",
        "text": "Gradient accumulation and checkpointing"
      },
      {
        "id": "mle::model-training-at-scale::multi-gpu-training-with-ddp-or-fsdp",
        "text": "Multi-GPU training with DDP or FSDP"
      },
      {
        "id": "mle::model-training-at-scale::handling-training-instabilities-exploding-vanishin",
        "text": "Handling training instabilities (exploding/vanishing gradients)",
        "simulatorRoute": "/gradientdescent",
        "simulatorLabel": "Gradient Sim"
      },
      {
        "id": "mle::model-training-at-scale::efficient-data-loading-with-multi-process-dataload",
        "text": "Efficient data loading with multi-process DataLoaders"
      },
      {
        "id": "mle::model-training-at-scale::resuming-training-from-checkpoints-reliably",
        "text": "Resuming training from checkpoints reliably"
      }
    ]
  },
  {
    "id": "model-optimization-compression",
    "name": "Model Optimization & Compression",
    "items": [
      {
        "id": "mle::model-optimization-compression::quantization-post-training-and-quantization-aware-",
        "text": "Quantization: post-training and quantization-aware training"
      },
      {
        "id": "mle::model-optimization-compression::pruning-structured-vs-unstructured-sparsity",
        "text": "Pruning: structured vs. unstructured sparsity"
      },
      {
        "id": "mle::model-optimization-compression::knowledge-distillation-teacher-student-training",
        "text": "Knowledge distillation: teacher-student training"
      },
      {
        "id": "mle::model-optimization-compression::tensorrt-and-onnx-export-for-optimized-inference",
        "text": "TensorRT and ONNX export for optimized inference"
      },
      {
        "id": "mle::model-optimization-compression::benchmarking-latency-and-throughput-tradeoffs",
        "text": "Benchmarking latency and throughput tradeoffs"
      },
      {
        "id": "mle::model-optimization-compression::choosing-the-right-optimization-strategy-for-the-t",
        "text": "Choosing the right optimization strategy for the target hardware"
      }
    ]
  },
  {
    "id": "mlops-experimentation",
    "name": "MLOps & Experimentation",
    "items": [
      {
        "id": "mle::mlops-experimentation::version-control-for-models-datasets-and-configs",
        "text": "Version control for models, datasets, and configs"
      },
      {
        "id": "mle::mlops-experimentation::automated-retraining-pipelines-and-triggers",
        "text": "Automated retraining pipelines and triggers"
      },
      {
        "id": "mle::mlops-experimentation::a-b-testing-and-shadow-mode-deployments",
        "text": "A/B testing and shadow mode deployments"
      },
      {
        "id": "mle::mlops-experimentation::model-registry-for-staging-and-production",
        "text": "Model registry for staging and production"
      },
      {
        "id": "mle::mlops-experimentation::feature-flags-for-safe-rollouts",
        "text": "Feature flags for safe rollouts"
      },
      {
        "id": "mle::mlops-experimentation::building-reproducible-training-runs-seeds-determin",
        "text": "Building reproducible training runs (seeds, determinism, and config versioning)"
      },
      {
        "id": "mle::mlops-experimentation::documentation-experiment-logging-best-practices-an",
        "text": "Documentation, experiment logging best practices, and model lineage tracking"
      }
    ]
  },
  {
    "id": "production-deployment",
    "name": "Production Deployment",
    "items": [
      {
        "id": "mle::production-deployment::serving-models-with-rest-apis-fastapi-flask-torchs",
        "text": "Serving models with REST APIs (FastAPI, Flask, TorchServe)"
      },
      {
        "id": "mle::production-deployment::containerizing-ml-services-with-docker",
        "text": "Containerizing ML services with Docker"
      },
      {
        "id": "mle::production-deployment::kubernetes-basics-for-scalable-model-serving",
        "text": "Kubernetes basics for scalable model serving"
      },
      {
        "id": "mle::production-deployment::batch-inference-vs-real-time-inference-architectur",
        "text": "Batch inference vs. real-time inference architectures"
      },
      {
        "id": "mle::production-deployment::autoscaling-and-load-balancing-for-inference-endpo",
        "text": "Autoscaling and load balancing for inference endpoints"
      },
      {
        "id": "mle::production-deployment::blue-green-and-canary-deployment-strategies",
        "text": "Blue/green and canary deployment strategies"
      },
      {
        "id": "mle::production-deployment::cloud-ml-platforms-sagemaker-vertex-ai-azure-ml",
        "text": "Cloud ML platforms: SageMaker, Vertex AI, Azure ML"
      }
    ]
  },
  {
    "id": "monitoring-observability",
    "name": "Monitoring & Observability",
    "items": [
      {
        "id": "mle::monitoring-observability::data-drift-detection-in-production",
        "text": "Data drift detection in production",
        "simulatorRoute": "/simulators/drift-monitoring",
        "simulatorLabel": "Drift Sim"
      },
      {
        "id": "mle::monitoring-observability::model-performance-degradation-alerts",
        "text": "Model performance degradation alerts"
      },
      {
        "id": "mle::monitoring-observability::logging-predictions-inputs-and-feature-distributio",
        "text": "Logging predictions, inputs, and feature distributions"
      },
      {
        "id": "mle::monitoring-observability::setting-up-dashboards-for-model-health-grafana-dat",
        "text": "Setting up dashboards for model health (Grafana, DataDog)"
      },
      {
        "id": "mle::monitoring-observability::root-cause-analysis-of-production-model-failures",
        "text": "Root cause analysis of production model failures"
      },
      {
        "id": "mle::monitoring-observability::feedback-loops-capturing-ground-truth-labels-post-",
        "text": "Feedback loops: capturing ground truth labels post-deployment"
      }
    ]
  },
  {
    "id": "ml-system-design",
    "name": "ML System Design",
    "items": [
      {
        "id": "mle::ml-system-design::framing-a-business-problem-as-an-ml-problem",
        "text": "Framing a business problem as an ML problem"
      },
      {
        "id": "mle::ml-system-design::choosing-between-heuristics-classical-ml-and-deep-",
        "text": "Choosing between heuristics, classical ML, and deep learning"
      },
      {
        "id": "mle::ml-system-design::designing-a-training-serving-architecture-end-to-e",
        "text": "Designing a training-serving architecture end-to-end"
      },
      {
        "id": "mle::ml-system-design::estimating-compute-data-and-cost-requirements-upfr",
        "text": "Estimating compute, data, and cost requirements upfront"
      },
      {
        "id": "mle::ml-system-design::trade-offs-between-model-accuracy-and-system-laten",
        "text": "Trade-offs between model accuracy and system latency"
      }
    ]
  },
  {
    "id": "responsible-ai-ethics",
    "name": "Responsible AI & Ethics",
    "items": [
      {
        "id": "mle::responsible-ai-ethics::bias-detection-and-fairness-metrics-across-demogra",
        "text": "Bias detection and fairness metrics across demographic groups"
      },
      {
        "id": "mle::responsible-ai-ethics::interpretability-methods-shap-lime-attention-maps",
        "text": "Interpretability methods: SHAP, LIME, attention maps"
      },
      {
        "id": "mle::responsible-ai-ethics::model-cards-and-documentation-for-transparency",
        "text": "Model cards and documentation for transparency"
      },
      {
        "id": "mle::responsible-ai-ethics::data-privacy-considerations-and-regulatory-complia",
        "text": "Data privacy considerations and regulatory compliance (GDPR)"
      },
      {
        "id": "mle::responsible-ai-ethics::thinking-critically-about-the-downstream-impact-of",
        "text": "Thinking critically about the downstream impact of your model"
      }
    ]
  }
]

export const dataScientistSkills: SkillCategory[] = [
  {
    "id": "statistics-probability",
    "name": "Statistics & Probability",
    "items": [
      {
        "id": "ds::statistics-probability::descriptive-statistics-mean-median-variance-standa",
        "text": "Descriptive statistics: mean, median, variance, standard deviation"
      },
      {
        "id": "ds::statistics-probability::probability-theory-conditional-probability-bayes-t",
        "text": "Probability theory: conditional probability, Bayes theorem"
      },
      {
        "id": "ds::statistics-probability::common-distributions-normal-binomial-poisson-expon",
        "text": "Common distributions: normal, binomial, Poisson, exponential"
      },
      {
        "id": "ds::statistics-probability::central-limit-theorem-and-its-practical-implicatio",
        "text": "Central limit theorem and its practical implications"
      },
      {
        "id": "ds::statistics-probability::hypothesis-testing-t-tests-chi-square-anova",
        "text": "Hypothesis testing: t-tests, chi-square, ANOVA"
      },
      {
        "id": "ds::statistics-probability::p-values-and-statistical-significance-and-their-li",
        "text": "p-values and statistical significance (and their limitations)"
      },
      {
        "id": "ds::statistics-probability::confidence-intervals-and-margin-of-error",
        "text": "Confidence intervals and margin of error"
      },
      {
        "id": "ds::statistics-probability::correlation-vs-causation",
        "text": "Correlation vs. causation"
      },
      {
        "id": "ds::statistics-probability::effect-size-and-statistical-power",
        "text": "Effect size and statistical power"
      }
    ]
  },
  {
    "id": "python-for-data-science",
    "name": "Python for Data Science",
    "items": [
      {
        "id": "ds::python-for-data-science::data-manipulation-with-pandas-and-polars",
        "text": "Data manipulation with Pandas and Polars"
      },
      {
        "id": "ds::python-for-data-science::numerical-computing-with-numpy",
        "text": "Numerical computing with NumPy"
      },
      {
        "id": "ds::python-for-data-science::visualization-with-matplotlib-and-seaborn",
        "text": "Visualization with Matplotlib and Seaborn"
      },
      {
        "id": "ds::python-for-data-science::interactive-notebooks-with-jupyter",
        "text": "Interactive notebooks with Jupyter"
      },
      {
        "id": "ds::python-for-data-science::writing-reusable-functions-and-analysis-scripts",
        "text": "Writing reusable functions and analysis scripts"
      },
      {
        "id": "ds::python-for-data-science::virtual-environments-and-dependency-management",
        "text": "Virtual environments and dependency management"
      },
      {
        "id": "ds::python-for-data-science::reading-documentation-and-source-code-to-understan",
        "text": "Reading documentation and source code to understand library behavior"
      }
    ]
  },
  {
    "id": "data-wrangling-eda",
    "name": "Data Wrangling & EDA",
    "items": [
      {
        "id": "ds::data-wrangling-eda::loading-data-from-csv-json-parquet-databases",
        "text": "Loading data from CSV, JSON, Parquet, databases"
      },
      {
        "id": "ds::data-wrangling-eda::handling-missing-values-imputation-strategies-and-",
        "text": "Handling missing values: imputation strategies and trade-offs",
        "simulatorRoute": "/simulators/missing-data",
        "simulatorLabel": "Missing Data Sim"
      },
      {
        "id": "ds::data-wrangling-eda::detecting-and-treating-outliers",
        "text": "Detecting and treating outliers"
      },
      {
        "id": "ds::data-wrangling-eda::exploratory-data-analysis-distributions-correlatio",
        "text": "Exploratory data analysis: distributions, correlations, anomalies"
      },
      {
        "id": "ds::data-wrangling-eda::data-profiling-for-quality-assessment",
        "text": "Data profiling for quality assessment"
      },
      {
        "id": "ds::data-wrangling-eda::merging-joining-and-reshaping-datasets",
        "text": "Merging, joining, and reshaping datasets"
      },
      {
        "id": "ds::data-wrangling-eda::dealing-with-imbalanced-datasets",
        "text": "Dealing with imbalanced datasets",
        "simulatorRoute": "/simulators/class-imbalance",
        "simulatorLabel": "Imbalance Sim"
      },
      {
        "id": "ds::data-wrangling-eda::identifying-data-leakage-before-training",
        "text": "Identifying data leakage before training"
      }
    ]
  },
  {
    "id": "sql-databases",
    "name": "SQL & Databases",
    "items": [
      {
        "id": "ds::sql-databases::writing-complex-sql-joins-subqueries-window-functi",
        "text": "Writing complex SQL: joins, subqueries, window functions"
      },
      {
        "id": "ds::sql-databases::aggregations-and-group-by-patterns-for-analysis",
        "text": "Aggregations and GROUP BY patterns for analysis"
      },
      {
        "id": "ds::sql-databases::writing-queries-that-perform-well-at-scale",
        "text": "Writing queries that perform well at scale"
      },
      {
        "id": "ds::sql-databases::working-with-both-relational-and-nosql-data-stores",
        "text": "Working with both relational and NoSQL data stores"
      },
      {
        "id": "ds::sql-databases::extracting-features-from-production-databases-safe",
        "text": "Extracting features from production databases safely"
      },
      {
        "id": "ds::sql-databases::understanding-database-indexes-and-query-plans-at-",
        "text": "Understanding database indexes and query plans at a high level"
      },
      {
        "id": "ds::sql-databases::optimizing-query-execution-with-explain-analyze-an",
        "text": "Optimizing query execution with EXPLAIN ANALYZE and index tuning"
      }
    ]
  },
  {
    "id": "core-ml-concepts",
    "name": "Core ML Concepts",
    "items": [
      {
        "id": "ds::core-ml-concepts::supervised-vs-unsupervised-vs-self-supervised-lear",
        "text": "Supervised vs. unsupervised vs. self-supervised learning"
      },
      {
        "id": "ds::core-ml-concepts::linear-and-logistic-regression-in-depth",
        "text": "Linear and logistic regression in depth",
        "simulatorRoute": "/logisticregression",
        "simulatorLabel": "Logistic Sim"
      },
      {
        "id": "ds::core-ml-concepts::decision-trees-random-forests-and-gradient-boosted",
        "text": "Decision trees, random forests, and gradient boosted trees (XGBoost, LightGBM)",
        "simulatorRoute": "/simulators/tree-vs-forest",
        "simulatorLabel": "Tree vs Forest Sim"
      },
      {
        "id": "ds::core-ml-concepts::clustering-algorithms-k-means-dbscan-hierarchical",
        "text": "Clustering algorithms: k-means, DBSCAN, hierarchical",
        "simulatorRoute": "/kmeansclustering",
        "simulatorLabel": "K-Means Sim"
      },
      {
        "id": "ds::core-ml-concepts::training-validation-test-splits-and-cross-validati",
        "text": "Training/validation/test splits and cross-validation"
      },
      {
        "id": "ds::core-ml-concepts::bias-variance-tradeoff-and-regularization-l1-l2",
        "text": "Bias-variance tradeoff and regularization (L1, L2)"
      },
      {
        "id": "ds::core-ml-concepts::hyperparameter-tuning-grid-search-random-search-ba",
        "text": "Hyperparameter tuning: grid search, random search, Bayesian methods"
      },
      {
        "id": "ds::core-ml-concepts::dimensionality-reduction-pca-t-sne-umap",
        "text": "Dimensionality reduction: PCA, t-SNE, UMAP",
        "simulatorRoute": "/modules/pca",
        "simulatorLabel": "PCA Matrix Sim"
      }
    ]
  },
  {
    "id": "model-evaluation-metrics",
    "name": "Model Evaluation & Metrics",
    "items": [
      {
        "id": "ds::model-evaluation-metrics::classification-precision-recall-f1-auc-roc-log-los",
        "text": "Classification: precision, recall, F1, AUC-ROC, log loss"
      },
      {
        "id": "ds::model-evaluation-metrics::regression-rmse-mae-r-squared-mape",
        "text": "Regression: RMSE, MAE, R-squared, MAPE"
      },
      {
        "id": "ds::model-evaluation-metrics::ranking-and-recommendation-metrics-ndcg-map",
        "text": "Ranking and recommendation metrics: NDCG, MAP"
      },
      {
        "id": "ds::model-evaluation-metrics::calibration-of-predicted-probabilities",
        "text": "Calibration of predicted probabilities"
      },
      {
        "id": "ds::model-evaluation-metrics::confusion-matrix-analysis-and-error-decomposition",
        "text": "Confusion matrix analysis and error decomposition"
      },
      {
        "id": "ds::model-evaluation-metrics::choosing-the-right-metric-for-the-business-problem",
        "text": "Choosing the right metric for the business problem"
      },
      {
        "id": "ds::model-evaluation-metrics::evaluating-models-under-distribution-shift-ood-dat",
        "text": "Evaluating models under distribution shift (OOD data)"
      }
    ]
  },
  {
    "id": "experimentation-a-b-testing",
    "name": "Experimentation & A/B Testing",
    "items": [
      {
        "id": "ds::experimentation-a-b-testing::designing-statistically-valid-a-b-tests",
        "text": "Designing statistically valid A/B tests"
      },
      {
        "id": "ds::experimentation-a-b-testing::sample-size-calculation-and-power-analysis",
        "text": "Sample size calculation and power analysis"
      },
      {
        "id": "ds::experimentation-a-b-testing::handling-multiple-testing-and-type-i-error-inflati",
        "text": "Handling multiple testing and Type I error inflation"
      },
      {
        "id": "ds::experimentation-a-b-testing::interpreting-experiment-results-without-overfittin",
        "text": "Interpreting experiment results without overfitting to noise"
      },
      {
        "id": "ds::experimentation-a-b-testing::novelty-effects-and-how-to-account-for-them",
        "text": "Novelty effects and how to account for them"
      },
      {
        "id": "ds::experimentation-a-b-testing::bayesian-vs-frequentist-approaches-to-experimentat",
        "text": "Bayesian vs. frequentist approaches to experimentation"
      }
    ]
  },
  {
    "id": "deep-learning-fundamentals",
    "name": "Deep Learning Fundamentals",
    "items": [
      {
        "id": "ds::deep-learning-fundamentals::neural-network-architecture-layers-activations-for",
        "text": "Neural network architecture: layers, activations, forward pass"
      },
      {
        "id": "ds::deep-learning-fundamentals::backpropagation-and-gradient-descent-intuitively",
        "text": "Backpropagation and gradient descent intuitively",
        "simulatorRoute": "/gradientdescent",
        "simulatorLabel": "Gradient Sim"
      },
      {
        "id": "ds::deep-learning-fundamentals::cnns-for-vision-and-rnns-transformers-for-sequence",
        "text": "CNNs for vision and RNNs / transformers for sequences"
      },
      {
        "id": "ds::deep-learning-fundamentals::transfer-learning-and-pretrained-models",
        "text": "Transfer learning and pretrained models"
      },
      {
        "id": "ds::deep-learning-fundamentals::pytorch-or-tensorflow-basics-for-building-and-trai",
        "text": "PyTorch or TensorFlow basics for building and training models"
      },
      {
        "id": "ds::deep-learning-fundamentals::fine-tuning-pretrained-embeddings-and-language-mod",
        "text": "Fine-tuning pretrained embeddings and language models"
      },
      {
        "id": "ds::deep-learning-fundamentals::knowing-when-deep-learning-is-overkill",
        "text": "Knowing when deep learning is overkill"
      }
    ]
  },
  {
    "id": "feature-engineering",
    "name": "Feature Engineering",
    "items": [
      {
        "id": "ds::feature-engineering::encoding-categorical-variables-one-hot-target-ordi",
        "text": "Encoding categorical variables: one-hot, target, ordinal"
      },
      {
        "id": "ds::feature-engineering::numerical-feature-transformations-log-standardizat",
        "text": "Numerical feature transformations: log, standardization, binning"
      },
      {
        "id": "ds::feature-engineering::date-time-feature-extraction",
        "text": "Date/time feature extraction"
      },
      {
        "id": "ds::feature-engineering::interaction-features-and-polynomial-features",
        "text": "Interaction features and polynomial features"
      },
      {
        "id": "ds::feature-engineering::text-features-tf-idf-embeddings",
        "text": "Text features: TF-IDF, embeddings",
        "simulatorRoute": "/tf-idf",
        "simulatorLabel": "TF-IDF Sim"
      },
      {
        "id": "ds::feature-engineering::domain-driven-feature-creation-from-business-knowl",
        "text": "Domain-driven feature creation from business knowledge"
      }
    ]
  },
  {
    "id": "storytelling-communication",
    "name": "Storytelling & Communication",
    "items": [
      {
        "id": "ds::storytelling-communication::building-clear-insightful-data-visualizations",
        "text": "Building clear, insightful data visualizations"
      },
      {
        "id": "ds::storytelling-communication::translating-analytical-findings-into-business-reco",
        "text": "Translating analytical findings into business recommendations"
      },
      {
        "id": "ds::storytelling-communication::writing-data-science-reports-and-executive-summari",
        "text": "Writing data science reports and executive summaries"
      },
      {
        "id": "ds::storytelling-communication::structuring-presentations-problem-insight-recommen",
        "text": "Structuring presentations: problem ? insight ? recommendation"
      },
      {
        "id": "ds::storytelling-communication::explaining-model-behavior-to-non-technical-audienc",
        "text": "Explaining model behavior to non-technical audiences"
      },
      {
        "id": "ds::storytelling-communication::visualizing-uncertainty-and-confidence-intervals",
        "text": "Visualizing uncertainty and confidence intervals"
      },
      {
        "id": "ds::storytelling-communication::avoiding-misleading-charts-and-statistics",
        "text": "Avoiding misleading charts and statistics"
      }
    ]
  },
  {
    "id": "ml-in-production",
    "name": "ML in Production",
    "items": [
      {
        "id": "ds::ml-in-production::packaging-models-for-serving-pickle-onnx-joblib",
        "text": "Packaging models for serving (pickle, ONNX, joblib)"
      },
      {
        "id": "ds::ml-in-production::building-lightweight-rest-apis-for-model-serving-f",
        "text": "Building lightweight REST APIs for model serving (FastAPI)"
      },
      {
        "id": "ds::ml-in-production::monitoring-model-performance-post-deployment",
        "text": "Monitoring model performance post-deployment"
      },
      {
        "id": "ds::ml-in-production::detecting-and-responding-to-data-and-model-drift",
        "text": "Detecting and responding to data and model drift"
      },
      {
        "id": "ds::ml-in-production::retraining-pipelines-and-trigger-strategies",
        "text": "Retraining pipelines and trigger strategies"
      },
      {
        "id": "ds::ml-in-production::collaborating-with-ml-engineers-on-production-hand",
        "text": "Collaborating with ML engineers on production handoff"
      }
    ]
  },
  {
    "id": "causal-inference-business-analytics",
    "name": "Causal Inference & Business Analytics",
    "items": [
      {
        "id": "ds::causal-inference-business-analytics::difference-in-differences-for-policy-evaluation",
        "text": "Difference-in-differences for policy evaluation"
      },
      {
        "id": "ds::causal-inference-business-analytics::regression-discontinuity-design",
        "text": "Regression discontinuity design"
      },
      {
        "id": "ds::causal-inference-business-analytics::instrumental-variables-at-a-conceptual-level",
        "text": "Instrumental variables at a conceptual level"
      },
      {
        "id": "ds::causal-inference-business-analytics::counterfactual-thinking-for-business-decisions",
        "text": "Counterfactual thinking for business decisions"
      },
      {
        "id": "ds::causal-inference-business-analytics::propensity-score-matching-for-observational-studie",
        "text": "Propensity score matching for observational studies"
      },
      {
        "id": "ds::causal-inference-business-analytics::synthetic-control-methods-and-sensitivity-analysis",
        "text": "Synthetic control methods and sensitivity analysis"
      }
    ]
  },
  {
    "id": "nlp-text-analytics",
    "name": "NLP & Text Analytics",
    "items": [
      {
        "id": "ds::nlp-text-analytics::text-preprocessing-tokenization-stemming-lemmatiza",
        "text": "Text preprocessing: tokenization, stemming, lemmatization"
      },
      {
        "id": "ds::nlp-text-analytics::bag-of-words-and-tf-idf-representations",
        "text": "Bag-of-words and TF-IDF representations",
        "simulatorRoute": "/tf-idf",
        "simulatorLabel": "TF-IDF Sim"
      },
      {
        "id": "ds::nlp-text-analytics::sentiment-analysis-and-semantic-similarity",
        "text": "Sentiment analysis and semantic similarity"
      },
      {
        "id": "ds::nlp-text-analytics::topic-modeling-with-bertopic-and-lda",
        "text": "Topic modeling with BERTopic and LDA"
      },
      {
        "id": "ds::nlp-text-analytics::using-pretrained-language-models-bert-sentence-tra",
        "text": "Using pretrained language models (BERT, sentence transformers)",
        "simulatorRoute": "/word2vec",
        "simulatorLabel": "Embeddings Sim"
      },
      {
        "id": "ds::nlp-text-analytics::building-text-classifiers-end-to-end",
        "text": "Building text classifiers end-to-end"
      }
    ]
  },
  {
    "id": "mlops-reproducibility",
    "name": "MLOps & Reproducibility",
    "items": [
      {
        "id": "ds::mlops-reproducibility::version-controlling-datasets-and-experiments-with-",
        "text": "Version controlling datasets and experiments with DVC or MLflow"
      },
      {
        "id": "ds::mlops-reproducibility::reproducible-analysis-seeds-pinned-dependencies-lo",
        "text": "Reproducible analysis: seeds, pinned dependencies, locked environments"
      },
      {
        "id": "ds::mlops-reproducibility::building-modular-testable-analysis-pipelines",
        "text": "Building modular, testable analysis pipelines"
      },
      {
        "id": "ds::mlops-reproducibility::scheduling-recurring-analyses-and-reports",
        "text": "Scheduling recurring analyses and reports"
      },
      {
        "id": "ds::mlops-reproducibility::documenting-data-science-work-for-teammates-and-fu",
        "text": "Documenting data science work for teammates and future-you"
      }
    ]
  },
  {
    "id": "responsible-data-science",
    "name": "Responsible Data Science",
    "items": [
      {
        "id": "ds::responsible-data-science::bias-detection-measuring-fairness-across-demograph",
        "text": "Bias detection: measuring fairness across demographic groups"
      },
      {
        "id": "ds::responsible-data-science::model-interpretability-shap-lime-partial-dependenc",
        "text": "Model interpretability: SHAP, LIME, partial dependence plots"
      },
      {
        "id": "ds::responsible-data-science::ethical-implications-of-the-decisions-your-model-d",
        "text": "Ethical implications of the decisions your model drives"
      },
      {
        "id": "ds::responsible-data-science::data-privacy-anonymization-differential-privacy-co",
        "text": "Data privacy: anonymization, differential privacy concepts"
      },
      {
        "id": "ds::responsible-data-science::model-cards-and-documentation-for-transparency",
        "text": "Model cards and documentation for transparency"
      }
    ]
  }
]

export const forwardDeployedEngineerSkills: SkillCategory[] = [
  {
    "id": "technical-foundation",
    "name": "Technical Foundation",
    "items": [
      {
        "id": "fde::technical-foundation::basic-statistics-and-probability-intuition",
        "text": "Basic statistics and probability intuition"
      },
      {
        "id": "fde::technical-foundation::linear-algebra-basics-vectors-matrices-dot-product",
        "text": "Linear algebra basics: vectors, matrices, dot products",
        "simulatorRoute": "/modules/pca",
        "simulatorLabel": "PCA Matrix Sim"
      },
      {
        "id": "fde::technical-foundation::understanding-of-apis-rest-graphql-webhooks",
        "text": "Understanding of APIs: REST, GraphQL, webhooks"
      },
      {
        "id": "fde::technical-foundation::familiarity-with-sql-and-relational-data-models",
        "text": "Familiarity with SQL and relational data models"
      },
      {
        "id": "fde::technical-foundation::command-line-fluency-navigating-scripting-debuggin",
        "text": "Command-line fluency: navigating, scripting, debugging"
      },
      {
        "id": "fde::technical-foundation::networking-basics-http-dns-tls-load-balancers",
        "text": "Networking basics: HTTP, DNS, TLS, load balancers"
      },
      {
        "id": "fde::technical-foundation::version-control-with-git-branching-prs-conflict-re",
        "text": "Version control with Git: branching, PRs, conflict resolution"
      }
    ]
  },
  {
    "id": "python-for-fdes",
    "name": "Python for FDEs",
    "items": [
      {
        "id": "fde::python-for-fdes::writing-scripts-to-automate-repetitive-tasks",
        "text": "Writing scripts to automate repetitive tasks"
      },
      {
        "id": "fde::python-for-fdes::working-with-rest-apis-and-sdks-in-python",
        "text": "Working with REST APIs and SDKs in Python"
      },
      {
        "id": "fde::python-for-fdes::parsing-and-transforming-json-csv-and-xml-data",
        "text": "Parsing and transforming JSON, CSV, and XML data"
      },
      {
        "id": "fde::python-for-fdes::building-quick-proof-of-concept-tools-and-demos",
        "text": "Building quick proof-of-concept tools and demos"
      },
      {
        "id": "fde::python-for-fdes::fast-prototyping-with-streamlit-and-gradio",
        "text": "Fast prototyping with Streamlit and Gradio"
      },
      {
        "id": "fde::python-for-fdes::using-virtual-environments-and-package-management",
        "text": "Using virtual environments and package management"
      },
      {
        "id": "fde::python-for-fdes::writing-readable-code-that-customers-and-teammates",
        "text": "Writing readable code that customers and teammates can maintain"
      }
    ]
  },
  {
    "id": "software-engineering-fundamentals",
    "name": "Software Engineering Fundamentals",
    "items": [
      {
        "id": "fde::software-engineering-fundamentals::reading-and-navigating-unfamiliar-codebases-quickl",
        "text": "Reading and navigating unfamiliar codebases quickly"
      },
      {
        "id": "fde::software-engineering-fundamentals::debugging-with-logs-breakpoints-and-network-traces",
        "text": "Debugging with logs, breakpoints, and network traces"
      },
      {
        "id": "fde::software-engineering-fundamentals::writing-unit-tests-and-understanding-test-coverage",
        "text": "Writing unit tests and understanding test coverage",
        "simulatorRoute": "/rag",
        "simulatorLabel": "RAG Lab"
      },
      {
        "id": "fde::software-engineering-fundamentals::containerization-with-docker-for-reproducible-envi",
        "text": "Containerization with Docker for reproducible environments"
      },
      {
        "id": "fde::software-engineering-fundamentals::basic-ci-cd-pipelines-build-artifacts-environment-",
        "text": "Basic CI/CD: pipelines, build artifacts, environment configs"
      },
      {
        "id": "fde::software-engineering-fundamentals::using-infrastructure-tools-cloud-consoles-iam-stor",
        "text": "Using infrastructure tools: cloud consoles, IAM, storage buckets",
        "simulatorRoute": "/rag",
        "simulatorLabel": "RAG Lab"
      }
    ]
  },
  {
    "id": "ml-ai-literacy",
    "name": "ML & AI Literacy",
    "items": [
      {
        "id": "fde::ml-ai-literacy::supervised-vs-unsupervised-learning-at-a-conceptua",
        "text": "Supervised vs. unsupervised learning at a conceptual level"
      },
      {
        "id": "fde::ml-ai-literacy::how-training-evaluation-and-inference-differ",
        "text": "How training, evaluation, and inference differ"
      },
      {
        "id": "fde::ml-ai-literacy::what-overfitting-and-underfitting-mean-in-practice",
        "text": "What overfitting and underfitting mean in practice"
      },
      {
        "id": "fde::ml-ai-literacy::classification-and-regression-metrics-precision-re",
        "text": "Classification and regression metrics: precision, recall, RMSE",
        "simulatorRoute": "/simulators/eval-metrics",
        "simulatorLabel": "Eval Metrics Sim"
      },
      {
        "id": "fde::ml-ai-literacy::how-foundation-models-and-llms-work-at-a-high-leve",
        "text": "How foundation models and LLMs work at a high level"
      },
      {
        "id": "fde::ml-ai-literacy::tokenization-embeddings-and-vector-similarity",
        "text": "Tokenization, embeddings, and vector similarity",
        "simulatorRoute": "/word2vec",
        "simulatorLabel": "Embeddings Sim"
      },
      {
        "id": "fde::ml-ai-literacy::knowing-when-ml-adds-value-vs-when-rules-are-suffi",
        "text": "Knowing when ML adds value vs. when rules are sufficient"
      }
    ]
  },
  {
    "id": "llm-generative-ai-fluency",
    "name": "LLM & Generative AI Fluency",
    "items": [
      {
        "id": "fde::llm-generative-ai-fluency::prompt-engineering-structuring-effective-prompts",
        "text": "Prompt engineering: structuring effective prompts",
        "simulatorRoute": "/simulators/prompt-engineering",
        "simulatorLabel": "Prompt Sim"
      },
      {
        "id": "fde::llm-generative-ai-fluency::few-shot-and-in-context-learning",
        "text": "Few-shot and in-context learning"
      },
      {
        "id": "fde::llm-generative-ai-fluency::retrieval-augmented-generation-rag-fundamentals",
        "text": "Retrieval-Augmented Generation (RAG) fundamentals",
        "simulatorRoute": "/rag",
        "simulatorLabel": "RAG Lab"
      },
      {
        "id": "fde::llm-generative-ai-fluency::fine-tuning-at-a-conceptual-level-when-and-why",
        "text": "Fine-tuning at a conceptual level: when and why"
      },
      {
        "id": "fde::llm-generative-ai-fluency::model-selection-cost-vs-capability-vs-latency-trad",
        "text": "Model selection: cost vs. capability vs. latency tradeoffs"
      },
      {
        "id": "fde::llm-generative-ai-fluency::tool-use-and-function-calling-with-llms",
        "text": "Tool use and function calling with LLMs"
      },
      {
        "id": "fde::llm-generative-ai-fluency::structured-output-json-mode-constrained-decoding",
        "text": "Structured output: JSON mode, constrained decoding"
      },
      {
        "id": "fde::llm-generative-ai-fluency::hallucination-risk-recognizing-and-mitigating-it-i",
        "text": "Hallucination risk: recognizing and mitigating it in customer demos"
      }
    ]
  },
  {
    "id": "customer-facing-technical-skills",
    "name": "Customer-Facing Technical Skills",
    "items": [
      {
        "id": "fde::customer-facing-technical-skills::running-live-technical-demos-under-pressure",
        "text": "Running live technical demos under pressure"
      },
      {
        "id": "fde::customer-facing-technical-skills::translating-customer-requirements-into-engineering",
        "text": "Translating customer requirements into engineering specs"
      },
      {
        "id": "fde::customer-facing-technical-skills::explaining-technical-concepts-clearly-to-non-engin",
        "text": "Explaining technical concepts clearly to non-engineers"
      },
      {
        "id": "fde::customer-facing-technical-skills::building-quick-pocs-and-prototypes-for-customer-ev",
        "text": "Building quick POCs and prototypes for customer evaluation"
      },
      {
        "id": "fde::customer-facing-technical-skills::collecting-feedback-loops-what-worked-what-didn-t-",
        "text": "Collecting feedback loops: what worked, what didn't, why"
      },
      {
        "id": "fde::customer-facing-technical-skills::scoping-and-sizing-implementation-effort-for-custo",
        "text": "Scoping and sizing implementation effort for customer deals"
      },
      {
        "id": "fde::customer-facing-technical-skills::writing-technical-documentation-for-handoff",
        "text": "Writing technical documentation for handoff"
      },
      {
        "id": "fde::customer-facing-technical-skills::managing-stakeholder-expectations-during-integrati",
        "text": "Managing stakeholder expectations during integration projects"
      }
    ]
  },
  {
    "id": "integration-deployment",
    "name": "Integration & Deployment",
    "items": [
      {
        "id": "fde::integration-deployment::integrating-third-party-apis-into-customer-workflo",
        "text": "Integrating third-party APIs into customer workflows"
      },
      {
        "id": "fde::integration-deployment::webhooks-and-event-driven-integrations",
        "text": "Webhooks and event-driven integrations"
      },
      {
        "id": "fde::integration-deployment::authentication-patterns-oauth-api-keys-sso-saml",
        "text": "Authentication patterns: OAuth, API keys, SSO/SAML"
      },
      {
        "id": "fde::integration-deployment::data-ingestion-pipelines-from-customer-systems",
        "text": "Data ingestion pipelines from customer systems"
      },
      {
        "id": "fde::integration-deployment::deploying-services-on-cloud-platforms-aws-gcp-azur",
        "text": "Deploying services on cloud platforms (AWS, GCP, Azure)"
      },
      {
        "id": "fde::integration-deployment::environment-configuration-management-dev-staging-p",
        "text": "Environment configuration management (dev, staging, prod)"
      },
      {
        "id": "fde::integration-deployment::configuring-reverse-proxies-nginx-envoy-routing-an",
        "text": "Configuring reverse proxies (Nginx/Envoy), routing, and CORS"
      },
      {
        "id": "fde::integration-deployment::troubleshooting-integration-failures-with-customer",
        "text": "Troubleshooting integration failures with customers live"
      }
    ]
  },
  {
    "id": "data-skills",
    "name": "Data Skills",
    "items": [
      {
        "id": "fde::data-skills::querying-and-transforming-data-with-sql",
        "text": "Querying and transforming data with SQL"
      },
      {
        "id": "fde::data-skills::cleaning-and-normalizing-messy-customer-data",
        "text": "Cleaning and normalizing messy customer data"
      },
      {
        "id": "fde::data-skills::identifying-data-quality-issues-that-affect-model-",
        "text": "Identifying data quality issues that affect model performance"
      },
      {
        "id": "fde::data-skills::building-lightweight-etl-pipelines-for-onboarding",
        "text": "Building lightweight ETL pipelines for onboarding"
      },
      {
        "id": "fde::data-skills::understanding-schema-differences-between-customer-",
        "text": "Understanding schema differences between customer data sources"
      },
      {
        "id": "fde::data-skills::designing-idempotent-data-loading-scripts-for-ente",
        "text": "Designing idempotent data loading scripts for enterprise cutovers"
      },
      {
        "id": "fde::data-skills::validating-data-pipelines-end-to-end-before-handof",
        "text": "Validating data pipelines end-to-end before handoff"
      }
    ]
  },
  {
    "id": "security-compliance-awareness",
    "name": "Security & Compliance Awareness",
    "items": [
      {
        "id": "fde::security-compliance-awareness::pii-identification-and-data-handling-best-practice",
        "text": "PII identification and data handling best practices"
      },
      {
        "id": "fde::security-compliance-awareness::role-based-access-control-rbac-concepts",
        "text": "Role-based access control (RBAC) concepts"
      },
      {
        "id": "fde::security-compliance-awareness::common-compliance-frameworks-soc-2-gdpr-hipaa-at-a",
        "text": "Common compliance frameworks: SOC 2, GDPR, HIPAA at a high level"
      },
      {
        "id": "fde::security-compliance-awareness::secure-api-key-and-secret-management",
        "text": "Secure API key and secret management"
      },
      {
        "id": "fde::security-compliance-awareness::understanding-customer-security-review-processes-q",
        "text": "Understanding customer security review processes (questionnaires, audits)"
      }
    ]
  },
  {
    "id": "system-design-architecture",
    "name": "System Design & Architecture",
    "items": [
      {
        "id": "fde::system-design-architecture::designing-simple-end-to-end-ml-powered-workflows",
        "text": "Designing simple end-to-end ML-powered workflows"
      },
      {
        "id": "fde::system-design-architecture::latency-throughput-and-scalability-tradeoffs",
        "text": "Latency, throughput, and scalability tradeoffs"
      },
      {
        "id": "fde::system-design-architecture::choosing-between-synchronous-and-asynchronous-arch",
        "text": "Choosing between synchronous and asynchronous architectures"
      },
      {
        "id": "fde::system-design-architecture::caching-strategies-for-high-traffic-integrations",
        "text": "Caching strategies for high-traffic integrations"
      },
      {
        "id": "fde::system-design-architecture::multi-tenant-architecture-concepts",
        "text": "Multi-tenant architecture concepts"
      },
      {
        "id": "fde::system-design-architecture::designing-for-graceful-degradation-and-fault-toler",
        "text": "Designing for graceful degradation and fault tolerance"
      }
    ]
  },
  {
    "id": "monitoring-observability",
    "name": "Monitoring & Observability",
    "items": [
      {
        "id": "fde::monitoring-observability::setting-up-logging-and-alerting-for-deployed-integ",
        "text": "Setting up logging and alerting for deployed integrations"
      },
      {
        "id": "fde::monitoring-observability::interpreting-logs-and-traces-to-find-root-causes",
        "text": "Interpreting logs and traces to find root causes"
      },
      {
        "id": "fde::monitoring-observability::monitoring-data-and-model-drift-in-customer-enviro",
        "text": "Monitoring data and model drift in customer environments"
      },
      {
        "id": "fde::monitoring-observability::dashboarding-key-metrics-for-customer-success-revi",
        "text": "Dashboarding key metrics for customer success reviews"
      },
      {
        "id": "fde::monitoring-observability::postmortem-analysis-when-things-break-in-productio",
        "text": "Postmortem analysis when things break in production"
      }
    ]
  },
  {
    "id": "sales-engineering-deal-support",
    "name": "Sales Engineering & Deal Support",
    "items": [
      {
        "id": "fde::sales-engineering-deal-support::participating-in-technical-discovery-calls",
        "text": "Participating in technical discovery calls"
      },
      {
        "id": "fde::sales-engineering-deal-support::responding-to-rfps-and-technical-security-question",
        "text": "Responding to RFPs and technical security questionnaires"
      },
      {
        "id": "fde::sales-engineering-deal-support::building-differentiated-competitive-technical-narr",
        "text": "Building differentiated competitive technical narratives"
      },
      {
        "id": "fde::sales-engineering-deal-support::leading-proofs-of-concept-pocs-with-success-criter",
        "text": "Leading proofs of concept (POCs) with success criteria defined upfront"
      },
      {
        "id": "fde::sales-engineering-deal-support::handling-technical-objections-from-customer-engine",
        "text": "Handling technical objections from customer engineering teams"
      },
      {
        "id": "fde::sales-engineering-deal-support::collaborating-with-aes-on-deal-strategy",
        "text": "Collaborating with AEs on deal strategy"
      },
      {
        "id": "fde::sales-engineering-deal-support::transitioning-customers-from-poc-to-production-suc",
        "text": "Transitioning customers from POC to production successfully"
      }
    ]
  },
  {
    "id": "cross-functional-collaboration",
    "name": "Cross-Functional Collaboration",
    "items": [
      {
        "id": "fde::cross-functional-collaboration::feeding-customer-pain-points-back-to-product-and-e",
        "text": "Feeding customer pain points back to product and engineering"
      },
      {
        "id": "fde::cross-functional-collaboration::writing-clear-internal-bug-reports-with-reproducib",
        "text": "Writing clear internal bug reports with reproducible steps"
      },
      {
        "id": "fde::cross-functional-collaboration::advocating-for-customer-needs-in-roadmap-discussio",
        "text": "Advocating for customer needs in roadmap discussions"
      },
      {
        "id": "fde::cross-functional-collaboration::partnering-with-customer-success-for-post-launch-s",
        "text": "Partnering with customer success for post-launch support"
      },
      {
        "id": "fde::cross-functional-collaboration::conducting-post-launch-architecture-reviews-and-re",
        "text": "Conducting post-launch architecture reviews and retrospective meetings"
      },
      {
        "id": "fde::cross-functional-collaboration::building-internal-playbooks-for-common-customer-in",
        "text": "Building internal playbooks for common customer integration patterns"
      }
    ]
  },
  {
    "id": "mindset-soft-skills",
    "name": "Mindset & Soft Skills",
    "items": [
      {
        "id": "fde::mindset-soft-skills::thriving-in-ambiguity-building-without-full-requir",
        "text": "Thriving in ambiguity: building without full requirements"
      },
      {
        "id": "fde::mindset-soft-skills::knowing-when-to-build-vs-when-to-configure-or-inte",
        "text": "Knowing when to build vs. when to configure or integrate"
      },
      {
        "id": "fde::mindset-soft-skills::context-switching-between-multiple-customers-and-p",
        "text": "Context-switching between multiple customers and projects"
      },
      {
        "id": "fde::mindset-soft-skills::staying-calm-when-a-live-demo-breaks",
        "text": "Staying calm when a live demo breaks"
      },
      {
        "id": "fde::mindset-soft-skills::writing-clear-async-communication-slack-email-noti",
        "text": "Writing clear async communication (Slack, email, Notion)"
      },
      {
        "id": "fde::mindset-soft-skills::learning-a-new-customer-domain-quickly-healthcare-",
        "text": "Learning a new customer domain quickly (healthcare, finance, legal...)"
      },
      {
        "id": "fde::mindset-soft-skills::balancing-speed-of-delivery-with-technical-quality",
        "text": "Balancing speed of delivery with technical quality"
      }
    ]
  },
  {
    "id": "fde-toolbox",
    "name": "FDE Toolbox",
    "items": [
      {
        "id": "fde::fde-toolbox::api-testing-with-postman-or-insomnia",
        "text": "API testing with Postman or Insomnia"
      },
      {
        "id": "fde::fde-toolbox::jupyter-notebooks-for-quick-data-exploration",
        "text": "Jupyter notebooks for quick data exploration"
      },
      {
        "id": "fde::fde-toolbox::vs-code-extensions-for-productivity",
        "text": "VS Code extensions for productivity"
      },
      {
        "id": "fde::fde-toolbox::benchmarking-latency-and-token-throughput-tools-lo",
        "text": "Benchmarking latency and token throughput tools (Locust, wrk)"
      },
      {
        "id": "fde::fde-toolbox::slack-notion-linear-for-async-cross-team-coordinat",
        "text": "Slack/Notion/Linear for async cross-team coordination"
      },
      {
        "id": "fde::fde-toolbox::screen-recording-and-async-video-for-customer-comm",
        "text": "Screen recording and async video for customer communication (Loom etc.)"
      }
    ]
  }
]

export const roadmaps: Roadmap[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer Roadmap',
    badge: 'Featured \u2022 100 Skills',
    subtitle: 'Build production GenAI applications, RAG pipelines, and multi-agent systems.',
    description:
      'The comprehensive 100-skill curriculum created by Marina Wyss. Covers Python fundamentals, LLM architectures, prompt & context engineering, RAG pipelines, evaluation frameworks, and fine-tuning.',
    icon: '\u{1F916}',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    accentColor: 'text-blue-600',
    borderHover: 'hover:border-blue-400',
    bgLight: 'bg-blue-50/50',
    estimatedMonths: '6 - 9 Months',
    difficulty: 'Intermediate \u2192 Advanced',
    targetAudience: 'Software engineers & ML developers transitioning to building applied GenAI & Agentic systems.',
    primaryStack: ['Python', 'LangChain/LlamaIndex', 'vLLM', 'FastAPI', 'Chroma/Pinecone', 'Docker', 'Eval Frameworks'],
    authorCitation: {
      name: 'Marina Wyss',
      role: 'Staff Data Scientist & AI Engineer',
      linkedinUrl: 'https://www.linkedin.com/in/marina-wyss/',
      websiteUrl: 'https://marinawyss.com',
      quote:
        "The one thing to take away: the biggest mistake is waiting until you've learned all of this to build anything. Get the basics from a course or book, build something as fast as you can, and go deep on whatever you get stuck on.",
      note: 'Based on Marina Wyss\'s acclaimed AI Engineering Skills Checklist. Progress is saved locally in your browser so you can track your journey step-by-step.',
    },
    categories: aiEngineerSkills,
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer Roadmap',
    badge: 'Core Track \u2022 100 Skills',
    subtitle: 'Master end-to-end model development, distributed training, and production ML pipelines.',
    description:
      'The complete 100-skill checklist for engineering robust machine learning systems. Covers mathematical fundamentals, data wrangling, scikit-learn algorithms, PyTorch deep learning, distributed training at scale, inference compression (ONNX/TensorRT), and continuous monitoring.',
    icon: '\u{1F3CB}\uFE0F',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    accentColor: 'text-indigo-600',
    borderHover: 'hover:border-indigo-400',
    bgLight: 'bg-indigo-50/50',
    estimatedMonths: '8 - 12 Months',
    difficulty: 'Beginner \u2192 Advanced',
    targetAudience: 'Engineers who want to build, train, deploy, and scale predictive models in production environments.',
    primaryStack: ['Python', 'PyTorch', 'scikit-learn', 'MLflow/W&B', 'Docker', 'FastAPI', 'ONNX/TensorRT', 'Kubernetes'],
    categories: mlEngineerSkills,
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist Roadmap',
    badge: 'Analytical Track \u2022 100 Skills',
    subtitle: 'From hypothesis testing and advanced SQL to causal inference and business impact.',
    description:
      'The modern 100-skill data science checklist. Master statistical analysis, data wrangling, experimental design (A/B testing), causal inference, deep learning fundamentals, NLP text analytics, and executive data storytelling.',
    icon: '\u{1F4CA}',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    accentColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-400',
    bgLight: 'bg-emerald-50/50',
    estimatedMonths: '6 - 9 Months',
    difficulty: 'Beginner \u2192 Advanced',
    targetAudience: 'Analysts, mathematicians, and developers aiming to solve ambiguous business challenges through data.',
    primaryStack: ['Python', 'SQL', 'Pandas/Polars', 'Statsmodels', 'scikit-learn', 'SHAP', 'Streamlit', 'Tableau'],
    categories: dataScientistSkills,
  },
  {
    id: 'forward-deployed-engineer',
    title: 'Forward Deployed Engineer Roadmap',
    badge: 'Enterprise Applied AI \u2022 100 Skills',
    subtitle: 'Bridge cutting-edge AI technology with real-world enterprise mission delivery.',
    description:
      'The definitive 100-skill curriculum for Forward Deployed Engineers (FDEs) and Applied AI Solutions Architects. Master client problem discovery, rapid 0-to-1 prototype engineering, legacy enterprise system integration, enterprise RAG, security hardening (SOC2/HIPAA), and field leadership.',
    icon: '\u{1F4BC}',
    gradient: 'from-amber-600 via-orange-600 to-rose-600',
    accentColor: 'text-amber-600',
    borderHover: 'hover:border-amber-400',
    bgLight: 'bg-amber-50/50',
    estimatedMonths: '6 - 9 Months',
    difficulty: 'Intermediate \u2192 Advanced',
    targetAudience: 'Software engineers and solution architects working directly with customers to build & deploy custom AI systems.',
    primaryStack: ['Python/TypeScript', 'FastAPI', 'Enterprise RAG', 'Cloud VPCs', 'Docker/K8s', 'MCP', 'Air-Gapped Tooling'],
    categories: forwardDeployedEngineerSkills,
  },
]

export const getRoadmapById = (id: string): Roadmap | undefined =>
  roadmaps.find((r) => r.id === id)
