/**
 * EmptyState Component
 *
 * Placeholder shown when user has no tasks
 */

interface EmptyStateProps {
  onAddTask?: () => void;
}

export default function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <svg
        className="w-24 h-24 text-yellow-500/30 mb-4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">No tasks yet</h3>
      <p className="text-yellow-100/70 mb-6 max-w-sm">
        Get started by creating your first task. Stay organized and track your progress!
      </p>
      {onAddTask && (
        <button
          onClick={onAddTask}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#1a1410] font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:scale-105"
        >
          Create Your First Task
        </button>
      )}
    </div>
  );
}
