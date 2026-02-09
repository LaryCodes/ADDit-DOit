/**
 * EmptyChat Component
 *
 * Empty state with welcome message and suggestion buttons
 */

"use client";

import { EmptyChatProps } from "@/types/chat";

const suggestions = [
  "Add a task to buy groceries",
  "Show me my tasks",
  "Mark task 1 as complete",
  "Create a task to call mom",
  "What tasks do I have?",
];

export default function EmptyChat({ onSendMessage }: EmptyChatProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-semibold text-yellow-400">
          Welcome to AI Task Assistant
        </h2>
        <p className="text-yellow-100/80 max-w-md">
          Manage your tasks naturally through conversation. Ask me to add, view,
          update, or complete tasks.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
        <div className="glass-card rounded-xl p-4 text-center glow-hover transition-all hover:scale-105">
          <div className="text-3xl mb-2">➕</div>
          <h3 className="font-medium text-yellow-400 mb-1">Add Tasks</h3>
          <p className="text-sm text-yellow-100/70">
            Create tasks with natural language
          </p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center glow-hover transition-all hover:scale-105">
          <div className="text-3xl mb-2">📋</div>
          <h3 className="font-medium text-yellow-400 mb-1">View Tasks</h3>
          <p className="text-sm text-yellow-100/70">
            See all your tasks at a glance
          </p>
        </div>
        <div className="glass-card rounded-xl p-4 text-center glow-hover transition-all hover:scale-105">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-medium text-yellow-400 mb-1">Complete Tasks</h3>
          <p className="text-sm text-yellow-100/70">Mark tasks as done easily</p>
        </div>
      </div>

      {/* Suggestion Buttons */}
      <div className="space-y-2 w-full max-w-md">
        <p className="text-sm text-yellow-100/70 text-center mb-3">
          Try one of these:
        </p>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSendMessage(suggestion)}
              className="w-full px-4 py-3 text-left text-sm text-yellow-300 glass-card rounded-xl hover:scale-105 transition-all border border-yellow-500/30"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
