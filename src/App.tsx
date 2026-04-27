import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
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
} from '@/pages/modules'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
