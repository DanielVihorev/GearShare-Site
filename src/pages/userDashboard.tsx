// src/App.tsx
import React from "react";
import { ChakraProvider, Box, Flex, Link, VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import SalesPage from "./SalesPage";
import BillingPage from "./BillingPage";
import ContactsPage from "./ContactsPage";

    // ...existing code...
function UserDashboard() {
  return (
    <ChakraProvider>
      <Router>
        <Flex>
          <Box w="20%" bg="gray.100" p={4}>
            <VStack align="start" spacing={3}>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/sales">Sales</NavLink>
              <NavLink to="/billing">Billing</NavLink>
              <NavLink to="/contacts">Contacts</NavLink>
              <Link href="https://www.gearshare.site/contact" isExternal>
                Contact Us
              </Link>
              <Link href="https://www.gearshare.site/contact" isExternal>
                Reviews
              </Link>
            </VStack>
          </Box>
          <Box flex="1" p={4}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default UserDashboard;
// ...existing code...