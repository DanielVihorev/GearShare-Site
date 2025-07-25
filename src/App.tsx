import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

// Create the router configuration as an array of objects
const router = createBrowserRouter([
  {
    // Public routes are nested under the MainLayout
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/map", element: <MapPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/updates", element: <UpdatesPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/register", element: <AuthPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "/terms-of-use", element: <TermsOfUsePage /> },
    ],
  },
  {
    // Protected routes are nested under the ProtectedRoute component
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
        ],
      },
    ],
  },
  {
    // A top-level route for the 404 page
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  // The App component now simply provides the router to the application
  return <RouterProvider router={router} />;
}

export default App;
