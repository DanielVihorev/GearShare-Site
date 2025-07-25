import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { NewsPage } from "./pages/NewsPage";
import { UpdatesPage } from "./pages/UpdatesPage";
import { MapPage } from "./pages/MapPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { PricingPage } from "./pages/PricingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { OrdersPage } from "./pages/OrdersPage";
import { SalesPage } from "./pages/SalesPage";
import { BillingPage } from "./pages/BillingPage";
import { ContactsPage } from "./pages/ContactsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/updates' element={<UpdatesPage />} />
          <Route path='/pricing' element={<PricingPage />} />
          <Route path='/login' element={<AuthPage />} />
          <Route path='/register' element={<AuthPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/terms-of-use' element={<TermsOfUsePage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path='orders' element={<OrdersPage />} />
            <Route path='sales' element={<SalesPage />} />
            <Route path='billing' element={<BillingPage />} />
            <Route path='contacts' element={<ContactsPage />} />
          </Route>
        </Route>

        {/* Fallback Not Found Route */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
