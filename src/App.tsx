// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage"; // Import our new page

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* Both routes now point to our single, smarter AuthPage */}
          <Route path='/login' element={<AuthPage />} />
          <Route path='/register' element={<AuthPage />} />
          {/* You can add a 404 Not Found Route here as well */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
