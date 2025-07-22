"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Note } from "@/types";
import { v4 as uuidv4 } from "uuid";
import NoteComponent from "@/components/Note";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [maxZ, setMaxZ] = useState(() => {
    return notes.reduce((max, n) => Math.max(max, n.zIndex || 0), 1);
  });
  const [isClient, setIsClient] = useState(false);

  const addNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      text: "",
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      zIndex: maxZ + 1,
    };
    setNotes([...notes, newNote]);
    setMaxZ((prev) => prev + 1);
  };

  const updateNote = (id: string, text: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text } : note)));
  };

  const bringToFront = (id: string) => {
    setMaxZ((prev) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, zIndex: prev + 1 } : note
        )
      );
      return prev + 1;
    });
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === active.id
          ? {
              ...note,
              x: note.x + delta.x,
              y: note.y + delta.y,
              zIndex: maxZ + 1,
            }
          : note
      )
    );
    setMaxZ((prev) => prev + 1);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // or return a loading spinner

  return (
    <main className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sticky Notes</h1>

      <button
        onClick={addNote}
        className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded shadow mb-4"
      >
        + Add Note
      </button>

      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="relative w-full h-[80vh] rounded  overflow-hidden">
          {notes.map((note) => (
            <NoteComponent
              key={note.id}
              note={note}
              onChange={updateNote}
              onDelete={deleteNote}
              onClick={() => bringToFront(note.id)}
            />
          ))}
        </div>
      </DndContext>
    </main>
  );
}
