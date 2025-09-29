"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/notes";
import { useAuth } from "@/hooks/useAuth";
import { Box, Heading, Text, Spinner, Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const token = useAuth(); // will redirect if no token
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Inside HomePage component:
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    if (!token) return; // wait for token
    getNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={6}>
      <Heading mb={4}>Your Notes</Heading>
      <HStack justify="space-between" mb={6}>
        <Heading>Your Notes</Heading>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
      {notes.length === 0 ? (
        <Text>No notes yet. Create one!</Text>
      ) : (
        notes.map((note) => (
          <Box key={note.id} border="1px solid #ddd" p={3} mb={2} rounded="md">
            <Heading size="md">{note.title}</Heading>
            <Text>{note.content}</Text>
          </Box>
        ))
      )}
    </Box>
  );
}