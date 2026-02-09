/**
 * ChatInput Component
 *
 * Message input with textarea, send button, and character limit
 */

"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent,
} from "react";
import { ChatInputProps, MAX_MESSAGE_LENGTH } from "@/types/chat";

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set height to scrollHeight, but cap at 150px
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      // Auto-focus after sending message
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends message, Shift+Enter creates new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
    }
  };

  // Handle paste events to respect character limit
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const currentText = message;
    const selectionStart = textareaRef.current?.selectionStart || 0;
    const selectionEnd = textareaRef.current?.selectionEnd || 0;

    // Calculate the new text after paste
    const newText =
      currentText.substring(0, selectionStart) +
      pastedText +
      currentText.substring(selectionEnd);

    // If pasted text would exceed limit, truncate it
    if (newText.length > MAX_MESSAGE_LENGTH) {
      e.preventDefault();
      const availableSpace =
        MAX_MESSAGE_LENGTH -
        (currentText.length - (selectionEnd - selectionStart));
      const truncatedPaste = pastedText.substring(0, availableSpace);
      const finalText =
        currentText.substring(0, selectionStart) +
        truncatedPaste +
        currentText.substring(selectionEnd);
      setMessage(finalText);
    }
  };

  const remainingChars = MAX_MESSAGE_LENGTH - message.length;
  const isNearLimit = remainingChars < 100;

  return (
    <div className="space-y-2">
      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder="Type your message..."
          rows={1}
          aria-label="Message input"
          aria-describedby="input-helper-text"
          className="w-full px-4 py-3 pr-24 bg-[#2a1f1a]/50 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none disabled:bg-[#2a1f1a]/30 disabled:cursor-not-allowed text-yellow-100 placeholder-yellow-100/40"
          style={{
            minHeight: "52px",
            maxHeight: "150px",
          }}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          aria-label="Send message"
          className="absolute right-2 bottom-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#1a1410] text-sm font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all"
        >
          Send
        </button>
      </div>

      {/* Helper Text and Character Counter */}
      <div
        id="input-helper-text"
        className="flex items-center justify-between text-xs text-yellow-100/60"
      >
        <span>Press Enter to send, Shift+Enter for new line</span>
        {isNearLimit && (
          <span
            className={remainingChars < 50 ? "text-red-400" : "text-orange-400"}
            role="status"
            aria-live="polite"
          >
            {remainingChars} characters remaining
          </span>
        )}
      </div>
    </div>
  );
}
