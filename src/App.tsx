import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { NewsPage } from "./pages/NewsPage";
import { UpdatesPage } from "./pages/UpdatesPage";
import { MapPage } from "./pages/MapPage";
import { MechanicsMapPage } from "./pages/MechanicsMapPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { PricingPage } from "./pages/PricingPage";
import { DonationPage } from "./pages/DonationPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { OrdersPage } from "./pages/OrdersPage";
import { SalesPage } from "./pages/SalesPage";
import { BillingPage } from "./pages/BillingPage";
import { ContactsPage } from "./pages/ContactsPage";
import { VehiclesPage } from "./pages/VehiclesPage";
import { KafkaDashboardPage } from "./pages/KafkaDashboardPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/map", element: <MapPage /> },
      { path: "/mechanics", element: <MechanicsMapPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/updates", element: <UpdatesPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/donate", element: <DonationPage /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/register", element: <AuthPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "/terms-of-use", element: <TermsOfUsePage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "sales", element: <SalesPage /> },
          { path: "billing", element: <BillingPage /> },
          { path: "contacts", element: <ContactsPage /> },
          { path: "vehicles", element: <VehiclesPage /> },
          { path: "kafka", element: <KafkaDashboardPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
