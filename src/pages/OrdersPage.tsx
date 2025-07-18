// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";

type Order = { id: number; item: string; qty: number; total: number };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders").then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;
  return (
    <Table variant="simple">
      <Thead>
        <Tr><Th>ID</Th><Th>Item</Th><Th>Qty</Th><Th>Total</Th></Tr>
      </Thead>
      <Tbody>
        {orders.map(o => (
          <Tr key={o.id}>
            <Td>{o.id}</Td><Td>{o.item}</Td><Td>{o.qty}</Td><Td>${o.total}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}