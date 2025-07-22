"use client";

import { Note } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

export default function NoteComponent({
  note,
  onChange,
  onDelete,
  onClick,
}: {
  note: Note;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
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
    zIndex: note.zIndex || 1,
  };

  return (
    <div
      ref={setNodeRef}
      className="absolute w-48"
      style={style}
      onMouseDown={onClick} // bring to front on any interaction
    >
      {/* Drag handle area */}
      <div
        className="bg-yellow-300 px-2 py-1 rounded-t cursor-move text-sm font-bold text-gray-700"
        {...listeners}
        {...attributes}
      >
        .
      </div>

      {/* Delete button outside drag handle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Deleting note:", note.id);
          onDelete(note.id);
        }}
        className="absolute top-1 right-1 text-red-600 hover:text-red-800 text-base font-bold bg-transparent rounded-full w-5 h-5 flex items-center justify-center leading-none cursor-pointer"
      >
        ×
      </button>

      {/* Editable note body */}
      <textarea
        ref={textareaRef}
        className="w-full h-32 p-3 bg-yellow-200 text-black rounded-b shadow resize-none focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        placeholder="Type here..."
      />
    </div>
  );
}
