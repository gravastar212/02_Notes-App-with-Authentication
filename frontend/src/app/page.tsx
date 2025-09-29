"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/notes";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function HomePage() {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    getNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Notes App 📝</Heading>
      {notes.length === 0 ? (
        <Text>No notes found (maybe not logged in)</Text>
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