// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { AuthPage } from "./pages/AuthPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewsPage } from "./pages/NewsPage";
import { UpdatesPage } from "./pages/UpdatesPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { ContactPage } from "./pages/ContactPage";
import { PricingPage } from "./pages/PricingPage";
import { FAQPage } from "./pages/FAQPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/register' element={<AuthPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/updates' element={<UpdatesPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/terms-of-use' element={<TermsOfUsePage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/pricing' element={<PricingPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
