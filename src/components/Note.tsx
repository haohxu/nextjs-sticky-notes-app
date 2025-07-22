"use client";

import { Note } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

export default function NoteComponent({
  note,
  onChange,
  onDelete,
}: {
  note: Note;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}) {
  const [text, setText] = useState(note.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: note.id,
  });

  useEffect(() => {
    setText(note.text);
  }, [note.text]);

  const handleBlur = () => {
    onChange(note.id, text);
  };

  const style = {
    transform: transform
      ? `translate3d(${note.x + transform.x}px, ${note.y + transform.y}px, 0)`
      : `translate3d(${note.x}px, ${note.y}px, 0)`,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="absolute w-48"
      style={style}
    >
      <div className="relative">
        <textarea
          ref={textareaRef}
          className="w-full h-32 p-3 bg-yellow-200 rounded shadow resize-none focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          placeholder="Type here..."
        />
        <button
          onClick={() => onDelete(note.id)}
          className="absolute top-1 right-2 text-red-600 hover:text-red-800 text-lg font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}
