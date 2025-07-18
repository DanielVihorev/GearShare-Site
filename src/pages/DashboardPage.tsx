// src/pages/DashboardPage.tsx
import React from "react";
import { Box, Heading, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export default function DashboardPage() {
  return (
    <Box>
      <Heading mb={6}>User Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat p={4} shadow="md" borderWidth="1px" rounded="lg">
          <StatLabel>Total Orders</StatLabel>
          <StatNumber>128</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" rounded="lg">
          <StatLabel>Monthly Sales</StatLabel>
          <StatNumber>$4,760</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" rounded="lg">
          <StatLabel>Contacts</StatLabel>
          <StatNumber>32</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}