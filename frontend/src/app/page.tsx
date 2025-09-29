"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/lib/notes";
import { useAuth } from "@/hooks/useAuth";
import { getUserFromToken } from "@/lib/user";
import { Box, Spinner, Heading } from "@chakra-ui/react";
import CreateNoteForm from "@/components/CreateNoteForm";
import NotesList from "@/components/NotesList";

export default function HomePage() {
  const token = useAuth();
  const user = getUserFromToken(token);
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes
  useEffect(() => {
    if (!token) return;
    getNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  function handleNoteCreated(newNote: any) {
    setNotes((prev) => [newNote, ...prev]);
  }

  // While redirecting, show loading spinner
  if (!user) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Heading size="sm" mt={4}>Redirecting to login...</Heading>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Heading size="sm" mt={4}>Loading notes...</Heading>
      </Box>
    );
  }

  // If logged in, show notes page
  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading mb={6}>Welcome, {user.email} 👋</Heading>
      <CreateNoteForm onNoteCreated={handleNoteCreated} />
      <NotesList notes={notes} setNotes={setNotes} />
    </Box>
  );
}