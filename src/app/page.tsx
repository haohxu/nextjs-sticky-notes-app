"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Note } from "@/types";
import { v4 as uuidv4 } from "uuid";
import NoteComponent from "@/components/Note";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // or return a loading spinner

  const addNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      text: "",
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, text: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text } : note)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === active.id
          ? { ...note, x: note.x + delta.x, y: note.y + delta.y }
          : note
      )
    );
  };

  return (
    <main className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sticky Notes</h1>

      <button
        onClick={addNote}
        className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded shadow mb-4"
      >
        + Add Note
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative w-full h-[80vh] border rounded bg-yellow-50">
          {notes.map((note) => (
            <NoteComponent
              key={note.id}
              note={note}
              onChange={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </DndContext>
    </main>
  );
}
