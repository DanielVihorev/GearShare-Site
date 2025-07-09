// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewsPage } from "./pages/NewsPage";
import { UpdatesPage } from "./pages/UpdatesPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/register' element={<AuthPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/updates' element={<UpdatesPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
