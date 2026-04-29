import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LetsLearnPage } from '@/pages/LetsLearnPage'
import { MLModelsPage } from '@/pages/MLModelsPage'
import { DataScienceConceptsPage } from '@/pages/DataScienceConceptsPage'
import { AboutPage } from '@/pages/AboutPage'
import { AIConceptsPage } from '@/pages/AIConceptsPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from '@/pages/TermsOfServicePage'
import { CookiePolicyPage } from '@/pages/CookiePolicyPage'
import { TransformersModule } from '@/pages/modules/TransformersModule'
import {
  LinearRegressionModule,
  GradientDescentModule,
  LogisticRegressionModule,
  KMeansModule,
  TFIDFModule,
  Word2VecModule,
  BagOfWordsModule,
  NGramsModule,
  DecisionTreeModule,
  RandomForestModule,
  SVMModule,
  KNNModule,
  NaiveBayesModule,
  HierarchicalClusteringModule,
  XGBoostModule,
  AdaBoostModule,
  CatBoostModule,
  PCAModule,
  RAGModule,
} from '@/pages/modules'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LetsLearnPage />} />
        <Route path="/data-science-concepts" element={<DataScienceConceptsPage />} />
        <Route path="/ml-models" element={<MLModelsPage />} />
        <Route path="/ai-concepts" element={<AIConceptsPage />} />
        <Route path="/transformers" element={<TransformersModule />} />
        <Route path="/rag" element={<RAGModule />} />
        <Route path="/roadmaps" element={<ComingSoonPage title="Roadmaps" />} />
        <Route path="/resources" element={<ComingSoonPage title="Resources" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/linearregression" element={<LinearRegressionModule />} />
        <Route path="/gradientdescent" element={<GradientDescentModule />} />
        <Route path="/logisticregression" element={<LogisticRegressionModule />} />
        <Route path="/kmeansclustering" element={<KMeansModule />} />
        <Route path="/tf-idf" element={<TFIDFModule />} />
        <Route path="/word2vec" element={<Word2VecModule />} />
        <Route path="/bag-of-words" element={<BagOfWordsModule />} />
        <Route path="/n-grams" element={<NGramsModule />} />
        <Route path="/decision-tree" element={<DecisionTreeModule />} />
        <Route path="/random-forest" element={<RandomForestModule />} />
        <Route path="/svm" element={<SVMModule />} />
        <Route path="/knn" element={<KNNModule />} />
        <Route path="/naive-bayes" element={<NaiveBayesModule />} />
        <Route path="/hierarchical-clustering" element={<HierarchicalClusteringModule />} />
        <Route path="/xgboost" element={<XGBoostModule />} />
        <Route path="/adaboost" element={<AdaBoostModule />} />
        <Route path="/catboost" element={<CatBoostModule />} />
        <Route path="/modules/pca" element={<PCAModule />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
