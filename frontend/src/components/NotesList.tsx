"use client";

import { useState } from "react";
import { deleteNote, updateNote } from "@/lib/notes";
import { Box, Text, VStack, HStack, Input, Textarea, Button, IconButton, Heading } from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";
import { Note } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface NotesListProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export default function NotesList({ notes, setNotes }: NotesListProps) {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  async function handleDelete(id: string) {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
      toaster.create({
        title: "Deleted",
        description: "Note deleted successfully",
        type: "warning",
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

  function handleEdit(note: Note) {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  async function handleSaveEdit() {
    if (!editingNote) return;
    try {
      const updated = await updateNote(editingNote.id, editTitle, editContent);
      setNotes(notes.map((n) => (n.id === editingNote.id ? updated : n)));
      setEditingNote(null);
      toaster.create({
        title: "Updated",
        description: "Note updated successfully",
        type: "info",
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

  if (notes.length === 0) {
    return <Text>No notes yet. Create one above!</Text>;
  }

  return (
    <VStack gap={4} align="stretch">
      {notes.map((note) => (
        <Box key={note.id} border="1px solid #ddd" p={3} rounded="md">
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
      ))}
    </VStack>
  );
}
