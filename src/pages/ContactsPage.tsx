// src/pages/ContactsPage.tsx
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";

type Contact = { id: number; name: string; email: string; message: string };

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/contacts").then((res) => {
      setContacts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Message</Th>
        </Tr>
      </Thead>
      <Tbody>
        {contacts.map((c) => (
          <Tr key={c.id}>
            <Td>{c.id}</Td>
            <Td>{c.name}</Td>
            <Td>{c.email}</Td>
            <Td>{c.message}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}