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
      </Routes>
    </BrowserRouter>
  )
}

export default App
