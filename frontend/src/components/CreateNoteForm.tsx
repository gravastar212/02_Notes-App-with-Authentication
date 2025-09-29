"use client";

import { useState } from "react";
import { createNote } from "@/lib/notes";
import { Box, Input, Textarea, Button, VStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

interface CreateNoteFormProps {
  onNoteCreated: (note: any) => void;
}

export default function CreateNoteForm({ onNoteCreated }: CreateNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreateNote() {
    if (!title.trim() || !content.trim()) return;
    try {
      setCreating(true);
      const newNote = await createNote(title, content);
      onNoteCreated(newNote);
      setTitle("");
      setContent("");
      toaster.create({
        title: "Created",
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

  return (
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
  );
}
