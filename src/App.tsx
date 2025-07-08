// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout"; // Import the layout
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage"; // Import the new page

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* The layout wraps everything inside the router */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* We can add a 404 page here later */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
