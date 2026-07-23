"use client";

import { useEffect, useRef } from "react";

interface TextEditorProps {
  visible: boolean;
  value: string;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function TextEditor({
  visible,
  value,
  x,
  y,
  width,
  fontSize,
  fontFamily,
  color,
  onChange,
  onClose,
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!visible || !textareaRef.current) return;

    textareaRef.current.focus();
    textareaRef.current.select();
  }, [visible]);

  if (!visible) return null;

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onClose();
        }

        if (e.key === "Escape") {
          onClose();
        }
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        fontSize,
        fontFamily,
        color,
        background: "transparent",
        border: "1px dashed #555",
        outline: "none",
        resize: "none",
        overflow: "hidden",
        padding: 0,
        margin: 0,
        whiteSpace: "pre",
      }}
    />
  );
}