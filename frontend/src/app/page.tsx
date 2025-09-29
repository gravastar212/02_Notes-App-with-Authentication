"use client";

import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "@/lib/notes";
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
  IconButton, 
} from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const token = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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
      toaster.create({
        title: "Success",
        description: "Note created successfully",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to create note:", err);
      toaster.create({
        title: "Error",
        description: "Failed to create note",
        type: "error",
      });
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      toaster.create({
        title: "Success",
        description: "Note deleted successfully",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to delete note:", err);
      toaster.create({
        title: "Error",
        description: "Failed to delete note",
        type: "error",
      });
    }
  }

  function handleEdit(note: any) {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function handleSaveEdit() {
    if (!editingNote) return;
    try {
      const updated = await updateNote(editingNote.id, editTitle, editContent);
      setNotes((prev) =>
        prev.map((n) => (n.id === editingNote.id ? updated : n))
      );
      setEditingNote(null);
      toaster.create({
        title: "Success",
        description: "Note updated successfully",
        type: "success",
      });
    } catch (err) {
      console.error("Failed to update note:", err);
      toaster.create({
        title: "Error",
        description: "Failed to update note",
        type: "error",
      });
    }
  }

  function handleCancelEdit() {
    setEditingNote(null);
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
        <VStack gap={3} align="stretch">
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
            loading={creating}
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
            {editingNote?.id === note.id ? (
              <VStack gap={2} align="stretch">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <HStack>
                  <Button colorScheme="teal" size="sm" onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <>
                <HStack justify="space-between" mb={2}>
                  <Heading size="md">{note.title}</Heading>
                  <HStack>
                    <IconButton
                      aria-label="Edit"
                      size="sm"
                      onClick={() => handleEdit(note)}
                    >
                      <LuPencil />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(note.id)}
                    >
                      <LuTrash2 />
                    </IconButton>
                  </HStack>
                </HStack>
                <Text>{note.content}</Text>
              </>
            )}
          </Box>
        ))
      )}
    </Box>
  );
}