"use client";

import { useEffect, useState } from "react";
import { getNotes, createNote } from "@/lib/notes";
import { useAuth } from "@/hooks/useAuth";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const token = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch notes
  useEffect(() => {
    if (!token) return;
    getNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleCreateNote() {
    if (!title.trim() || !content.trim()) return;
    try {
      setCreating(true);
      const newNote = await createNote(title, content);
      setNotes((prev) => [newNote, ...prev]); // show new note immediately
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to create note:", err);
    } finally {
      setCreating(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  if (loading) return <Spinner size="xl" mt={10} />;

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Heading>Your Notes</Heading>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>

      {/* Create Note Form */}
      <Box border="1px solid #ddd" p={4} mb={6} rounded="md">
        <VStack spacing={3} align="stretch">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={handleCreateNote}
            isLoading={creating}
          >
            Add Note
          </Button>
        </VStack>
      </Box>

      {/* Notes List */}
      {notes.length === 0 ? (
        <Text>No notes yet. Create one above!</Text>
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