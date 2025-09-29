import api from "./api";

export async function getNotes() {
  const res = await api.get("/notes");
  return res.data;
}

export async function createNote(title: string, content: string) {
  const res = await api.post("/notes", { title, content });
  return res.data;
}

export async function updateNote(id: string, title: string, content: string) {
  const res = await api.put(`/notes/${id}`, { title, content });
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}