// src/pages/SalesPage.tsx
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";

type Sale = { id: number; item: string; amount: number; date: string };

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/sales").then((res) => {
      setSales(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Item</Th>
          <Th>Amount</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sales.map((s) => (
          <Tr key={s.id}>
            <Td>{s.id}</Td>
            <Td>{s.item}</Td>
            <Td>${s.amount}</Td>
            <Td>{s.date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}



