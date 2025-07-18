// src/pages/BillingPage.tsx
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";

type Bill = { id: number; customer: string; total: number; status: string };

export default function BillingPage() {
  const [billing, setBilling] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/billing").then((res) => {
      setBilling(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Customer</Th>
          <Th>Total</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {billing.map((b) => (
          <Tr key={b.id}>
            <Td>{b.id}</Td>
            <Td>{b.customer}</Td>
            <Td>${b.total}</Td>
            <Td>{b.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}