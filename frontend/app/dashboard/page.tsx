/**
 * Dashboard Page
 *
 * Protected route showing user's tasks with loading and error states
 */

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/lib/hooks/useTasks';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import TaskList from '@/components/tasks/TaskList';
import EmptyState from '@/components/tasks/EmptyState';
import Modal from '@/components/ui/Modal';
import TaskForm from '@/components/tasks/TaskForm';
import DeleteConfirmModal from '@/components/tasks/DeleteConfirmModal';
import Button from '@/components/ui/Button';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { tasks, isLoading: tasksLoading, error, toggleComplete, addTask, updateTask, removeTask } = useTasks();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  // Handle create task
  const handleCreateTask = async (data: { title: string; description?: string }) => {
    await addTask(data);
    setIsCreateModalOpen(false);
  };

  // Handle edit task
  const handleEditTask = async (data: { title: string; description?: string }) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, data);
    setEditingTask(null);
  };

  // Handle delete task
  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    await removeTask(deletingTask.id);
    setDeletingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1410] via-[#2a1f1a] to-[#1a1410]">
      {/* Header with Glassmorphism */}
      <header className="glass border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">ADDit DOit</h1>
              <p className="text-sm text-yellow-100/70">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/chat')}
                className="px-4 py-2 text-sm text-yellow-300 hover:text-yellow-200 glass-card rounded-lg transition-all hover:scale-105"
              >
                💬 Chat View
              </button>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                Add Task
              </Button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-yellow-300 hover:text-yellow-200 glass-card rounded-lg transition-all hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 glass-card border-red-500/50 rounded-xl">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {tasksLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Empty State */}
        {!tasksLoading && tasks.length === 0 && (
          <EmptyState onAddTask={() => setIsCreateModalOpen(true)} />
        )}

        {/* Task List */}
        {!tasksLoading && tasks.length > 0 && (
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleComplete}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
          />
        )}
      </main>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        <TaskForm
          initialData={editingTask || undefined}
          onSubmit={handleEditTask}
          onCancel={() => setEditingTask(null)}
          isEditMode
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        task={deletingTask}
        isOpen={!!deletingTask}
        onConfirm={handleDeleteTask}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
